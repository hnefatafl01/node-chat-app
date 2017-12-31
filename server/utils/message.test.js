const expect = require('expect');
var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should construct a new message', () => {
        let from = 'rufus@dog.com';
        let text = 'I need to wrestle!woof!';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    });
});