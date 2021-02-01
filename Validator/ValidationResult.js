"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Initializable_1 = require("../Initializable");
class ValidationResult {
    constructor() {
        this.valid = true;
        this.properties = {};
        this.subObjects = {};
        this.parameters = {};
        this.returnType = true;
    }
}
class default_1 extends Initializable_1.Initializable(ValidationResult) {
}
exports.default = default_1;
;
