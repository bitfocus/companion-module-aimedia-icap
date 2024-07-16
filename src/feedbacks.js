import { Regex } from '@companion-module/base'
import { apiIds, styles } from './consts.js'

export async function UpdateFeedbacks(self) {
	let feedbackDefs = []
	if (self.config.poll.includes(apiIds.activitiesEncoders.id) && self.iCap.encoders.length !== 0) {
		let encoderChoices = []
		for (let i = 0; i < self.iCap.encoders.length; i++) {
			encoderChoices.push({ id: i, label: self.iCap.encoders[i].username })
		}
		const encoderOption = {
			id: 'encoder',
			type: 'dropdown',
			label: 'Encoder',
			default: encoderChoices[0].id,
			choices: encoderChoices,
		}
		feedbackDefs['encoder_online'] = {
			name: 'Encoder Online',
			type: 'boolean',
			label: 'Encoder Online',
			defaultStyle: styles.green,
			options: [encoderOption],
			callback: (feedback) => {
				return self.iCap.encoders[feedback.options.encoder]?.online
			},
		}
		feedbackDefs['encoder_CC_activity'] = {
			name: 'Encoder CC Active',
			type: 'boolean',
			label: 'Encoder CC Active',
			defaultStyle: styles.red,
			options: [encoderOption],
			callback: (feedback) => {
				return self.iCap.encoders[feedback.options.encoder]?.cc_activity.startsWith('Active')
			},
		}
		feedbackDefs['encoder_Audio_OK'] = {
			name: 'Encoder Audio OK',
			type: 'boolean',
			label: 'Encoder Audio OK',
			defaultStyle: styles.green,
			options: [encoderOption],
			callback: (feedback) => {
				return self.iCap.encoders[feedback.options.encoder]?.audio_status === 'Audio OK'
			},
		}
		feedbackDefs['encoder_CC_activity'] = {
			name: 'Encoder CC Active',
			type: 'boolean',
			label: 'Encoder CC Active',
			defaultStyle: styles.red,
			options: [encoderOption],
			callback: (feedback) => {
				return self.iCap.encoders[feedback.options.encoder]?.cc_activity.startsWith('Active')
			},
		}
		feedbackDefs['encoder_Audio_OK'] = {
			name: 'Encoder Audio OK',
			type: 'boolean',
			label: 'Encoder Audio OK',
			defaultStyle: styles.green,
			options: [encoderOption],
			callback: (feedback) => {
				return self.iCap.encoders[feedback.options.encoder]?.audio_status === 'Audio OK'
			},
		}
	}
	if (self.config.poll.includes(apiIds.activitiesCaptioners.id)) {
		let encoderChoices = []
		for (let i = 0; i < self.iCap.encoders.length; i++) {
			encoderChoices.push({ id: i, label: self.iCap.encoders[i].username })
		}
		const accesscode = {
			id: 'accessCode',
			type: 'textinput',
			label: 'Access Code',
			useVariables: true,
			regex: Regex.SOMETHING,
		}
		feedbackDefs['captioning_active'] = {
			name: 'Captioning Active',
			type: 'boolean',
			label: 'Captioning Active',
			defaultStyle: styles.green,
			options: [accesscode],
			callback: (feedback, context) => {
				const ac = context.parseVariablesInString(feedback.options.accessCode)
				for (const captioner of self.iCap.captioners) {
					if (captioner.active_accesscode === ac && captioner.online && captioner.cc_activity.startsWith('Active')) {
						return true
					}
				}
				return false
			},
		}
	}

	self.setFeedbackDefinitions(feedbackDefs)
}
