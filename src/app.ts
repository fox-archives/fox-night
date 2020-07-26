import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'

import * as c from './controllers'

const isDev = process.env.NODE_ENV === 'production'

export async function appFactory() {
	dotenv.config()

	const app = express()
	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'ejs')
	app.set('case sensitive routing', true)
	app.set('etag', 'weak')
	app.set('json spaces', 2)
	app.set('query-parser', 'extended')
	app.set('strict routing', false)
	app.set('trust proxy', 'loopback')
	app.set('trust proxy', false)
	app.set('views', path.join(__dirname, 'views'))
	app.set('x-powered-by', false)

	app.use(
		session({
			secret: 'foobar',
			resave: false,
			saveUninitialized: false,
		})
	)
	app.use(express.json())
	app.use(
		express.urlencoded({
			extended: true,
		})
	)
	app.use('/', express.static(path.join(__dirname, 'public')))

	app.get('/', c.indexController)
	app.get('/home', c.homeController)
	app.get('/about', c.aboutController)
	app.get('/video', c.videoController)
	app.use('/', c.fourOhFourController)

	return app
}

process.on('uncaughtException', (err) => {
	console.error('UNCAUGHT EXCEPTION')
	console.error(err)
})

process.on('unhandledRejection', (err) => {
	console.error('UNHANDLED REJECTION')
	console.error(err)
})
