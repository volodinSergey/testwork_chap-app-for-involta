import { IChatRepository, ISuccessResponse, TFailureResponse } from '@entities/chat/repository/chat.repository.interface'
import { ChatRespository } from '@entities/chat/repository/chat.repository'

class ChatService {
	#chatRepository: IChatRepository

	constructor(chatRepository: IChatRepository) {
		this.#chatRepository = chatRepository
	}

	async getMessages(offset = 0): Promise<TFailureResponse | ISuccessResponse> {
		const data = await this.#chatRepository.getMessages(offset)

		return data
	}
}

export const chatService = new ChatService(new ChatRespository())
