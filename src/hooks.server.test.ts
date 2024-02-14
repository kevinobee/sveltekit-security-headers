import { describe, it, expect } from 'vitest';
import { handle } from './hooks.server.js';

describe('Server Hooks', () => {
	describe('handle function', () => {
		it('is defined', () => {
			expect(handle).toBeDefined();
		});
	});
});
