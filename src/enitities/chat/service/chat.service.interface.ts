import { ISuccessResponse, TFailureResponse } from "../repository/chat.repository.interface";

export interface IChatService {
    getMessages(offset?: number): Promise<TFailureResponse| ISuccessResponse>
}