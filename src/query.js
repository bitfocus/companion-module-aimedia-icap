export async function query_iCap(msg, name) {
    if (msg === undefined || name === undefined) {
        return undefined
    }
    try {
		const response = await this.axios.get(msg)
		this.logResponse(response, name)
		return true
	} catch (error) {
		this.logError(error, name)
		return undefined
	}

}