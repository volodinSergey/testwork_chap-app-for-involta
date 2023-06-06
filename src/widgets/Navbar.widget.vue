<template>
	<div class="navbar">Navbar content can be here ...</div>
</template>

<style scoped lang="scss">
.navbar {
	padding: 0.625rem;
	z-index: 1;
	box-shadow: 0.75rem -0.0625rem 0.8125rem 0px #444;
	color: #fff;
	background-color: #222;

	@media (max-width: 47.375rem) {
		position: sticky;
		top: 0;
		width: 100%;
		box-shadow: 0rem 1rem 1rem 0px #444;
	}
}
</style>
