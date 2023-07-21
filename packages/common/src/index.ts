export interface LambdaContext {
    awsRequestId: string;
    [key: string]: unknown;
}

export interface LambdaEvent {
    headers?: {
        [key: string]: string | undefined;
    };
    [key: string]: unknown;
}

export { sample } from './sample.js';
