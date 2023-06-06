<template>
	<div class="loader"></div>
</template>

<style scoped lang="scss">

.loader {
	position: relative;
	width: 3.5rem;
	aspect-ratio: 1;
	font-size: 1.875rem;
	border: 0.5rem solid #212121;
	border-radius: 50%;
	border-top-color: #930dfd;
	animation: loading infinite .3s linear;

	@keyframes loading {
		100% {
			rotate: 360deg;
		}
	}
}
</style>
