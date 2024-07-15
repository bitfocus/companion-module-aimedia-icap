import { apiIds } from './consts.js'

export async function parseResponse(data, name) {
	console.log(name)
	console.log(JSON.stringify(data))
	this.iCap.encoders = data.encoders ?? this.iCap.encoders
	this.iCap.users = data.users ?? this.iCap.users
	this.iCap.health = name === apiIds.systemHealth.label ? data : this.iCap.health
	this.iCap.captioners = data.captioners ?? this.iCap.captioners
	this.iCap.providers = name === apiIds.providers.label ? data : this.iCap.providers
	this.iCap.captionCasts = data.captionCasts ?? this.iCap.captionCasts
	this.iCap.encoderActivity = data.active ?? this.iCap.encoderActivity
	this.iCap.encoderPermissions = data.encoderpermissions ?? this.iCap.encoderPermissions
	this.iCap.emailSubscriptions = data.subscriptions ?? this.iCap.emailSubscriptions
	this.iCap.users = data.users ?? this.iCap.users
	this.iCap.sharedEncoders = data.sharedEncoders ?? this.iCap.sharedEncoders
}
