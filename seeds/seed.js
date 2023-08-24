const fs = require('fs');
const path = require('path');

const sequelize = require('../config/connection.js');
const { Users, Categories, Tools, Characteristics, Reviews, ReviewCharacteristics } = require('../models');

// get data from given file and seed a given model with the data
async function seedData(path, model, fn) {
    return new Promise(async (resolve, reject) => {
        let seedData = await fs.promises.readFile(path.join(__dirname, '/', path), 'utf-8');
        seedData = JSON.parse(seedData);
        if (fn) seedData = seedData.map(data => fn(seed));
        const users = await model.bulkCreate(seedData, { returning: true, individualHooks: true });

        resolve(seedData);
    });
}

// random integer from 1 to max (inclusive)
function randInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

sequelize.sync({ force: true });

const users = await seedData('users.json', Users);
const categories = await seedData('categories.json', Categories);
const tools = await seedData('tools.json', Tools);
const characteristics = await seedData('characteristics', Characteristics);

// seed reviews with random user_id and tool_id
const reviews = await seedData('reviews.json', Reviews, (review) => {
    review.user_id = randInt(users.length);
    review.tool_id = randInt(tools.length);
    return review;
});

// create random review characteristics
const reviewCharacteristics = [];
for (const review of reviews) {
    reviewCharacteristics.push({
        rating: randInt(5),
        review_id: randInt(reviews.length),
        characteristic_id: randInt(characteristics.length)
    });
}
await ReviewCharacteristics.bulkCreate(reviewCharacteristics, { returning: true, individualHooks: true });