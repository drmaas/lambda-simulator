export type LambdaContext = {
    awsRequestId: string;
    [key: string]: unknown;
};

export type LambdaEvent = {
    headers?: {
        [key: string]: string | string[] | undefined;
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

export type Lambda = { name: string; handler: LambdaHandler };

export type LambdaHandler = (event: LambdaEvent, context: LambdaContext) => Promise<LambdaOutput>;

export type ParsedHeaders = { [key: string]: string | string[] | undefined };

export type PathParameters = { [key: string]: string };
