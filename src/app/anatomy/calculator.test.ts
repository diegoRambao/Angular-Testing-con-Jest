import { Calculator } from "./calculator"

describe("Calculator", () => {

    let calculator: Calculator;

    beforeEach(() => {
        calculator = new Calculator();
    })

    test("El metodo sumar deberia retornar la suma de los dos numeros", () => {

        const resultado = calculator.sumar(3, 2);

        expect(resultado).toBe(5);
    })

    test("El metodo restar deberia retornar la resta de los dos numeros", () => {

        const resultado = calculator.restar(3, 2);

        expect(resultado).toBe(1);
    })
})