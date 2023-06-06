import { Ref } from 'vue'

import { TFailureResponse, TMessage } from '@entities/chat/repository/chat.repository.interface'

export interface IUseMessagesComposable {
	messages: Ref<TMessage[]>

	isMessagesLoading: Ref<boolean>

	failResponse: Ref<TFailureResponse>
}
