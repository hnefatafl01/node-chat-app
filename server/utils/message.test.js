const expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should construct a new message', () => {
        let from = 'rufus@dog.com';
        let text = 'I need to wrestle!woof!';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    });
});

describe('generateLocationMessage', () => {
    it('should generate coorect location object', () => {
        let url = 'https://google.com/maps?q=12,100';
        let lat = 12;
        let long = 100;
        let from = 'test';
        let message = generateLocationMessage( from, lat, long);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, url });
    });
});