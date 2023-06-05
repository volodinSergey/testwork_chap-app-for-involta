import { Ref } from 'vue'

import { TFailureResponse, TMessage } from '../repository/chat.repository.interface'

export interface IUseMessagesComposable {
	messages: Ref<TMessage[]>

	isMessagesLoading: Ref<boolean>

	failResponse: Ref<TFailureResponse>
}
