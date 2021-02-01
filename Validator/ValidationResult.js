"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InitializerList_1 = require("../InitializerList");
class ValidationResult {
    constructor() {
        this.valid = true;
        this.properties = {};
        this.subObjects = {};
        this.parameters = {};
        this.returnType = true;
    }
}
exports.default = InitializerList_1.Initializable(ValidationResult);
