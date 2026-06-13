import { isSafe } from "./password";
import { describe, it , expect } from "vitest";

describe("isSafe", () => {
    it ("devuelve true si la contraseña tiene 6 caracteres o más", () => {
        const password = "123456";

        const resultado = isSafe(password);

        expect(resultado).toBe(true);
    });
    it("devuelve false si tiene 5 caracteres" , () =>{
        const password = "12345";

        const resultado = isSafe(password);

        expect(resultado).toBe(false)
    });
})