"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Storage {
    constructor() {
        this.instances = {};
        this.servicesByTag = {};
        this.injections = new Map();
    }
}
exports.default = Storage;
