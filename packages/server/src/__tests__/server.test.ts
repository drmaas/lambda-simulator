import { IncomingMessage, request, RequestOptions } from 'http';
import { start, stop } from '../server';

const clientRequest = (
    port: number,
    method: string,
    queryString: string | undefined,
    data: string | undefined
): Promise<IncomingMessage | Error> => {
    const options = {
        host: 'localhost',
        port,
        path: `/test/1/2${queryString || ''}`,
        method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data || ''),
            'X-Lambda-Name': 'test',
            'X-Lambda-Resource': '/test/{y}/{z}',
        },
    };
    const promise = new Promise<IncomingMessage | Error>((resolve, reject) => {
        const req = request(options, (res) => {
            res.setEncoding('utf8');
            resolve(res);
        });
        // handle errors
        req.on('error', (e) => {
            reject(e);
        });
        // Write data to request body
        req.write(data || '');
        req.end();
    });
    return promise;
};

beforeEach(() => {
    jest.clearAllMocks(); // Clear mock states
    jest.restoreAllMocks(); // Restore spy
});

describe('http server', () => {
    it('starts and stops as expected', async () => {
        const lambdas = [];
        const server = await start(lambdas, 8000);
        expect(server.listening).toBeTruthy();
        await stop(server);
        expect(server.listening).toBeFalsy();
    });
    it('can make a lambda request and read the response', async () => {
        // TODO define lambdas
        const lambdas = [];
        const server = await start(lambdas, 8000);
        expect(server.listening).toBeTruthy();

        const response = await clientRequest(8000, 'GET', '?a=b&c=d', '');
        // TODO assert response
        expect(response).toBeDefined();

        await stop(server);
        expect(server.listening).toBeFalsy();
    });
});
