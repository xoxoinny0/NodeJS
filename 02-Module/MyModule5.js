const MyModule4 = require("./MyModule4");

/** 싱글톤 클래스에 대한 모듈화 */
class Calc {
    static #currnet = null;

    static getInstance() {
        if (Calc.#currnet === null) {
            Calc.#currnet = new Calc();
        }

        return Calc.#currnet;
    }

    plus(x, y) {
        return x+y;
    }

    minus(x, y) {
        return x-y;
    }

    times(x, y) {
        return x*y;
    }

    div(x, y) {
        return x/y;
    }
}

module.exports = Calc.getInstance();