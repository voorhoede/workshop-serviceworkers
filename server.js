const chalk = require('chalk')
const express = require('express')
const busboy = require('express-busboy')
const expressNunjucks = require('express-nunjucks')
const path = require('path')

const data = require('./data/content.json')

const app = express()
const port = 7997 // SWWS

app.use((req, res, next) => {
	res.removeHeader('X-Powered-By')
	next()
})
app.set('etag', false)
app.use(express.static(path.join(__dirname, 'dist')))
app.set('views', path.join(__dirname, 'views'))

expressNunjucks(app, {
	watch: true,
	noCache: true
})

busboy.extend(app);

app.get('/', (req, res) => {
	res.redirect('/workshops')
})
app.get('/workshops', (req, res) => {
	res.render('index', data)
})

app.get('/workshops/:workshop', (req, res) => {
	const workshops = data.workshops.filter(w => w.slug === req.params.workshop)
	if (workshops && workshops[0]) {
		res.render('workshop', workshops[0])
	} else {
		res.status(404)
	}
})

app.all('/workshops/:workshop/:date/?', (req, res) => {
	const workshops = data.workshops.filter(w => w.slug === req.params.workshop)
	let events

	if (req.method === 'POST') {
		console.log(req.body)
	}

	if (workshops[0] && workshops[0].dates) {
		events = workshops[0].dates.filter(d => d.dateSlug === req.params.date)
		workshops[0].date = events[0]
	}
	if (workshops && events) {
		res.render('signup', workshops[0])
	} else {
		res.status(404)
	}
})

app.listen(port)

console.log(chalk.green(`Server running on localhost:${port}`))
