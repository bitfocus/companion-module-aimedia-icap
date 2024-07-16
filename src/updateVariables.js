import { apiIds } from './consts.js'

export async function UpdateVariableValues(self) {
	let varList = []
	//accesscode - works without extra args
	if (self.config.poll.includes(apiIds.accesscodes.id)) {
		//varDefs.push({ variableId: 'accesscodes', name: 'My accesscodes variable' })
	}
	//activeCaptioners - works without extra args
	if (self.config.poll.includes(apiIds.activitiesCaptioners.id)) {
		//varDefs.push({ variableId: 'activitiesCaptioners', name: 'My activitiesCaptioners variable' })
	}
	//activeCaptioners - works without extra args
	if (self.config.poll.includes(apiIds.activitiesEncoders.id)) {
		for (const encoder of self.iCap.encoders) {
			try {
				varList[`encoder_${encoder.username}_username`] = encoder.username
				varList[`encoder_${encoder.username}_usertype`] = encoder.usertype
				varList[`encoder_${encoder.username}_email`] = encoder.email
				varList[`encoder_${encoder.username}_sessionKey`] = encoder.session_key
				varList[`encoder_${encoder.username}_online`] = encoder.online
				varList[`encoder_${encoder.username}_samlgroup`] = encoder.samlgroup
				varList[`encoder_${encoder.username}_disabled`] = encoder.disabled
				varList[`encoder_${encoder.username}_passwordExpired`] = encoder.passwordexpired
				varList[`encoder_${encoder.username}_audioStatus`] = encoder.audio_status
				varList[`encoder_${encoder.username}_cc_activity`] = encoder.cc_activity
				varList[`encoder_${encoder.username}_broadcastPlus`] = encoder.broadcast_plus
			} catch (error) {
				continue
			}
		}
	}
	//captioncast - works without extra args
	if (self.config.poll.includes(apiIds.captioncast.id)) {
		//varDefs.push({ variableId: 'captioncast', name: 'My captioncast variable' })
	}
	//providers - works without extra args
	if (self.config.poll.includes(apiIds.providers.id)) {
		for (const provider of self.iCap.providers) {
			try {
				varList[`encoder_${provider.company}_company`] = provider.company
				varList[`encoder_${provider.company}_displayname`] = provider.displayname
				varList[`encoder_${provider.company}_primarymail`] = provider.primarymail
				varList[`encoder_${provider.company}_primaryphone`] = provider.primaryphone
			} catch (error) {
				continue
			}
		}
	}
	//email - works without extra args
	if (self.config.poll.includes(apiIds.email.id)) {
		//varDefs.push({ variableId: 'email', name: 'My email variable' })
	}
	//encoderActivity - works without extra args
	if (self.config.poll.includes(apiIds.encoderActivity.id)) {
		//varDefs.push({ variableId: 'encoderActivity', name: 'My encoderActivity variable' })
	}
	//encoderPermissions - works without extra args
	if (self.config.poll.includes(apiIds.encoderPermissions.id)) {
		//varDefs.push({ variableId: 'encoderPermissions', name: 'My encoderPermissions variable' })
	}
	//logs - requires extra args
	if (self.config.poll.includes(apiIds.logs.id)) {
		//varDefs.push({ variableId: 'logs', name: 'My logs variable' })
	}
	//sessionIDs - requires extra args
	if (self.config.poll.includes(apiIds.sessionIDs.id)) {
		//varDefs.push({ variableId: 'sessionIDs', name: 'My sessionIDs variable' })
	}
	//sharedEncoders - works without extra args
	if (self.config.poll.includes(apiIds.sharedEncoders.id)) {
		//varDefs.push({ variableId: 'sharedEncoders', name: 'My sharedEncoders variable' })
	}
	//systemHealth - works without extra args
	if (self.config.poll.includes(apiIds.systemHealth.id)) {
		try {
			varList[`systemHealth_full_report_available_from_this_database`] =
				self.iCap.health.full_report_available_from_this_database
			varList[`systemHealth_icap_server_events_logged_5mins`] = self.iCap.health.icap_server_events_logged_5mins
			varList[`systemHealth_icap_server_events_logged_15mins`] = self.iCap.health.icap_server_events_logged_15mins
			varList[`systemHealth_icap_server_events_logged_60mins`] = self.iCap.health.icap_server_events_logged_60mins
			varList[`systemHealth_encoders_stable_percent_5mins`] = self.iCap.health.encoders_stable_percent_5mins
			varList[`systemHealth_encoders_stable_percent_15mins`] = self.iCap.health.encoders_stable_percent_15mins
			varList[`systemHealth_encoders_stable_percent_60mins`] = self.iCap.health.encoders_stable_percent_60mins
			varList[`systemHealth_most_recent_primary_server_uptime_event`] =
				self.iCap.health.most_recent_primary_server_uptime_event
			varList[`systemHealth_primary_auth_server_status`] = self.iCap.health.primary_auth_server_status
			varList[`systemHealth_reporting_server`] = self.iCap.health.reporting_server
		} catch (error) {
			//continue
		}
	}
	//uptime - requires extra args  - requires iCap Broadcast Plus plan
	if (self.config.poll.includes(apiIds.uptime.id)) {
		//varDefs.push({ variableId: 'uptime', name: 'My uptime variable' })
	}
	//users - works without extra args
	if (self.config.poll.includes(apiIds.users.id)) {
		for (const user of self.iCap.users) {
			try {
				varList[`user_${user.username}_name`] = user.username
				varList[`user_${user.username}_usertype`] = user.usertype
				varList[`user_${user.username}_email`] = user.email
				varList[`user_${user.usernamey}_samlgroup`] = user.samlgroup
				varList[`user_${user.usernamey}_disabled`] = user.disabled
				varList[`user_${user.usernamey}_passwordexpired`] = user.passwordexpired
				varList[`user_${user.usernamey}_broadcast_plus`] = user.broadcast_plus
			} catch (error) {
				continue
			}
		}
	}
	self.setVariableValues(varList)
}
