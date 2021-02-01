/**
 * @param {number} timeDifference
 */
function scrubVideo(timeDifference) {
	const video = document.querySelector('video')
	if (!video) {
		console.info('Error: video')
		return
	}

	video.currentTime = video.currentTime + timeDifference
}
