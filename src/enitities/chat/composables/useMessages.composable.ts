import { computed, onMounted, ref } from 'vue'

import { TFailureResponse, TMessage } from '../repository/chat.repository.interface'

import { IUseMessagesComposable } from './useMessages.composable.interface'

import { chatService } from '../service/chat.service'

export const useMessages = () => {
	const messages = ref<TMessage[]>([])
	const isLoading = ref<boolean>(true)
	const failResponse = ref<TFailureResponse>('')

	const isFailResponseExists = computed(() => failResponse.value.length > 0)

	const fetchMessages = async (offset: number = 0) => {
		failResponse.value
		isLoading.value = true

		const result = await chatService.getMessages(offset)

		if (typeof result === 'string') {
			failResponse.value = result
		} else {
			console.log(result)
			messages.value = [...result.result.reverse(), ...messages.value]
		}

		isLoading.value = false
	}

	onMounted(async () => await fetchMessages())

	return {
		messages,
		isLoading,
		failResponse,
		isFailResponseExists,
		fetchMessages
	}
}
