"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("../Exception");
const ObjectManager_1 = require("../ObjectManager");
let Configuration = class Configuration {
    constructor() {
        this.data = {};
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
Configuration = __decorate([
    ObjectManager_1.Singleton()
], Configuration);
exports.default = Configuration;
