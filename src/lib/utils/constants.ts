import { PrismaClient } from '@prisma/client';

export enum STATUS_CODES {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export enum STATUS_MESSAGES {
    OK = 'OK',
    CREATED = 'Created',
    BAD_REQUEST = 'Bad Request',
    UNAUTHORIZED = 'Unauthorized',
    FORBIDDEN = 'Forbidden',
    NOT_FOUND = 'Not Found',
    INTERNAL_SERVER_ERROR = 'Internal Server Error'
}

export type MODELS = Exclude<keyof PrismaClient, symbol | `$${string}`>;
export type METHODS = 'get' | 'post' | 'put' | 'delete' | 'all';
