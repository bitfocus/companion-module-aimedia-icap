import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { UpdateVariableDefinitions } from './variables.js'
import { UpdateVariableValues } from './updateVariables.js'
import * as config from './config.js'
import * as logging from './logging.js'
import * as polling from './polling.js'
import * as query from './query.js'
import * as response from './parseResponse.js'
import axios from 'axios'
import PQueue from 'p-queue'

import { dummy_password, iCapGateway, iCapHeaders, iCapTimeout } from './consts.js'

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		Object.assign(this, { ...config, ...logging, ...polling, ...query, ...response })
		this.queue = new PQueue({ concurrency: 1, interval: 100, intervalCap: 1 })
		this.currentStatus = { status: InstanceStatus.Disconnected, message: '' }
	}

	async init(config) {
		this.configUpdated(config)
	}

	// When module gets deleted
	async destroy() {
		this.log('debug', `destroy: ${this.id}:${this.label}`)
		this.stopPolling()
		this.queue.clear()
		if (this.axios) {
			delete this.axios
		}
		delete this.iCap
	}

	setup_iCap(company) {
		this.iCap = {
			users: [],
			encoders: [],
			sharedEncoders: [],
			captioners: [],
			captionCasts: [],
			providers: [],
			encoderPermissions: [],
			accessCodes: [],
			health: {},
			active_encoders: [],
			active_captioners: [],
			uptime: [],
			logs: [],
			emailSubscriptions: [],
			encoderActivity: [],
			api: {
				users: `${company}/users`,
				accesscodes: `${company}/accesscodes`,
				encoderPermissions: `${company}/encoderpermissions`,
				encoderActivity: `${company}/encoderactivity`,
				sharedEncoders: `${company}/sharedencoders`,
				captionCast: `${company}/captioncasts`,
				logs: `${company}/logs/`,
				activeEncoders: `${company}/active-encoders`,
				activeCaptioners: `${company}/active-captioners`,
				sessionIDs: `${company}/sessions/`,
				uptime: `${company}/uptime/`,
				providers: `providers`,
				emailNotices: `${company}/emailnotices/subscriptions`,
				sessionLogin: `${company}/login/admin`,
				sessionLogout: `${company}/logout`,
				systemHealth: `health/overview`,
			},
		}
	}

	async setupAxios() {
		if (this.pollTimer) {
			clearTimeout(this.pollTimer)
		}
		if (this.axios) {
			delete this.axios
		}
		if (this.config.user && this.config.password && this.config.company) {
			this.axios = axios.create({
				baseURL: iCapGateway,
				timeout: iCapTimeout,
				headers: iCapHeaders,
				auth: {
					username: this.config.user,
					password: this.config.password,
				},
			})
			return true
		} else {
			this.log('warn', `Invalid config`)
			this.checkStatus(InstanceStatus.BadConfig, 'Invalid Config')
			return undefined
		}
	}

	checkStatus(status = InstanceStatus.Disconnected, message = '') {
		if (status === this.currentStatus.status && message === this.currentStatus.message) return false
		this.updateStatus(status, message.toString())
		this.currentStatus.status = status
		this.currentStatus.message = message
		return true
	}

	checkConfig() {
		if (this.config.pass !== dummy_password && this.config.pass !== undefined) {
			this.config.password = this.config.pass
			this.config.pass = dummy_password
			this.saveConfig(this.config)
		}
	}

	async configUpdated(config) {
		this.config = config
		this.queue.clear()
		this.checkConfig()
		this.setup_iCap(this.config.company)
		if (this.setupAxios()) {
			this.checkStatus(InstanceStatus.Connecting)
			this.startPolling()
		}
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	updateVariableValues() {
		UpdateVariableValues(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
