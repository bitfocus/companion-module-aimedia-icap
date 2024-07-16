import { InstanceStatus } from '@companion-module/base'

export function logResponse(response, name) {
	if (this.config.verbose) {
		console.log(response)
	}
	if (response.data !== undefined) {
		this.updateStatus(InstanceStatus.Ok)
		const data = JSON.stringify(response.data)
		if (this.config.verbose) {
			this.log('debug', `Query: ${name}\nData Recieved:\n${data}`)
		}
		this.parseResponse(response.data, name)
	} else {
		this.updateStatus(InstanceStatus.UnknownWarning, 'No Data')
		this.log('warn', `Response contains no data`)
	}
}

export function logError(error, name) {
	if (this.config.verbose) {
		console.log(error)
	}
	if (error.code !== undefined) {
		try {
			this.log(
				'error',
				`${name} - ${error.response.status}: ${JSON.stringify(error.code)}\n${JSON.stringify(error.response.data)}`
			)
			this.updateStatus(InstanceStatus.UnknownError, `${error.response.status}: ${JSON.stringify(error.code)}`)
		} catch {
			this.log('error', `${JSON.stringify(error.code)}`)
			this.updateStatus(InstanceStatus.ConnectionFailure, `${JSON.stringify(error.code)}`)
		}
	} else {
		this.log('error', `No error code`)
		this.updateStatus(InstanceStatus.UnknownError)
	}
}
