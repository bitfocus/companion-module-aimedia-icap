export async function UpdateActions(self) {
	let actionDefs = []
	actionDefs['sample_action'] = {
			name: 'My First Action',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 100,
				},
			],
			callback: async (event) => {
				console.log('Hello world!', event.options.num)
			},
		}
	self.setActionDefinitions(actionDefs)
}
