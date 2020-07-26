// @ts-ignore
const socket = io()

let ID = Math.floor(Math.random() * 100000)
console.info(`Your ID: ${ID}`)

/**
 * @param {number} ee
 */
function aa(ee) {
	const video = document.querySelector('video')
	if (!video) {
		console.info('Error: video')
		return
	}

	video.currentTime = video.currentTime + ee
}

/**
 * @returns number
 */
function update() {
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

update()
setInterval(
	() => {
		const currentTime = update()

		/**
		 * @typedef {object} data
		 * @property {number} id
		 * @property {number} lastUpdated
		 * @property {number} currentTime
		 */

		/** @type data */
		const data = {
			id: ID,
			lastUpdated: Date.now(),
			currentTime,
		}

		socket.emit('new-current-time', JSON.stringify(data))
	},
	1000,
	true
)

socket.on('new-average', (/** @type {string} */ average) => {
	if (!document.querySelector('video')) {
		return
	}

	const newAverage = Number(average)
	// console.info('newaverage', newAverage)

	// @ts-ignore
	globalThis.averageTime = newAverage
	const text = secondsToHms(newAverage)
	const jumpEl = document.getElementById('jump')
	jumpEl.innerHTML = `<b>Average</b>: ${text}`
})

/**
 * @typedef {object} watcher
 * @property {number} id
 * @property {number} lastUpdated
 * @property {number} currentTime
 */

socket.on('alll', (/** @type {string} */ watchersString) => {
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
		const b = document.createElement('button')
		b.innerText = 'Jump'
		b.classList.add('jj')
		b.onclick = (ev) => {
			const video = document.querySelector('video')
			if (!video) {
				console.info('Error: video')
				return
			}
			video.currentTime = watcher.currentTime
		}
		f3.appendChild(b)
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

/**
 * @param {number} d
 */
function secondsToHms(d) {
	if (!d) {
		return '0 hrs 0 mins 0 sec'
	}

	d = Number(d)
	var h = Math.floor(d / 3600)
	var m = Math.floor((d % 3600) / 60)
	var s = Math.floor((d % 3600) % 60)

	var hDisplay = h > 0 ? h + (h == 1 ? ' hrs, ' : ' hrs, ') : ''
	var mDisplay = m > 0 ? m + (m == 1 ? ' mins, ' : ' mins, ') : ''
	var sDisplay = s > 0 ? s + (s == 1 ? ' sec' : ' sec') : ''
	return hDisplay + mDisplay + sDisplay
}

document.getElementById('jumpbutton') &&
	document.getElementById('jumpbutton').addEventListener('click', (ev) => {
		const video = document.querySelector('video')
		if (!video) {
			console.info('Error: video')
			return
		}

		// @ts-ignore
		if (!globalThis.averageTime) {
			console.debug('average time not truthy')
		}

		// @ts-ignore
		video.currentTime = globalThis.averageTime
	})
