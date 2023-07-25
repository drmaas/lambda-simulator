import * as crypto from 'crypto';
import { buildLambdaContext, buildLambdaEvent, buildPathParameters } from '../lambda';

beforeEach(() => {
    jest.clearAllMocks(); // Clear mock states
    jest.restoreAllMocks(); // Restore spy
});

jest.mock('crypto');

describe('build path parameters', () => {
    it('with valid tokens', () => {
        const expected = {
            organizationId: '00DW0000008xQQ9MAM',
            userId: '0057d000005MUNZAA4',
        };
        const result = buildPathParameters(
            '/id/{organizationId}/{userId}',
            '/id/00DW0000008xQQ9MAM/0057d000005MUNZAA4'
        );
        expect(result).toEqual(expected);
    });
});

describe('build lambda context', () => {
    it('with valid parameters', () => {
        const id = '5513c870-5a0c-11ec-934c-ff0bd4eec100';
        jest.spyOn(crypto, 'randomUUID').mockImplementation(() => id);
        const expected = {
            awsRequestId: id,
        };
        const result = buildLambdaContext();
        expect(result).toEqual(expected);
    });
});

describe('build lambda event', () => {
    it('with valid parameters', () => {
        const resource = '/id/{organizationId}/{userId}';
        const path = '/id/00DW0000008xQQ9MAM/0057d000005MUNZAA4';
        const pathParameters = {
            organizationId: '00DW0000008xQQ9MAM',
            userId: '0057d000005MUNZAA4',
        };
        const httpMethod = 'POST';
        const headers = { 'Content-Type': 'application/json' };
        const queryStringParameters = { x: '1', y: '2', z: '3' };
        const body = JSON.stringify({ test: 'value' });
        const expected = {
            httpMethod,
            resource,
            path,
            pathParameters,
            queryStringParameters,
            headers,
            body,
        };
        const result = buildLambdaEvent(httpMethod, resource, path, queryStringParameters, headers, body);
        expect(result).toEqual(expected);
    });
});
