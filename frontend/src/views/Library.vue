<template>
	<h1>Media</h1>
	<p>
		{{ four }} Ant-Man 2015 intrindic video/audio encoding preventing stream
		TODO
	</p>
	<div v-if="list.length > 0">
		<div v-for="file in list" :key="file">
			<!--<a
				:href="
					'http://localhost:3000/tempmovie?media=' +
					encodeURIComponent(file)
				"
				>{{ file }}</a>
			-->
			<a :href="'/player?media=' + encodeURIComponent(file)">{{ file }} ></a>
		</div>
	</div>
	<div v-else>Loading</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'

export default defineComponent({
	name: 'Media',
	setup(props, context) {
		const data = reactive({
			list: [],
			four: 'uwu',
		})

		onMounted(async () => {
			updateThing()
		})

		const updateThing = async () => {
			fetch('/api/media')
				.then((res) => res.json())
				.then((res) => {
					console.info(res)
					console.info(props)

					data.list = res.Movies
				})
				.catch((err) => {
					console.error(err)
				})
		}

		return data
	},
})
</script>

<style>
a {
	color: var(--white) !important;
}
</style>
