"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Initializable_1 = require("../../../Initializable");
const Company_1 = tslib_1.__importDefault(require("./Company"));
let Author = class Author extends Initializable_1.Initializable {
    constructor() {
        super(...arguments);
        this.name = 'initial';
        this.active = false;
    }
};
tslib_1.__decorate([
    Initializable_1.Property(),
    tslib_1.__metadata("design:type", Company_1.default)
], Author.prototype, "company", void 0);
Author = tslib_1.__decorate([
    Initializable_1.Initialize()
], Author);
exports.default = Author;
