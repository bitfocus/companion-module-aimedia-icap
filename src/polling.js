import { apiIds, choices } from './consts.js'

export function startPolling() {
	if (this.pollTimer) {
		clearTimeout(this.pollTimer)
	}
	if (this.config.pollInterval > 0) {
		this.pollTimer = setTimeout(() => {
			this.pollStatus()
		}, this.config.pollInterval * 1000)
		return true
	} else {
		delete this.pollTimer
		return undefined
	}
}

export function stopPolling() {
	if (this.pollTimer) {
		clearTimeout(this.pollTimer)
		delete this.pollTimer
		return true
	}
	return undefined
}

export async function pollStatus() {
	if (this.axios) {
		//accesscode - works without extra args
		if (this.config.poll.includes(apiIds.accesscode.id)) {
			await this.query_iCap(this.iCap.api.accesscodes, apiIds.accesscode.label)
		}
		//activities - works without extra args
		if (this.config.poll.includes(apiIds.activities.id)) {
			await this.query_iCap(this.iCap.api.activeEncoders, apiIds.activities.label)
			await this.query_iCap(this.iCap.api.activeCaptioners, apiIds.activities.label)
		}
		//captioncast - works without extra args
		if (this.config.poll.includes(apiIds.captioncast.id)) {
			await this.query_iCap(this.iCap.api.captionCast, apiIds.captioncast.label)
		}
		//providers - works without extra args
		if (this.config.poll.includes(apiIds.providers.id)) {
			await this.query_iCap(this.iCap.api.providers, apiIds.providers.label)
		}
		//email - works without extra args
		if (this.config.poll.includes(apiIds.email.id)) {
			await this.query_iCap(this.iCap.api.emailNotices, apiIds.email.label)
		}
		//encoderActivity - works without extra args
		if (this.config.poll.includes(apiIds.encoderActivity.id)) {
			await this.query_iCap(this.iCap.api.encoderActivity, apiIds.encoderActivity.label)
		}
		//encoderPermissions - works without extra args
		if (this.config.poll.includes(apiIds.encoderPermissions.id)) {
			await this.query_iCap(this.iCap.api.encoderPermissions, apiIds.encoderPermissions.label)
		}
		//logs - requires extra args
		if (this.config.poll.includes(apiIds.logs.id)) {
			await this.query_iCap(this.iCap.api.logs, apiIds.logs.label)
		}
		//sessionIDs - requires extra args
		if (this.config.poll.includes(apiIds.sessionIDs.id)) {
			await this.query_iCap(this.iCap.api.sessionIDs, apiIds.sessionIDs.label)
		}
		//sharedEncoders - works without extra args
		if (this.config.poll.includes(apiIds.sharedEncoders.id)) {
			await this.query_iCap(this.iCap.api.sharedEncoders, apiIds.sharedEncoders.id)
		}
		//systemHealth - works without extra args
		if (this.config.poll.includes(apiIds.systemHealth.id)) {
			await this.query_iCap(this.iCap.api.systemHealth, apiIds.systemHealth.label)
		}
		//uptime - requires extra args  - requires iCap Broadcast Plus plan
		if (this.config.poll.includes(apiIds.uptime.id)) {
			await this.query_iCap(this.iCap.api.uptime, apiIds.uptime.label)
		}
		//users - works without extra args
		if (this.config.poll.includes(apiIds.users.id)) {
			await this.query_iCap(this.iCap.api.users, apiIds.users.label)
		}
	}
	this.startPolling()
}
