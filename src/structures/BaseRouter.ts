import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export abstract class BaseRouter {
  protected router: Router;
  protected prisma: PrismaClient;

  constructor() {
    this.router = Router();
    this.prisma = new PrismaClient();
  }

  /**
   * Get the router.
   * @return {Router} The router object.
   */
  abstract getRouter(): Router;

  /**
   * Retrieves all the data.
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @return {void} no return value
   */
  abstract getAll(req: Request, res: Response): Promise<unknown> | unknown;

  /**
   * Get an entity by its ID.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @return {void} This function does not return anything.
   */
  abstract getById(req: Request, res: Response): void;

  /**
   * Create a new entity.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @return {void} This function does not return a value.
   */
  abstract create(req: Request, res: Response): void;

  abstract update(req: Request, res: Response): void;

  abstract delete(req: Request, res: Response): void;
}
