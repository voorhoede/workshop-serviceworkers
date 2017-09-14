// import content from '../data/content.json'
import { isSWFormSync, doSWFormSync } from './components/form/form.js'

console.log(`Hi! I'm a service worker from ${self.origin}`)

//
// Service worker events
//
self.addEventListener('install', event => {
	console.log('sw install', event)

	// @todo
	// - Define a list of resources-to-cache
	// - Open a cache
	// - Add all resources to the cache
	// - Make sure SW waits until it should stop waiting!
	//
	// - Bonus: cache only what you have visited
})

self.addEventListener('activate', event => {
	console.log('sw activate', event)
})

//
// Functional events
//
self.addEventListener('fetch', event => {
	console.log('user agent fetch', event.request, event)

	// @todo
	// - Respond with the cached request...
	// - ...or go to the network
	//
	// - Bonus: serve an offline page
})

self.addEventListener('sync', event => {
	console.log('user agent sync', event)
})

self.addEventListener('push', event => {
	console.log('user agent push', event)
})
