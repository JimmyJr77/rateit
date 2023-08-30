const generateRandomUsername = require('random-username-gen');
const generatePassword = require('random-password');
const allUsers = [];

function randomUsername() {
    const options = {
        length: 13,
        separator: '-',
        wordList: 'default', // You can add and use custom word lists
        ensureUnique: true,
    };

    let newUser = generateRandomUsername('', options).slice(1);
    while (allUsers.includes(newUser)) {
        newUser = generateRandomUsername('', options).slice(1);
    }

    allUsers.push(newUser);
    
    return generateRandomUsername('', options).slice(1);
}

function randomPassword() {
    const length = Math.floor(Math.random() * 10) + 8;
    return generatePassword(length);
}

function randomUser(amount=1) {
    return new Array(amount).fill(0).map((i) => { 
        return {
            name: randomUsername(),
            password: randomPassword()
        }
    });
}

module.exports = randomUser;
