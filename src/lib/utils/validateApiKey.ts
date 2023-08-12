import { STATUS_CODES, STATUS_MESSAGES } from '#utils/constants';
import type { NextFunction, Request, Response } from 'express';

export function validateApiKey(request: Request, response: Response, nextFunction: NextFunction) {
	const apiKey = request.headers['authorization'];
	if (!apiKey || apiKey !== process.env.API_KEY) {
		response.status(STATUS_CODES.UNAUTHORIZED).json({
			code: STATUS_CODES.UNAUTHORIZED,
			message: STATUS_MESSAGES.UNAUTHORIZED
		});
		return;
	}
	nextFunction();
}
