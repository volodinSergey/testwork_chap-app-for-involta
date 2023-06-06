<script setup lang="ts">
import { ref } from 'vue'

const newMessage = ref<string>('')

const emit = defineEmits<{
	(e: 'message-sent', newMessage: string): void
}>()

const onSendMessage = () => {
	if (!newMessage.value.trim().length) return

	emit('message-sent', newMessage.value)

	newMessage.value = ''
}
</script>

<template>
	<form
		class="add-message-form"
		@submit.prevent="onSendMessage"
	>
		<input
			class="add-message-form__input input"
			type="text"
			v-model="newMessage"
			placeholder="Send anything ..."
		/>
		<button
			class="add-message-form__button button"
			type="submit"
		>
			Send
		</button>
	</form>
</template>

<style scoped lang="scss">
.add-message-form {
	display: grid;
	grid-template-columns: 1fr max-content;
	gap: 0.625rem;
	padding: 1rem;
	border-radius: 0.625rem;
	font-size: 1rem;
	background-color: #444;
}

.input,
.button {
	font-size: 1rem;
	color: #fff;
}

.input {
	transition: 0.2s;
	outline: none;
	padding-bottom: 5px;

	&::placeholder {
		color: inherit;
	}
}
</style>
