export async function UpdateActions(self) {
	let actionDefs = []
	actionDefs['update_variables'] = {
		name: 'Repopulate Variables',
		options: [],
		callback: async () => {
			await self.updateFeedbacks() // export feedbacks
			await self.updateVariableDefinitions() // export variable definitions
			await self.updateVariableValues()
		},
	}
	self.setActionDefinitions(actionDefs)
}
