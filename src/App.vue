<script setup lang="ts">
import { ref, nextTick } from 'vue'

import Navbar from '@widgets/Navbar.widget.vue'
import SendMessage from '@features/SendMessage.feature.vue'
import Loader from '@shared/ui/Loader.ui.vue'
import Message from './enitities/chat/ui/Message.entity.vue'

import { useMessages } from './enitities/chat/composables/useMessages.composable'

const { messages, isLoading, isError, messagesContainer } = useMessages()

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
			<div class="loading-status-panel">
				<Loader v-if="isLoading" />

				<h3 v-else-if="isError">Something's wrong. Try again</h3>
			</div>
			<div
				class="messages-container__top"
				ref="messagesContainer"
			>
				<ul class="messages-list">
					<Message
						v-for="(message, index) in messages"
						:message="message"
						:index="index"
					/>
				</ul>
				<div ref="scrollToBottomAnchor"></div>
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

.loading-status-panel,
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
	border-top: 0.0625rem solid #fff;

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
</style>
