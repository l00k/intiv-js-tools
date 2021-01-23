"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PropertyDescriptor {
    constructor(options = {}) {
        this.type = undefined;
        this.arrayOf = undefined;
        this.preserveRaw = false;
        this.isNullable = true;
        this.type = options.type ? options.type : this.type;
        this.isNullable = options.isNullable ? !!options.isNullable : this.isNullable;
        this.arrayOf = options.arrayOf ? options.arrayOf : this.arrayOf;
    }
    get isPrimitive() {
        return [Boolean, null, undefined, Number, String, Symbol].indexOf(this.type) !== -1;
    }
    get isArray() {
        return this.arrayOf !== undefined;
    }
    get isDate() {
        return this.type === Date;
    }
}
exports.default = PropertyDescriptor;
