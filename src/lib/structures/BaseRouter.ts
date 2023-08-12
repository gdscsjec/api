import { Router } from 'express';
import { validateApiKey } from '#utils/validateApiKey';
import { PrismaClient } from '@prisma/client';
import { prisma } from '#structures/db';
import type { METHODS, MODELS } from '#utils/constants';
import type { IResponse } from '#utils/response';
import type { NextFunction, Request, RequestHandler } from 'express';
import type { PathParams, RequestHandlerParams } from 'express-serve-static-core';

export class BaseRouter<U extends MODELS> {
	public router: Router;
	public repo: U;
	private prisma: PrismaClient;

	constructor(repo: U) {
		this.repo = repo;
		this.router = Router();
		this.prisma = prisma;
	}

	public get model() {
		return this.prisma[this.repo];
	}

	public createRoute(method: METHODS, url: PathParams, routeFunction: RequestHandler | RequestHandlerParams): void {
		this.router[method](url, validateApiKey, this.asyncHandler(routeFunction));
	}

	private asyncHandler(routeFunction: any): any {
		return (request: Request, response: IResponse, next: NextFunction) => {
			if (!response.route) {
				response.route = [];
			}
			response.route.push(`${this.constructor.name}:${routeFunction.name}`);
			Promise.resolve(routeFunction.call(this, request, response, next)).catch(next);
		};
	}
}
