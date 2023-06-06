import { Ref } from 'vue'

import { TMessage } from '@entities/chat/repository/chat.repository.interface'

/**
 * @title useMessages composable
 * @description  Used for extracting messages logic inside. Represents composable's returned values.
 */
export interface IUseMessagesComposable {
	/**
	 * @title Messages state
	 * @description Saves messages from server
	 */
	messages: Ref<TMessage[]>

	/**
	 * @title Is loading state
	 * @description When messages are fetching
	 */
	isLoading: Ref<boolean>

	/**
	 * @title Is error state
	 * @description When we get error response from server
	 */
	isError: Ref<boolean>

	/**
	 * @title Messages container
	 * @description Template ref for messages container.
	 */
	messagesContainer: Ref<HTMLElement | undefined>
}
