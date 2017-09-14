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

		// @todo
		// - Let's ask for permission to do push notifications (hint: we already built that!)
		// - Then, if the service worker is ready
		// - Register a sync event to handle the form entry (hint: we did most of the work below!)
		// - Don't forget to have a fallback if stuff fails!
		//
		// - Bonus: it would be nice to let the registrar know the form will be sent later
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

			// @todo
			// - Now that we retrieved the formData from idb, we should post it to the server
			// - (the endpoint is `action`)
			// - and return the fetch call into the Promise chain

		}).then(response => {

			// @todo
			// - Let's check if the server response came back ok
			// - If so, we can send a push notification
			// - ...and delete the entry from idb
			// - Shirley, we should also resolve the Promise!
			// - ...unless the server's response wasn't ok, then we reject it
			//
			// - Bonus: add some polish to your push notification!

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

	// @todo
	// - Store the formEntries into idb
	// - ...and register our tag on the SyncManager
	// - Hey, and return it, because it's part of a Promise chain elsewhere!
}
