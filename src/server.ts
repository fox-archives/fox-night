import { Express } from 'express'
import socketio from 'socket.io'
import { appFactory } from './app'
import { socketioFactory } from './socket'
import type http from 'http'

appFactory()
	.then((app: Express) => {
		const port = process.env.port || 3000

		const server = app.listen(
			{
				port,
				host: '127.0.0.1',
			},
			() => {
				console.log(`on port ${port}`)
			}
		)

		const io = socketio(server)
		io.on('connection', socketioFactory(io))
	})
	.catch((err: unknown) => {
		console.error(err)
	})
