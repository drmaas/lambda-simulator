import { LambdaContext, LambdaEvent } from './types.js';

export const buildLambdaContext = (): LambdaContext => {
    return {
        awsRequestId: '',
    };
};

export const buildLambdaEvent = (): LambdaEvent => {
    return {};
};
