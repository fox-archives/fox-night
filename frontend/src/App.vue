<template>
	<nav>
		<img class="red-panda" src="@/assets/red-panda-wink.jpg" />
		<router-link to="/">Home</router-link>
		<router-link to="/library">Library</router-link>
		<router-link to="/events">Events</router-link>
	</nav>
	<router-view />
</template>

<style lang="scss">
@import 'modern-css-reset';

@font-face {
	font-family: myFirstFont;
	src: url('/public/fonts/Quicksand-Bold.woff');
}

:root {
	--gray: #363333;
	--black: #272121;
	--orange: #e16428;
	--white: #f6e9e9;
}

body {
	color: var(--white);
	background-color: var(--black);
	margin-block-start: 8px;
	margin-inline: 8px;
}

p {
	line-height: 140%;
	font-size: 18px;
}

img {
	margin-inline-end: 5px;
	margin-block-end: 5px;
}

#app {
	font-family: system-ui;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

nav {
	display: flex;
	align-items: center;
	margin: 4px;
}

nav a {
	font-family: myFirstFont;
	font-size: 30px;
	margin-inline-start: 10px;

	color: var(--orange);
	text-decoration: none;
}

nav a:hover {
	text-decoration: underline;
	text-decoration-color: var(--orange);
}

.red-panda {
	width: 35px;
	border-radius: 5px;
	margin: 0;
}
</style>
