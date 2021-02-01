/**
 * @param {number} seconds
 * @global
 */
function secondsToHms(seconds) {
	if (!seconds) {
		return '0 hrs 0 mins 0 sec'
	}

	seconds = Number(seconds)
	var h = Math.floor(seconds / 3600)
	var m = Math.floor((seconds % 3600) / 60)
	var s = Math.floor((seconds % 3600) % 60)

	var hDisplay = h > 0 ? h + (h == 1 ? ' hrs, ' : ' hrs, ') : ''
	var mDisplay = m > 0 ? m + (m == 1 ? ' mins, ' : ' mins, ') : ''
	var sDisplay = s > 0 ? s + (s == 1 ? ' sec' : ' sec') : ''
	return hDisplay + mDisplay + sDisplay
}
