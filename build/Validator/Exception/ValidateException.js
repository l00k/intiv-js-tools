"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("../../Exception");
class ValidateException extends Exception_1.Exception {
    constructor(message, code, details) {
        super(message, code);
        this.name = 'ValidateException';
        this.metadata = {
            responseCode: 422 // unprocessable entity
        };
        this.details = {};
        this.details = details || this.details;
    }
}
exports.default = ValidateException;
