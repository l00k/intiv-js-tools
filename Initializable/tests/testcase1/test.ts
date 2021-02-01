import Author from './Author';


test('unchanged initial values', () => {
    const author = new Author();
    expect(author.name).toEqual('initial');
    expect(author.active).toEqual(false);
})

test('properly changed by constructor', () => {
    const author = new Author({
        active: true,
        name: 'other'
    });
    expect(author.name).toEqual('other');
    expect(author.active).toEqual(true);
})

test('properly changed by setData()', () => {
    const author = new Author();
    author.setData({
        active: true,
        name: 'other'
    })
    expect(author.name).toEqual('other');
    expect(author.active).toEqual(true);
})

