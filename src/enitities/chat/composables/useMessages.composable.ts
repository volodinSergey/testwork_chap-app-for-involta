import { onMounted, ref } from 'vue'

import { TFailureResponse, TMessage } from '../repository/chat.repository.interface'

import { IUseMessagesComposable } from './useMessages.composable.interface'

import { chatService } from '../service/chat.service'


export const useMessages = ():IUseMessagesComposable => {
	const messages = ref<TMessage[]>([])
	const isMessagesLoading = ref<boolean>(true)
	const failResponse = ref<TFailureResponse>('')

	onMounted(async () => {
		const result = await chatService.getMessages()

		if (typeof result === 'string') {
			failResponse.value = result
		} else {
			messages.value = result.result
		}

		isMessagesLoading.value = false
	})

	return {
		messages,
		isMessagesLoading,
		failResponse
	}
}