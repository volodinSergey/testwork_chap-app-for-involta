<script setup lang="ts">
interface IProps {
	message: string
	index: number
}

defineProps<IProps>()
</script>

<template>
	<li
		class="message"
		:class="{ 'my-message': index % 2 === 0 }"
	>
		{{ message }}
	</li>
</template>

<style scoped lang="scss">
.message {
	color: #fff;
	padding: 5px;
	border-radius: 0.7rem;
	background-color: rgb(20, 11, 66);
	width: max-content;
	max-width: 60%;
	padding: 0.625rem;
	animation: message-appear 0.3s linear;
}

@keyframes message-appear {
	from {
		transform: translateY(-10px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}

.my-message {
	align-self: flex-end;
	background-color: #380b0b;
}
</style>
