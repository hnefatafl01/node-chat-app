const expect = require('expect');
const { isRealString } = require('./validations');

describe('Validations', () => {
    it('should reject non-string values', () => {
        let res = isRealString(42);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let res = isRealString('    ');
        expect(res).toBe(false);
    });

    it('should allow string with non-space values', () => {
        let res = isRealString('  Bacon  ');
        expect(res).toBe(true);
    });
});