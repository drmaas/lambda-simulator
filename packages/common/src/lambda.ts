import { randomUUID } from 'crypto';
import { ParsedUrlQuery } from 'querystring';
import { LambdaContext, LambdaEvent, ParsedHeaders, PathParameters } from './types.js';

export const buildLambdaContext = (): LambdaContext => {
    return {
        awsRequestId: randomUUID(),
    };
};

export const buildPathParameters = (resource: string, path: string) => {
    const resourceElements = resource.split('/');
    const pathElements = path.split('/');
    const pathParameters: PathParameters = {};
    if (resourceElements.length !== pathElements.length) {
        return pathParameters;
    }
    resourceElements.forEach((re, index) => {
        if (re.startsWith('{') && re.endsWith('}') && index < pathElements.length) {
            const name = re.replace('{', '').replace('}', '');
            // eslint-disable-next-line security/detect-object-injection
            pathParameters[name] = pathElements[index];
        }
    });
    return pathParameters;
};

export const buildLambdaEvent = (
    httpMethod: string,
    resource: string, // "/id/{organizationId}/{userId}"
    path: string, // "/id/00DW0000008xQQ9MAM/0057d000005MUNZAA4"
    queryStringParameters: ParsedUrlQuery,
    headers: ParsedHeaders,
    body: string
): LambdaEvent => {
    const pathParameters = buildPathParameters(resource, path);
    return {
        httpMethod,
        resource,
        path,
        pathParameters,
        queryStringParameters,
        headers,
        body,
    };
};
