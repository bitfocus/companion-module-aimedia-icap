import { apiIds } from './consts.js'

export async function UpdateVariableDefinitions(self) {
	let varDefs = []
	//accesscode - works without extra args
	if (self.config.poll.includes(apiIds.accesscodes.id)) {
		for (const code of self.iCap.accessCodes) {
			varDefs.push(
				{ variableId: `accesscode_${code.accesscode}`, name: `Access Code ${code.accesscode}` },
				{ variableId: `accesscode_${code.accesscode}_broadcaster`, name: `Access Code ${code.accesscode} Broadcaster` },
				{
					variableId: `accesscode_${code.accesscode}_primaryencoder`,
					name: `Access Code ${code.accesscode} Primary Encoder`,
				},
				{ variableId: `accesscode_${code.accesscode}_service`, name: `Access Code ${code.accesscode} Service` },
				{
					variableId: `accesscode_${code.accesscode}_accountsonline`,
					name: `Access Code ${code.accesscode} Accounts Online`,
				},
				{
					variableId: `accesscode_${code.accesscode}_secondaryencoder`,
					name: `Access Code ${code.accesscode} Secondary Encoder`,
				},
				{ variableId: `accesscode_${code.accesscode}_listeners`, name: `Access Code ${code.accesscode} Listeners` },
				{ variableId: `accesscode_${code.accesscode}_readonly`, name: `Access Code ${code.accesscode} Read Only` },
				{ variableId: `accesscode_${code.accesscode}_owner`, name: `Access Code ${code.accesscode} Owner` },
				{ variableId: `accesscode_${code.accesscode}_sharedwith`, name: `Access Code ${code.accesscode} Shared With` }
			)
		}
	}
	//activeCaptioners - works without extra args
	if (self.config.poll.includes(apiIds.activitiesCaptioners.id)) {
		//varDefs.push({ variableId: 'activitiesCaptioners', name: 'My activitiesCaptioners variable' })
	}
	//activeCaptioners - works without extra args
	if (self.config.poll.includes(apiIds.activitiesEncoders.id)) {
		for (const encoder of self.iCap.encoders) {
			varDefs.push(
				{ variableId: `encoder_${encoder.username}_username`, name: `Encoder ${encoder.username}` },
				{ variableId: `encoder_${encoder.username}_usertype`, name: `Encoder ${encoder.username} User Type` },
				{ variableId: `encoder_${encoder.username}_email`, name: `Encoder ${encoder.username} Email` },
				{ variableId: `encoder_${encoder.username}_sessionKey`, name: `Encoder ${encoder.username} Session Key` },
				{ variableId: `encoder_${encoder.username}_online`, name: `Encoder ${encoder.username} Online` },
				{ variableId: `encoder_${encoder.username}_samlgroup`, name: `Encoder ${encoder.username} SAML Group` },
				{ variableId: `encoder_${encoder.username}_disabled`, name: `Encoder ${encoder.username} Disabled` },
				{
					variableId: `encoder_${encoder.username}_passwordExpired`,
					name: `Encoder ${encoder.username} Password Expired`,
				},
				{ variableId: `encoder_${encoder.username}_audioStatus`, name: `Encoder ${encoder.username} Audio Status` },
				{ variableId: `encoder_${encoder.username}_cc_activity`, name: `Encoder ${encoder.username} CC Activity` },
				{ variableId: `encoder_${encoder.username}_broadcastPlus`, name: `Encoder ${encoder.username} Broadcast Plus` }
			)
		}
	}
	//captioncast - works without extra args
	if (self.config.poll.includes(apiIds.captioncast.id)) {
		//varDefs.push({ variableId: 'captioncast', name: 'My captioncast variable' })
	}
	//providers - works without extra args
	if (self.config.poll.includes(apiIds.providers.id)) {
		for (const provider of self.iCap.providers) {
			varDefs.push(
				{ variableId: `provider_${provider.company}_company`, name: `Provider ${provider.company}` },
				{ variableId: `provider_${provider.company}_displayname`, name: `Provider ${provider.company} Display Name` },
				{ variableId: `provider_${provider.company}_primarymail`, name: `Provider ${provider.company} Primary Mail` },
				{ variableId: `provider_${provider.company}_primaryphone`, name: `Provider ${provider.company} Primary Phone` }
			)
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
		varDefs.push(
			{
				variableId: 'systemHealth_full_report_available_from_this_database',
				name: 'System Health - Full report available from this database',
			},
			{
				variableId: 'systemHealth_icap_server_events_logged_5mins',
				name: 'System Health - iCap server events logged: 5mins',
			},
			{
				variableId: 'systemHealth_icap_server_events_logged_15mins',
				name: 'System Health - iCap server events logged: 15mins',
			},
			{
				variableId: 'systemHealth_icap_server_events_logged_60mins',
				name: 'System Health - iCap server events logged: 60mins',
			},
			{
				variableId: 'systemHealth_encoders_stable_percent_5mins',
				name: 'System Health - Encoders stable percent: 5mins',
			},
			{
				variableId: 'systemHealth_encoders_stable_percent_15mins',
				name: 'System Health - Encoders stable percent: 15mins',
			},
			{
				variableId: 'systemHealth_encoders_stable_percent_60mins',
				name: 'System Health - Encoders stable percent: 60mins',
			},
			{
				variableId: 'systemHealth_most_recent_primary_server_uptime_event',
				name: 'System Health - Most Recent Primary Server uptime event',
			},
			{ variableId: 'systemHealth_primary_auth_server_status', name: 'System Heatlh - Primary Auth Server Status' },
			{ variableId: 'systemHealth_reporting_server', name: 'System Heatlh - Reporting Server' },
			{ variableId: 'systemHealth_health_messages', name: 'System Heatlh - Messages' }
		)
	}
	//uptime - requires extra args  - requires iCap Broadcast Plus plan
	if (self.config.poll.includes(apiIds.uptime.id)) {
		//varDefs.push({ variableId: 'uptime', name: 'My uptime variable' })
	}
	//users - works without extra args
	if (self.config.poll.includes(apiIds.users.id)) {
		//varDefs.push({ variableId: 'users', name: 'My users variable' })
		for (const user of self.iCap.users) {
			varDefs.push(
				{ variableId: `user_${user.username}_name`, name: `User ${user.username}` },
				{ variableId: `user_${user.username}_usertype`, name: `User ${user.username} User Type` },
				{ variableId: `user_${user.username}_email`, name: `User ${user.username} Email` },
				{ variableId: `user_${user.usernamey}_samlgroup`, name: `User ${user.username} SAML Group` },
				{ variableId: `user_${user.usernamey}_disabled`, name: `User ${user.username} Disabled` },
				{ variableId: `user_${user.usernamey}_passwordexpired`, name: `User ${user.username} Password Expired` },
				{ variableId: `user_${user.usernamey}_broadcast_plus`, name: `User ${user.username} Broadcast Plus` }
			)
		}
	}
	self.setVariableDefinitions(varDefs)
}
