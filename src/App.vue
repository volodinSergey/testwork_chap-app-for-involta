<script setup lang="ts">
import Navbar from '@widgets/Navbar.widget.vue'

const messages: string[] = [
	'Сообщение 1',
	'Сообщение 2',
	'Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное',
	'Сообщение 1',
	'Сообщение 2',
	'Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное',
	'Сообщение 1',
	'Сообщение 2 fregrgrgrgrg',
	'Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное',
	'Сообщение 1',
	'Сообщение 2',
	'Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное',
	'Сообщение 1',
	'Сообщение 2',
	'Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное',
	'Сообщение 1',
	'Сообщение 2',
	'Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное Сообщение 1 длинное'
]
</script>

<template>
	<div class="chat">
		<Navbar />

		<div class="chat__messages-container messages-container">
			<div class="messages-container__top">
				<ul class="messages-list">
					<li
						class="message"
						v-for="(message, index) in messages"
						:key="index"
						:class="{ 'my-message': index % 2 === 0 }"
					>
						{{ message }}
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
	padding: 0 0.9375rem;
}

.message {
	color: #fff;
	padding: 5px;
	border-radius: 1.25rem;
	background-color: rgb(20, 11, 66);
	min-width: min-content;
	max-width: 60%;
	padding: 0.625rem;
}

.my-message {
	justify-self: end;
	background-color: #380b0b;
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
