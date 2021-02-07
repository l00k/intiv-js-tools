"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Author_1 = tslib_1.__importDefault(require("./Author"));
test('unchanged initial values', () => {
    const author = new Author_1.default();
    expect(author.name).toEqual('initial');
    expect(author.active).toEqual(false);
});
test('properly changed by constructor', () => {
    const author = new Author_1.default({
        active: true,
        name: 'other'
    });
    expect(author.name).toEqual('other');
    expect(author.active).toEqual(true);
});
test('properly changed by setData()', () => {
    const author = new Author_1.default();
    author.setData({
        active: true,
        name: 'other'
    });
    expect(author.name).toEqual('other');
    expect(author.active).toEqual(true);
});
