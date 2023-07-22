export type LambdaContext = {
    awsRequestId: string;
    [key: string]: unknown;
};

export type LambdaEvent = {
    headers?: {
        [key: string]: string | undefined;
    };
    [key: string]: unknown;
};

export type LambdaOutput = {
    isBase64Encoded?: boolean;
    statusCode: number;
    headers?: { [key: string]: unknown };
    multiValueHeaders?: { [key: string]: unknown };
    body?: unknown;
};
