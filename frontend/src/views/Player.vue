<template>
	<h1>Player</h1>
	<p>{{ url }}{{ $route.query.media }}</p>
	<video controls width="800">
		<source
			:src="'http://localhost:3000/tempmovie?media=' + $route.query.media"
			type="video/webm"
		/>

		Sorry, your browser doesn't support embedded videos.
	</video>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'

export default defineComponent({
	name: 'Media',
	setup(props, context) {
		const data = reactive({})

		return data
	},
})
</script>

<style>
video {
	max-width: 100%;
}
</style>
