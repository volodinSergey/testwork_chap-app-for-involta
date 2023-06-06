import { ref, onMounted } from 'vue'

import { sleep } from '@shared/utils/sleep.util'

import { chatService } from '@entities/chat/service/chat.service'
import { TMessage } from '@entities/chat/repository/chat.repository.interface'

export const useMessages = () => {
	const messagesContainer = ref<HTMLElement | undefined>()

	const messages = ref<TMessage[]>([])
	const isLoading = ref<boolean>(true)
	const isError = ref<boolean>(false)

	let areMessagesOver: boolean = false
	let offset: number = 20

	const fetchMessages = async (offset?: number) => {
		const result = await chatService.getMessages(offset)

		/* If we get error (Oops, try again) from server*/
		if (typeof result === 'string') {
			isError.value = true

			return false
		}

		/* If we get empty array from server , it means that messages are over*/
		!result.result.length && (areMessagesOver = true)

		messages.value = [...result.result.reverse(), ...messages.value]

		return true
	}

	const handleMessagesScroll = async () => {
		if (messagesContainer.value && messagesContainer.value.scrollTop !== 0) return

		isLoading.value = true
		isError.value = false

		await sleep(1000)

		if (areMessagesOver) {
			isLoading.value = false

			return
		}

		const isSuccessFullyFetched = await fetchMessages(offset)

		isLoading.value = false

		isSuccessFullyFetched && (offset += 20)

		messagesContainer.value?.scrollBy({
			top: 50,
			behavior: 'smooth'
		})
	}

	onMounted(async () => {
		isLoading.value = true

		await sleep(1000)

		await fetchMessages()

		messagesContainer.value?.scrollBy({
			top: 50,
			behavior: 'smooth'
		})

		isLoading.value = false

		messagesContainer.value?.addEventListener('scroll', handleMessagesScroll)
	})

	return {
		messages,
		isLoading,
		isError,
		messagesContainer
	}
}
