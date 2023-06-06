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
$bgColor-message: #212121;
$bgColor-myMessage: #930dfd;
.message {
	color: #fff;
	padding: 5px;
	border-radius: 0.7rem;
	background-color: $bgColor-message;
	width: max-content;
	max-width: 60%;
	padding: 0.625rem;
	animation: message-appear 0.3s linear;
	overflow-wrap: break-word;
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
	background-color: $bgColor-myMessage;
}
</style>
