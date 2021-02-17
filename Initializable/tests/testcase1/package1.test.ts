import ValidationResult from '../../../Validator/ValidationResult';
import Author from './Author';
import Company from './Company';


test('unchanged initial values', () => {
    const author = new Author();
    expect(author.name).toEqual('initial');
    expect(author.active).toEqual(false);
})

test('properly changed by constructor', () => {
    const author = new Author({
        active: true,
        name: 'other',
        company: {
            name: 'sample',
            active: true,
        }
    });
    expect(author.name).toEqual('other');
    expect(author.active).toEqual(true);
    expect(author.company).toBeInstanceOf(Company);
    expect(author.company.name).toEqual('sample');
    expect(author.company.active).toEqual(true);
})

test('properly changed by setData()', () => {
    const author = new Author();
    author.setData({
        active: true,
        name: 'other',
        company: {
            name: 'sample',
            active: true,
        }
    })
    expect(author.name).toEqual('other');
    expect(author.active).toEqual(true);
    expect(author.company).toBeInstanceOf(Company);
    expect(author.company.name).toEqual('sample');
    expect(author.company.active).toEqual(true);
})

