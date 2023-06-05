<template>
	<div class="loader"></div>
</template>

<style scoped lang="scss">
.loader {
	position: relative;
	width: 3.5rem;
	aspect-ratio: 1;
	font-size: 1.875rem;
	border: 10px solid black;
	border-radius: 50%;
	border-top-color: red;
	animation: loading infinite 1s linear;

	@keyframes loading {
		100% {
			rotate: 360deg;
		}
	}
}
</style>
