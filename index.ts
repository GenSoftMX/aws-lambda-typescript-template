import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'reflect-metadata';
import { PGLoader } from './src/loaders/pg.loader';
import { InvalidEntryDateException } from './src/exceptions/invalid_entry_data';
import Container from 'typedi';
import { Controller } from './src/controller/controller';
import { StatusCodes } from 'http-status-codes';
import { QueryDateException } from './src/exceptions/query_date_exception';
import { MethodNotAllowedException } from './src/exceptions/method_not_allowed_exception';

const errorStatusMap = new Map([
    [InvalidEntryDateException, StatusCodes.BAD_REQUEST],
    [QueryDateException, StatusCodes.BAD_REQUEST],
    [MethodNotAllowedException, StatusCodes.METHOD_NOT_ALLOWED],
]);

const headers = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
};

const createResponse = (statusCode: StatusCodes, message: string): APIGatewayProxyResult => {
    return {
        headers,
        statusCode,
        body: message,
    };
};

export const mainHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;

    try {

        if (event.httpMethod.toUpperCase() != "GET") {
            throw new MethodNotAllowedException("Method not allowed");
        }

        await PGLoader.invoke();

        const result = await Container.get(Controller).invoke();

        response = createResponse(StatusCodes.OK, JSON.stringify(result));

    } catch (err) {
        let message = 'Some error happened';
        let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

        for (const [errorType, status] of errorStatusMap.entries()) {
            if (err instanceof errorType) {
                message = err.message;
                statusCode = status;
                break;
            }
        }

        console.error(message, err);

        response = createResponse(statusCode, message);
    }

    return response;
};
