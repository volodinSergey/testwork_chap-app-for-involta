/**
 * @title Chat repository
 * @description Represents DAL (data access layer). Responsible for work with data fro api
 */
export interface IChatRepository {
	/**
	 * @title Method [ getMessages ]
	 * @description Allows to get messages from api
	 * @param offset Allows to setup offset
	 * @returns Either messages array (ISuccessResponse) or server error message (TFailureResponse)
	 */
	getMessages: (offset?: number) => Promise<ISuccessResponse | TFailureResponse>
}

/**
 * @title Server response
 * @description Represents server response. We use axios and we get data field with either messages array (<ISuccessResponse) or server error message (TFailureResponse)
 */
export interface IServerResponse {
	data: ISuccessResponse | TFailureResponse
}

/**
 * @title Successful reponse from server
 * @description Represents successful response from server
 */
export type ISuccessResponse = {
	result: TMessage[]
}

/**
 * @title Unsuccessfull reponse from server
 * @description Represents unsuccessful response from server
 */
export type TFailureResponse = string

/**
 * @title Message typing
 * @description Typing of message. In this app, we get message as string
 */
export type TMessage = string
