import { describe, it, expect, vi } from 'vitest';
import { validate } from './validate.js';

describe('Middleware: validate', () => {
    it('continua la ejecución si no hay errores', () => {

        const req = {}; 
        const res = {};
        const next = vi.fn(); 

        validate(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});