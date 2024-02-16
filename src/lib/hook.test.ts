/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, beforeEach } from 'vitest';
import type { RequestEvent } from '@sveltejs/kit';
import { mockDeep, type DeepMockProxy } from 'vitest-mock-extended';
import { handleHttpResponseHeaders } from './hook.js';

describe('handleHttpResponseHeaders', () => {
	let mockEvent: DeepMockProxy<RequestEvent>;
	let mockResponse: DeepMockProxy<Response>;

	beforeEach(() => {
		mockEvent = mockDeep<RequestEvent>();
		mockResponse = mockDeep<Response>();
	});

	it('should apply security headers to response', async () => {
		const event = mockEvent;
		const resolve = () => mockResponse;

		await handleHttpResponseHeaders({ event, resolve });

		expect(mockResponse.headers.set).toHaveBeenCalledWith('X-Frame-Options', 'DENY');
		expect(mockResponse.headers.set).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
		expect(mockResponse.headers.set).toHaveBeenCalledWith(
			'Referrer-Policy',
			'strict-origin-when-cross-origin'
		);
		expect(mockResponse.headers.set).toHaveBeenCalledWith(
			'Permissions-Policy',
			'geolocation=(), camera=(), microphone=()'
		);
	});
});
