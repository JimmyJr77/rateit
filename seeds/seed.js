const fs = require('fs');
const path = require('path');

const sequelize = require('../config/connection.js');
const { Users, Categories, Tools, Characteristics, Reviews, ReviewCharacteristics } = require('../models');
const randomUsers = require('./randomUsers.js');

// get data from given file and seed a given model with the data
async function seedData(filePath, model, fn) {
    return new Promise(async (resolve, reject) => {
        let seedData = await fs.promises.readFile(path.join(__dirname, '/', filePath), 'utf-8');
        seedData = JSON.parse(seedData);
        if (fn) seedData = seedData.map(fn);
        await model.bulkCreate(seedData, { returning: true, individualHooks: true });

        resolve(seedData);
    });
}

// random integer from 1 to max (inclusive)
function randInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

async function seedUsers(amount=1) {
    const users = randomUsers(amount);
    await Users.bulkCreate(randomUsers(amount), { returning: true, individualHooks: true });
    return users;
}

async function init() {
    await sequelize.sync({ force: true });

    const users = await seedUsers(50);
    // const users = await seedData('users.json', Users);
    const categories = await seedData('categories.json', Categories);
    const tools = await seedData('tools.json', Tools);
    const characteristics = await seedData('characteristics.json', Characteristics);
    
    // seed reviews with random user_id and tool_id
    const reviews = await seedData('reviews.json', Reviews, (review) => {
        review.user_id = randInt(users.length);
        review.tool_id = randInt(tools.length);
        return review;
    });
    
    // create random review characteristics
    const reviewCharacteristics = [];
    for (let r_id = 1; r_id <= reviews.length; r_id++) {
        for (let c_id = 1; c_id <= characteristics.length; c_id++) {
            // random chance to review a characteristic
            if (randInt(2) < 2) continue;

            reviewCharacteristics.push({
                rating: randInt(5),
                review_id: r_id,
                characteristic_id: c_id,
                tool_id: reviews[r_id - 1]["tool_id"]
            });
        }
    }
    await ReviewCharacteristics.bulkCreate(reviewCharacteristics, { returning: true, individualHooks: true });

    sequelize.close();
}

init();