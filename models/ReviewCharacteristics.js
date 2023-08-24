const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class ReviewCharacteristics extends Model {}

ReviewCharacteristics.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      //THIS ISN'T A FLOAT BECAUSE THE DECIMALS WILL BE DONE ON FRONT END
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "reviews",
        key: "id",
      },
    },
    characteristic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "characteristics",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "reviewCharacteristics",
  }
);

module.exports = ReviewCharacteristics;
