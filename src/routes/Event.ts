import { BaseRouter } from '#structures/BaseRouter';
import { sendCreatedResponse, sendSuccessResponse } from '#utils/response';
import type { NextFunction, Request, Response } from 'express';

export class EventRouter extends BaseRouter<'event'> {
	constructor() {
		super('event');
		this.createRoute('get', '/', this.getAll);
		this.createRoute('get', '/:id', this.getById);
		this.createRoute('get', '/count', this.count);

		this.createRoute('post', '/', this.create);

		this.createRoute('delete', '/:id', this.delete);

		this.createRoute('put', '/:id', this.update);
	}

	public async getAll(_request: Request, response: Response, _nextFunction: NextFunction) {
		const events = await this.model.findMany();
		sendSuccessResponse(response, events);
	}

	public async getById(request: Request, response: Response, _nextFunction: NextFunction) {
		const event = await this.model.findUnique({
			where: { id: request.params.id }
		});
		sendSuccessResponse(response, event);
	}

	public async create(request: Request, response: Response, _nextFunction: NextFunction) {
		const event = await this.model.create({ data: request.body });
		sendCreatedResponse(response, event);
	}

	public async delete(request: Request, response: Response, _nextFunction: NextFunction) {
		const event = await this.model.delete({ where: { id: request.params.id } });
		sendSuccessResponse(response, event);
	}

	public async update(request: Request, response: Response, _nextFunction: NextFunction) {
		const event = await this.model.update({
			where: { id: request.params.id },
			data: request.body
		});
		sendSuccessResponse(response, event);
	}

	public async count(request: Request, response: Response, _nextFunction: NextFunction) {
		const event = await this.model.count(request.body);
		sendSuccessResponse(response, event);
	}
}
