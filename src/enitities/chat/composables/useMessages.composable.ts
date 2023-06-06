import { ref, onMounted } from 'vue'

import { TMessage } from '../repository/chat.repository.interface'

import { sleep } from '@shared/utils/sleep.util'

import { chatService } from '../service/chat.service'

export const useMessages = () => {
	const messagesList = ref<HTMLElement | undefined>()

	const messages = ref<TMessage[]>([])
	const isLoading = ref<boolean>(true)
	const isError = ref<boolean>(false)

	let isMessagesOver = false
	let offset: number = 20

	const fetchMessages = async (offset?: number) => {
		const result = await chatService.getMessages(offset)

		if (typeof result === 'string') {
			isError.value = true

			return false
		}

		!result.result.length && (isMessagesOver = true)

		messages.value = [...result.result.reverse(), ...messages.value]

		return true
	}

	const handleMessagesScroll = async () => {
		if (messagesList.value && messagesList.value.scrollTop !== 0) return

		isLoading.value = true
		isError.value = false

		await sleep(1000)

		if (isMessagesOver) {
			isLoading.value = false

			return
		}

		const isSuccessFullyFetched = await fetchMessages(offset)

		isLoading.value = false

		isSuccessFullyFetched && (offset += 20)

		messagesList.value?.scrollBy({
			top: 50,
			behavior: 'smooth'
		})
	}

	onMounted(async () => {
		isLoading.value = true

		await sleep(1000)

		await fetchMessages()

		messagesList.value?.scrollBy({
			top: 50,
			behavior: 'smooth'
		})

		isLoading.value = false

		messagesList.value?.addEventListener('scroll', handleMessagesScroll)
	})

	return {
		messages,
		isLoading,
		isError,
		handleMessagesScroll
	}
}
