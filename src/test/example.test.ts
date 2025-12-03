import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useState } from 'react';

describe('Example Hook Test', () => {
	it('should update state', () => {
		const { result } = renderHook(() => useState(0));
		const [count, setCount] = result.current;

		expect(count).toBe(0);

		act(() => {
			setCount(1);
		});

		expect(result.current[0]).toBe(1);
	});
});
