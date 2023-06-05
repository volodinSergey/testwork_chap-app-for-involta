<script setup lang="ts">
import Navbar from '@widgets/Navbar.widget.vue'
</script>

<template>
	<div class="chat">
		<Navbar />

		<div class="chat__messages-container messages-container">
			<div class="messages-container__top">
				<ul class="messages-list">
					<li
						class="message"
						v-for="index in 60"
					>
						{{ index }}
					</li>
				</ul>
			</div>

			<div class="messages-container__bottom">
				<form
					@submit.prevent=""
					class="add-message-form"
				>
					<input
						type="text"
						placeholder="Напишите сообщение"
					/>
					<button type="submit">Send</button>
				</form>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.chat {
	display: grid;
	grid-template-columns: 9.375rem 1fr;
	width: 100vw;
	height: 100vh;

	@media (max-width: 48rem) {
		grid-template-columns: 1fr;
		grid-template-rows: min(8.5rem) 1fr;
	}
}

.messages-container {
	padding: 0.625rem;
	background-color: #555;
}

.messages-container__top,
.messages-container__bottom {
	margin: 0 auto;
	max-width: 43.75rem;
}

.messages-list {
	overflow-y: auto;
}
</style>
