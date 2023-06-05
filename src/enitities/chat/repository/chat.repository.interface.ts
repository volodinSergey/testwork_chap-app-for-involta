export interface IChatRepository {
	getMessages: (offset?: number) => Promise<ISuccessResponse | TFailureResponse>
}

export interface IServerResponse {
	data: ISuccessResponse | TFailureResponse
}

export type ISuccessResponse = {
	result: TMessage[]
}

export type TFailureResponse = string

export type TMessage = string
