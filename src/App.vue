<script setup lang="ts">
import Navbar from '@widgets/Navbar.widget.vue'
import SendMessage from '@features/SendMessage.feature.vue'
import Loader from '@shared/ui/Loader.ui.vue'

import { useMessages } from './enitities/chat/composables/useMessages.composable'
import { nextTick, ref } from 'vue'

const { messages, isLoading, isError } = useMessages()

const scrollToBottomAnchor = ref<HTMLElement | undefined>()

const handleMessageSent = (newMessage: string): void => {
	messages.value = [...messages.value, newMessage]

	nextTick(() => {
		scrollToBottomAnchor.value?.scrollIntoView({
			block: 'end',
			behavior: 'smooth'
		})
	})
}
</script>

<template>
	<div class="chat">
		<Navbar />

		<div class="chat__messages-container messages-container">
			<div
				class="messages-container__top"
				ref="messagesList"
			>
				<div class="status-panel">Status panel</div>
				<ul class="messages-list">
					<div class="error-panel">
						<Loader v-if="isLoading" />
						<h3 v-else-if="isError">Try later</h3>
					</div>

					<li
						class="message"
						v-for="(message, index) in messages"
						:key="index"
						:class="{ 'my-message': index % 2 === 0 }"
					>
						{{ message }}
					</li>

					<div ref="scrollToBottomAnchor"></div>
				</ul>
			</div>

			<div class="messages-container__bottom">
				<SendMessage @message-sent="handleMessageSent" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.chat {
	display: grid;
	min-height: 100vh;
	grid-template-columns: 9.375rem 1fr;
	grid-template-rows: 100vh;

	@media (max-width: 48rem) {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
	}
}

.messages-container {
	position: relative;
	display: grid;
	min-height: 100%;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr auto;
	padding: 0.625rem;
	background-color: #555;

	@media (max-width: 768px) {
		height: 1.25rem;
	}
}

.messages-container__top,
.messages-container__bottom {
	margin: 0 auto;
	width: 100%;
	max-width: 43.75rem;

	@media (max-width: 57.8125rem) {
		width: 100%;
	}
}

.messages-container__top {
	position: relative;
	overflow: auto;
}

.messages-container__bottom {
	padding: 1rem 1rem 0 1rem;

	@media (max-width: 57.8125rem) {
		position: sticky;
		bottom: 0;
	}
}

.messages-list {
	display: flex;
	flex-direction: column;
	padding: 1.9375rem 0.625rem;
}

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
