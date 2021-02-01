import { Socket } from 'socket.io'

type watcher = {
	id: number
	lastUpdated: number
	currentTime: number
}

function updateWatcher(watchers: watcher[], watcher: watcher) {
	for (const w of watchers) {
		if (w.id === watcher.id) {
			w.lastUpdated = watcher.lastUpdated
			w.currentTime = watcher.currentTime
			return
		}
	}

	watchers.push(watcher)
}

function pruneWatchers(watchers: watcher[]) {
	const currentDate = Date.now()
	for (let i = 0; i < watchers.length; ++i) {
		const w = watchers[i]

		// in milliseconds
		if (currentDate - w.lastUpdated > 1750) {
			watchers.splice(i, 1)
			return
		}
	}
}

function getAverage(watchers: watcher[]) {
	let total = 0
	for (const w of watchers) {
		total += w.currentTime
	}

	if (
		total === null ||
		total === void 0 ||
		watchers.length === null ||
		watchers.length === void 0 ||
		globalThis.isNaN(total) ||
		globalThis.isNaN(watchers.length)
	) {
		return 0
	}

	const average = total / watchers.length

	if (globalThis.isNaN(average)) {
		return 0
	}

	return average
}

export function socketioFactory(io: SocketIO.Server) {
	const watchers: watcher[] = []

	globalThis.setInterval(() => {
		console.table(watchers)
	}, 5000)

	globalThis.setInterval(() => {
		pruneWatchers(watchers)

		let average = getAverage(watchers)
		average = Math.round(average)

		io.emit('new-average', String(average))
	}, 300)

	globalThis.setInterval(() => {
		io.emit('all-watchers-payload', JSON.stringify(watchers))
	}, 1000)

	return (client: Socket) => {
		client.on('new-current-time', (watcherString: string) => {
			const watcher: watcher = JSON.parse(watcherString)
			updateWatcher(watchers, watcher)
		})

		client.on('disconnect', () => {
			console.info('disconnect')
		})

		client.on('connect', () => {
			console.info('connect')
		})
	}
}

function throttle(cb: () => void, limit: number) {
	var waiting = false
	return function () {
		if (!waiting) {
			cb.apply(this, arguments)
			waiting = true
			setTimeout(() => {
				waiting = false
			}, limit)
		}
	}
}
