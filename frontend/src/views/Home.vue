<template>
	<div class="home">
		<h1>Welcome to Fox Night!</h1>
		<img alt="Vue logo" src="../assets/fox.jpg" />
		<p>
			Fox Night is a site for watching the movies and TV shows you love! It
			enables friends to share their media with others and facilitates useful
			group-watching features! If you want to request a feature, you know
			where to find me :)
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
	name: 'Home',
	// components: {
	// 	HelloWorld,
	// },
})
</script>

<style scoped>
.home {
	max-width: 1000px;
}
img {
	width: 800px;
	max-width: 100%;
	border-radius: 4px;
}
</style>
