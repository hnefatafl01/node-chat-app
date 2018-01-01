const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 123,
            name: 'Stewart',
            room: 'Blond Club'
        },{
            id: 456,
            name: 'Denali',
            room: 'Blond Club'
        },{
            id: 789,
            name: 'Bridger',
            room: 'Blond Club'
        },{
            id: 101112,
            name: 'Rufus',
            room: 'Black Club'
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: 131415,
            name: 'Jill',
            room: 'Blonde Club'
        }
        let resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let removedUser = users.removeUser(456);
        expect(removedUser.id).toEqual(456);
        expect(users.users.length).toBe(3);
    });

    it('should not remove a user', () => {
        let removedUser = users.removeUser(99);
        expect(removedUser).toNotExist();
        expect(users.users.length).toBe(4);
    });

    it('should get a user', () => {
        var userId = 101112;
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not get a user', () => {
        var userId = 100;
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });

    it('should return users in Blond Club room', () => {
        let userList = users.getUserList('Blond Club');
        expect(userList).toEqual(['Stewart', 'Denali', 'Bridger']);
    });

    it('should return users in Black Club room', () => {
        let userList = users.getUserList('Black Club');
        expect(userList).toEqual(['Rufus']);
    });
});