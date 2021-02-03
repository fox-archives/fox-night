const socket = io()

let ID = Math.floor(Math.random() * 100000)
console.info(`Your ID: ${ID}`)

/**
 * @returns number
 */
function updateCurrentTime() {
	const video = document.querySelector('video')
	if (!video) {
		return
	}

	const currentTime = Math.round(video.currentTime)
	if (currentTime === null && currentTime === void 0) {
		console.info('Error: currentTime')
		return
	}

	const text = secondsToHms(currentTime)
	const timeEl = document.getElementById('time')
	timeEl.innerHTML = `${text}`

	return currentTime
}

updateCurrentTime()
setInterval(
	() => {
		const currentTime = updateCurrentTime()

		/**
		 * @typedef {object} data
		 * @property {number} id
		 * @property {number} currentTime
		 */

		/** @type data */
		const data = {
			id: ID,
			// this is handled by the server now
			// lastUpdated: Date.now(),
			currentTime,
		}

		socket.emit('new-current-time', JSON.stringify(data))
	},
	1000,
	true
)

/**
 * @typedef {object} watcher
 * @property {number} id
 * @property {number} lastUpdated
 * @property {number} currentTime
 */
socket.on('all-watchers-payload', (/** @type {string} */ watchersString) => {
	if (!document.querySelector('video')) {
		return
	}

	/** @type {watcher[]} */
	const watchers = JSON.parse(watchersString)

	const fragment = document.createDocumentFragment()

	const table = document.createElement('table')
	table.id = 'watchers'
	fragment.appendChild(table)

	const thead = document.createElement('thead')
	const tbody = document.createElement('tbody')
	table.appendChild(thead)
	table.appendChild(tbody)

	const r1 = document.createElement('tr')
	const d1 = document.createElement('td')
	d1.style.cssText = 'width: 90px;'
	const d2 = document.createElement('td')
	d2.style.cssText = 'width: 160px;'
	const d3 = document.createElement('td')
	r1.appendChild(d1)
	r1.appendChild(d2)
	r1.appendChild(d3)
	d1.innerText = 'ID'
	d2.innerText = 'Time'
	d3.innerText = 'Jump'
	thead.appendChild(r1)

	for (const watcher of watchers) {
		const w = document.createElement('tr')
		const f1 = document.createElement('td')
		const f2 = document.createElement('td')
		const f3 = document.createElement('td')
		w.appendChild(f1)
		w.appendChild(f2)
		w.appendChild(f3)
		f1.innerText = String(watcher.id)
		f2.innerText = String(secondsToHms(watcher.currentTime))
		if (Number(watcher.id) == ID) {
			f1.style.fontWeight = 'bold'
			f2.style.fontWeight = 'bold'
		}
		const button = document.createElement('button')
		button.innerText = 'Jump'
		button.classList.add('watcher-jump-button')
		button.onclick = (ev) => {
			const video = document.querySelector('video')
			if (!video) {
				console.info('Error: video')
				return
			}
			video.currentTime = watcher.currentTime
		}
		f3.appendChild(button)
		tbody.appendChild(w)
	}

	const ww = document.getElementById('watchers')
	ww.parentNode.replaceChild(fragment, ww)
})

socket.on('connect', () => {
	console.debug('connected')
})

socket.on('disconnect', () => {
	console.info('disconnect')
})
