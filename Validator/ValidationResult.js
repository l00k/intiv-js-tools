"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InitializerList_1 = require("../InitializerList");
class ValidationResult extends InitializerList_1.Initializable {
    constructor() {
        super(...arguments);
        this.valid = true;
        this.properties = {};
        this.subObjects = {};
        this.parameters = {};
        this.returnType = true;
    }
}
exports.default = ValidationResult;
