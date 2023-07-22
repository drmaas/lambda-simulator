import { IncomingMessage, Server, ServerResponse, createServer } from 'http';
import querystring from 'querystring';
import { LambdaContext, LambdaEvent, LambdaOutput } from '@lambda-simulator/common';

const getBody = async (req: IncomingMessage): Promise<string | Error> => {
    const promise = new Promise<string>((resolve, reject) => {
        let body = '';
        req.on('readable', () => {
            body += req.read();
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', (error) => {
            reject(error);
        });
    });
    return promise;
};

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
    // read request
    const url = req.url?.split('?') || ['/', ''];
    const method = req.method || 'GET';
    const path = url[0];
    const query = querystring.parse(url[1]);
    const { headers } = req;
    const body = await getBody(req);

    // convert to lambda
    const context: LambdaContext = {
        awsRequestId: '',
    };
    const event: LambdaEvent = {};

    // execute lambda function

    // read lambda output
    const responseCode = 200;
    const responseHeaders: { [key: string]: unknown } = { header1: '' };
    const responseBody = '';
    const output: LambdaOutput = {
        statusCode: responseCode,
    };

    // convert to http response
    res.writeHead(responseCode);
    Object.keys(responseHeaders).forEach((key) => {
        const value = responseHeaders[key] as string;
        res.setHeader(key, value);
    });
    res.end(responseBody);

    console.log(`${method} ${query} ${path} ${headers} ${body} ${context} ${event} ${output}`);
};

export const start = (port: number = 8000): Server => {
    const host = 'localhost';

    const server = createServer(requestListener);
    server.listen(port, host, () => {
        // eslint-disable-next-line no-console
        console.log(`Server is running on http://${host}:${port}`);
    });
    return server;
};

export const stop = (server: Server) => {
    server.close();
};
