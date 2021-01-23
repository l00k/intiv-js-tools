"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utility_1 = require("../Utility");
const ObjectManager_1 = require("../ObjectManager");
const Exception_1 = require("../Exception");
let Configuration = class Configuration {
    constructor() {
        this.data = {};
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
        if (!Utility_1.isset(() => this.data[path])) {
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
    ObjectManager_1.Singleton(),
    __metadata("design:paramtypes", [])
], Configuration);
exports.default = Configuration;
