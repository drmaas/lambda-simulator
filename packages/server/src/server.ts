import { IncomingMessage, RequestListener, Server, ServerResponse, createServer } from 'http';
import querystring from 'querystring';
import {
    LambdaContext,
    LambdaEvent,
    ParsedHeaders,
    buildLambdaContext,
    buildLambdaEvent,
    Lambda,
} from '@lambda-simulator/common';

const getBody = async (req: IncomingMessage): Promise<string> => {
    const promise = new Promise<string>((resolve, reject) => {
        let body = '';
        req.on('readable', () => {
            body += req.read();
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', (error: Error) => {
            reject(error.message);
        });
    });
    return promise;
};

const requestExecutor = (lambdas: Array<Lambda>): RequestListener => {
    return async (req: IncomingMessage, res: ServerResponse) => {
        // read request
        const url = req.url?.split('?') || ['/', ''];
        const method = req.method || 'GET';
        const lambdaResource = req.headers['x-lambda-resource'];
        const lambdaName = req.headers['x-lambda-name'];
        const path = url[0];
        const query = querystring.parse(url[1]);
        const requestHeaders = req.headers as unknown as ParsedHeaders;
        const requestBody = await getBody(req);

        // convert to lambda
        const context: LambdaContext = buildLambdaContext();
        const event: LambdaEvent = buildLambdaEvent(
            method,
            lambdaResource as string,
            path,
            query,
            requestHeaders,
            requestBody
        );

        // search lambdas by path
        const lambda = lambdas.find((entry) => entry.name === (lambdaName as string));
        if (!lambda) {
            res.writeHead(500);
            res.end('Lambda not found!');
            return;
        }

        // execute lambda function
        const output = await lambda.handler(event, context);

        // read lambda output
        const { statusCode, body } = output;
        const headers = output.headers || {};

        // convert to http response
        res.writeHead(statusCode);
        Object.keys(headers || {}).forEach((key) => {
            // eslint-disable-next-line security/detect-object-injection
            const value = headers[key] as string;
            res.setHeader(key, value);
        });
        res.end(body);
    };
};

export const start = async (lambdas: Array<Lambda>, port: number = 8000): Promise<Server> => {
    const host = 'localhost';

    const server = createServer(requestExecutor(lambdas));
    return new Promise<Server>((resolve, reject) => {
        server.listen(port, host, () => {
            // eslint-disable-next-line no-console
            console.log(`Server is running on http://${host}:${port}`);
            resolve(server);
        });
        server.on('error', (error: Error) => {
            console.error(`Server error starting http://${host}:${port}`);
            reject(error);
        });
    });
};

export const stop = async (server: Server): Promise<Server> => {
    return new Promise<Server>((resolve, reject) => {
        server.close((error: Error | undefined) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                console.log(`Server stopped`);
                resolve(server);
            }
        });
    });
};
