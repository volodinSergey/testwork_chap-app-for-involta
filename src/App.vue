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
						v-for="index in 100"
						:key="index"
						:class="{ 'my-message': index % 2 === 0 }"
					>
						{{ index }}
					</li>
				</ul>
			</div>

			<div class="messages-container__bottom">
				<form
					class="add-message-form"
					@submit.prevent=""
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
	min-height: 100vh;
	grid-template-columns: 9.375rem 1fr;
	grid-template-rows: 100vh;

	@media (max-width: 48rem) {
		grid-template-columns: 1fr;
		grid-template-rows: min(5.5rem) 1fr;
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
		height: 20px;
	}
}

.messages-container__top,
.messages-container__bottom {
	margin: 0 auto;
	width: 43.75rem;
	max-width: 43.75rem;

	@media (max-width: 57.8125rem) {
		width: 100%;
	}
}

.messages-container__top {
	overflow: auto;
}

.messages-container__bottom {
	padding: 1.25rem;

	@media (max-width: 57.8125rem) {
		position: sticky;
		bottom: 0;
	}
}

.messages-list {
	display: grid;
	gap: 0.625rem;
}

.message {
	color: #fff;
	padding: 5px;
	border-radius: 1.25rem;
	background-color: rgb(20, 11, 66);
	max-width: 60%;
	width: 60%;
	padding: 0.625rem;
}

.my-message {
	background-color: #380b0b;
	justify-self: end;
}

.add-message-form {
	display: grid;
	grid-template-columns: 1fr max-content;
	border: 1px solid black;
	padding: 0.625rem;
	border-radius: 0.625rem;
	/* 
	@media (max-width: 768px) {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	} */
}
</style>
