import { describe, it, expect, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import verifyToken from './verifyToken.js';

describe('verifyToken', () => {
    it('bloquea si no hay token', () => {
        const req = { headers: {} };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        
        verifyToken(req, res, vi.fn());
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('permite el acceso con token válido', () => {
        vi.spyOn(jwt, 'verify').mockReturnValue({ id: 1 });
        const req = { headers: { authorization: "Bearer token" } };
        const next = vi.fn();
        
        verifyToken(req, {}, next);
        expect(next).toHaveBeenCalled();
    });
});