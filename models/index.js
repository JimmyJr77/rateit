const Users = require("./Users");
const Tools = require("./Tools");
const Categories = require("./Categories");
const Characteristics = require("./Characteristics");
const Reviews = require("./Reviews");
const ReviewCharacteristics = require("./ReviewCharacteristics");

Users.hasMany(Reviews, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Reviews.belongsTo(Users);
Reviews.belongsTo(Tools);

Reviews.hasMany(ReviewCharacteristics, {
  foreignKey: "review_id",
});

ReviewCharacteristics.belongsTo(Reviews);
ReviewCharacteristics.belongsTo(Characteristics);
ReviewCharacteristics.belongsTo(Tools);

Characteristics.hasMany(ReviewCharacteristics, {
  foreignKey: "characteristic_id",
});
Characteristics.belongsTo(Categories);

Categories.hasMany(Characteristics, {
  foreignKey: "category_id",
});
Categories.hasMany(Tools, {
  foreignKey: "category_id",
});

Tools.hasMany(Reviews, {
  foreignKey: "tool_id",
});

Tools.hasMany(ReviewCharacteristics, {
  foreignKey: "tool_id",
});

Tools.belongsTo(Categories);

module.exports = {
  Users,
  Tools,
  Categories,
  Characteristics,
  Reviews,
  ReviewCharacteristics,
};
