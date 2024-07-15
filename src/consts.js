export const iCapGateway = 'https://icap.eegapis.com/api/1.0/'
export const iCapTimeout = 5000
export const iCapHeaders = { 'content-type': 'application/json' }
export const dummy_password = '********'

export const apiIds = {
	accesscode: { id: 'accesscode', label: 'Access Codes' },
	activities: { id: 'activities', label: 'Activities' },
	captioncast: { id: 'captioncast', label: 'Caption Cast' },
	providers: { id: 'providers', label: 'Caption Providers' },
	email: { id: 'email', label: 'Email Notices' },
	encoderActivity: { id: 'encoderActivity', label: 'Encoder Activity' },
	encoderPermissions: { id: 'encoderPermissions', label: 'Encoder Permissions' },
	logs: { id: 'logs', label: 'Logs' },
	sessionIDs: { id: 'sessionIDs', label: 'Session IDs' },
	sharedEncoders: { id: 'sharedEncoders', label: 'Shared Encoders' },
	systemHealth: { id: 'systemHealth', label: 'System Health' },
	uptime: { id: 'uptime', label: 'Uptime' },
	users: { id: 'users', label: 'Users' },
}

export const choices = {
	polling: [
		apiIds.accesscode,
		apiIds.activities,
		apiIds.captioncast,
		apiIds.providers,
		apiIds.email,
		apiIds.encoderActivity,
		apiIds.encoderPermissions,
		//apiIds.logs,
		//apiIds.sessionIDs,
		apiIds.sharedEncoders,
		apiIds.systemHealth,
		//  apiIds.uptime,
		apiIds.users,
	],
}
