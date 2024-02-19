import { describe, it, expect } from 'vitest';
import { handle } from './hooks.server.js';

describe('Server Hooks', () => {
	describe('handle function', () => {
		it('is defined', () => {
			expect(handle).toBeDefined();
			expect(handle).toBeTypeOf('function');
		});

		it('defers to SecurityHeaders', () => {
			// quick & lazy test approach
			expect(handle.toString()).toContain('return SecurityHeaders(event, resolve, config');
		});
	});
});
