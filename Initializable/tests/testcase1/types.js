"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Author_1 = __importDefault(require("./Author"));
/**
 * those types should be wrong!!
 */
const wrongConstructors = [
    new Author_1.default(1),
    new Author_1.default({ unknown: true }),
    new Author_1.default({ active: 4 }),
];
