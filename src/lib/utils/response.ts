import { STATUS_CODES, STATUS_MESSAGES } from '#utils/constants';
import type { Response } from 'express';

interface ServerResponse<T> {
	state: string;
	message: string;
	data?: T;
}

export interface IResponse extends Response {
	route?: string[];
	data?: ServerResponse<any>;
}

function send(response: Response, statusCode: number, message: string, data?: any) {
	const state = statusCode < 200 || statusCode > 299 ? 'error' : 'success';

	const responseData: ServerResponse<any> = {
		state,
		message,
		data
	};

	if (!data) {
		delete responseData.data;
	}

	(response as IResponse).data = responseData;
	return response.status(statusCode).json(responseData);
}

export function sendSuccessResponse(response: Response, data?: any): Response {
	return send(response, STATUS_CODES.OK, STATUS_MESSAGES.OK, data);
}

export function sendCreatedResponse(response: Response, data?: any): Response {
	return send(response, STATUS_CODES.CREATED, STATUS_MESSAGES.CREATED, data);
}

export function send404Response(response: Response, message = STATUS_MESSAGES.NOT_FOUND): Response {
	return send(response, STATUS_CODES.NOT_FOUND, message);
}

export function send500Response(response: Response, message = STATUS_MESSAGES.INTERNAL_SERVER_ERROR): Response {
	return send(response, STATUS_CODES.INTERNAL_SERVER_ERROR, message);
}

export function sendUnauthorizedResponse(response: Response, message = STATUS_MESSAGES.UNAUTHORIZED): Response {
	return send(response, STATUS_CODES.UNAUTHORIZED, message);
}

export function sendForbiddenResponse(response: Response, message = STATUS_MESSAGES.FORBIDDEN): Response {
	return send(response, STATUS_CODES.FORBIDDEN, message);
}

export function sendBadRequestResponse(response: Response, message = STATUS_MESSAGES.BAD_REQUEST): Response {
	return send(response, STATUS_CODES.BAD_REQUEST, message);
}
