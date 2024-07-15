export async function UpdateVariableDefinitions(self) {
	let varDefs = [
		{ variableId: 'variable1', name: 'My first variable' },
		{ variableId: 'variable2', name: 'My second variable' },
		{ variableId: 'variable3', name: 'Another variable' },
	]
	self.setVariableDefinitions(varDefs)
}
