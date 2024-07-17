import { Regex } from '@companion-module/base'
import { apiIds, styles } from './consts.js'

export async function UpdateFeedbacks(self) {
	let feedbackDefs = []
	if (self.config.poll.includes(apiIds.activitiesEncoders.id) && self.iCap.encoders.length > 0) {
		let encoderChoices = []
		for (let i = 0; i < self.iCap.encoders.length; i++) {
			encoderChoices.push({ id: self.iCap.encoders[i].username, label: self.iCap.encoders[i].username })
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
				for (const enc of self.iCap.encoders) {
					if (enc?.username === feedback.options.encoder) {
						return enc?.online
					}
				}
				return false
			},
		}
		feedbackDefs['encoder_CC_activity'] = {
			name: 'Encoder CC Active',
			type: 'boolean',
			label: 'Encoder CC Active',
			defaultStyle: styles.red,
			options: [encoderOption],
			callback: (feedback) => {
				for (const enc of self.iCap.encoders) {
					if (enc?.username === feedback.options.encoder) {
						return enc?.cc_activity.startsWith('Active')
					}
				}
				return false
			},
		}
		feedbackDefs['encoder_Audio_OK'] = {
			name: 'Encoder Audio OK',
			type: 'boolean',
			label: 'Encoder Audio OK',
			defaultStyle: styles.green,
			options: [encoderOption],
			callback: (feedback) => {
				for (const enc of self.iCap.encoders) {
					if (enc?.username === feedback.options.encoder) {
						return enc?.audio_status === 'Audio OK'
					}
				}
				return false
			},
		}
	}
	if (self.config.poll.includes(apiIds.activitiesCaptioners.id)) {
		const accesscode = {
			id: 'accessCode',
			type: 'textinput',
			label: 'Access Code',
			useVariables: true,
			regex: Regex.SOMETHING,
		}
		const acInfo = {
			id: 'acInfo',
			type: 'static-text',
			label: '',
			value: 'If polling Access Codes, enter an access code variable here.',
		}
		feedbackDefs['captioning_active'] = {
			name: 'Captioning Active',
			type: 'boolean',
			label: 'Captioning Active',
			defaultStyle: styles.green,
			options: [accesscode, acInfo],
			callback: async (feedback, context) => {
				const ac = await context.parseVariablesInString(feedback.options.accessCode)
				for (const captioner of self.iCap.captioners) {
					if (captioner?.active_accesscode === ac && captioner?.online && captioner?.cc_activity.startsWith('Active')) {
						return true
					}
				}
				return false
			},
		}
	}

	self.setFeedbackDefinitions(feedbackDefs)
}
