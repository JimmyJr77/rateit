const generateRandomUsername = require('random-username-gen');
const generatePassword = require('random-password');
const allUsers = [];

function newGenerateRandUsername(options) {
    const name = generateRandomUsername('', options).slice(1);
    if (name.endsWith('-')) return name.slice(name.length - 1);
    return name;
}

function randomUsername() {
    const options = {
        length: 13,
        separator: '-',
        wordList: 'default', // You can add and use custom word lists
        ensureUnique: true,
    };

    let newUser = newGenerateRandUsername(options);
    while (allUsers.includes(newUser)) {
        newUser = generateRandomUsername('', options).slice(1);
    }

    allUsers.push(newUser);
    return newUser;
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
