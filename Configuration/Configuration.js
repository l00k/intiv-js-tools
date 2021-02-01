"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Exception_1 = require("../Exception");
const ObjectManager_1 = require("../ObjectManager");
let Configuration = class Configuration {
    constructor() {
        this.data = {};
    }
    load(data) {
        this.createFlatData('', data);
    }
    createFlatData(path, tree) {
        for (let idx in tree) {
            let nodePath = path + (path ? '.' : '') + idx;
            this.data[nodePath] = tree[idx];
            if (typeof tree[idx] == 'object') {
                this.createFlatData(nodePath, tree[idx]);
            }
        }
    }
    get(path, defaultValue) {
        if (!this.data[path]) {
            if (typeof defaultValue == 'undefined') {
                throw new Exception_1.Exception(`Configuration [${path}] not found and default value not defined.`, 1572874195282);
            }
            else {
                return defaultValue;
            }
        }
        return this.data[path];
    }
};
Configuration = tslib_1.__decorate([
    ObjectManager_1.Singleton()
], Configuration);
exports.default = Configuration;
