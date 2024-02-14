import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'reflect-metadata';
import { PGLoader } from './src/loaders/pg.loader';
import { InvalidEntryDateException } from './src/exceptions/invalid_entry_data';
import Container from 'typedi';
import { Controller } from './src/controller/controller';
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        await PGLoader.invoke();

        const result = await Container.get(Controller).invoke();

        response = {
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
            },
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (err) {
        console.log(err);

        let message = '';
        if (err instanceof InvalidEntryDateException) {
            message = err.message;
        } else {
            message = 'some error happened';
        }

        response = {
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
            },
            statusCode: 500,
            body: JSON.stringify({
                message: message,
            }),
        };
    }

    return response;
};
