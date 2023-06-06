import { ISuccessResponse, TFailureResponse } from '@entities/chat/repository/chat.repository.interface'

/**
 * @title Chat service
 * @description Represents BLL (business logic layer). Responsible for business logic with messges
 */
export interface IChatService {
	/**
	 * @title Method [ getMessages ]
	 * @description Allows to get messages. Service will be getting messages from repository that responsible for getting data from api
	 * @param offset Allows to setup offset
	 * @returns Either messages array (ISuccessResponse) or server error message (TFailureResponse)
	 */
	getMessages(offset?: number): Promise<ISuccessResponse | TFailureResponse>
}
