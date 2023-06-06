<script setup lang="ts">
import { TMessage } from '@entities/chat/repository/chat.repository.interface'

import Message from '@entities/chat/ui/Message.entity.vue'

interface IProps {
	messages: TMessage[]
}

defineProps<IProps>()
</script>

<template>
	<ul class="messages-list">
		<Message
			v-for="(message, index) in messages"
			:message="message"
			:index="index"
		/>
	</ul>
</template>

<style scoped></style>
