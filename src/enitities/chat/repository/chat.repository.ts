import axios from 'axios'

import { IChatRepository, IServerResponse, ISuccessResponse, TFailureResponse } from './chat.repository.interface'

export class ChatRespository implements IChatRepository {
	#BASE_URL: string = 'https://numia.ru/api'

	async getMessages(offset = 0): Promise<ISuccessResponse | TFailureResponse> {
		try {
			const { data }: IServerResponse = await axios.get(`${this.#BASE_URL}/getMessages?offset=${offset}`)

			return data
		} catch (e: unknown) {
			throw new Error('Error in chat repository !')
		}
	}
}
