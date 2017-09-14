import idbKeyval from 'idb-keyval'
const selector = '[data-form]'

const syncTagPrefix = `POST form`
const syncTagPrefixEscaped = syncTagPrefix.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
const syncTagPrefixRegex = new RegExp(`^${syncTagPrefixEscaped}\s*`)

export const isSupported = (
	'serviceWorker' in navigator
	&& 'SyncManager' in window
	&& 'FormData' in window
	&& 'Notification' in window
)

export default {
	enhance,
	enhanceWithin,
	isSupported,
	isSWFormSync,
	doSWFormSync
}

export function enhance(element) {
	if (!isSupported) return false

	element.onsubmit = event => {
		event.preventDefault()
		console.log('the form was submitted')
	}

	return element
}

export function enhanceWithin(context=document) {
	const elements = [].slice.call(context.querySelectorAll(selector))
	return elements.map(el => enhance(el)) || []
}

export function isSWFormSync(event) {
	return (event.tag.match(syncTagPrefixRegex))
}

export function doSWFormSync(event) {
	const sw = event.target.registration
	const tag = event.tag
	const action = tag.replace(syncTagPrefixRegex, '')
	const formData = new FormData()

	return idbKeyval.get(tag)
		.then(formEntries => formEntries.reduce((formData, [key, val]) => {
			formData.append(key, val)
			return formData
		}, formData))
		.then(formData => {
			console.log('formData ready to go')
		})
}

function registerSWPushNotification() {
	return Notification.requestPermission()
		.then(result => {
			if (result !== 'granted') {
				Promise.reject('No permission to send push notification')
			}
		})
}

function registerSWFormSync(form, registration) {
	const tag = `${syncTagPrefix} ${form.action}`
	const formData = new FormData(form)
	const formEntries = []

	for (let entry of formData.entries()) {
		formEntries.push(entry)
	}

	console.log('register sync')
}
