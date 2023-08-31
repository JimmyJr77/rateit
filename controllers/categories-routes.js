const router = require('express').Router();
//const path = require('path');
const { Users, Categories, Tools, Characteristics, Reviews, ReviewCharacteristics } = require('../models');
const sequelize = require('../config/connection.js');
const { roundToTenth } = require('../utils/helpers.js');
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
  res.redirect('/');
});

//route to get one category
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    // const [category, metadata] = await sequelize.query(`
    //   SELECT categories.id, categories.name
    //   FROM categories
    //   JOIN tools ON categories.id = tools.category_id
    //   JOIN ;`);

    // Fetch category and associated tools with characteristics and reviews
    const tools = await Tools.findAll({
      where: {
        'category_id': categoryId
      },
      attributes: {
        exclude: ['categoryId']
      },
      include: [
        {
          model: ReviewCharacteristics,
          attributes: [
            [sequelize.fn('AVG', sequelize.col('reviewCharacteristics.rating')), 'overall_rating']
          ],
          group: 'reviewCharacteristics.tool_id',
        },
      ],
      group: 'id',
      order: [[sequelize.fn('AVG', sequelize.col('reviewCharacteristics.rating')), 'DESC']],
      raw: true
    });

    const reviews = (await Tools.findAll({
      attributes: {
        exclude: ['categoryId']
      },
      
      include: {
        model: Reviews,
        attributes: {
          exclude: ['userId', 'toolId']
        },
        include: {
          model: Users,
          attributes: {
            exclude: ['password']
          }
        }
      }
    })).map(r => r.get({ plain: true }));

    const category = await Categories.findByPk(categoryId, { raw: true });

    const characteristics = (await Categories.findByPk(categoryId, {
      include: {
        model: Characteristics,
        attributes: {
          exclude: ['categoryId', 'category_id']
        },
      },
    })).characteristics.map(char => char.get({ plain: true }));

    const reviewCharacteristics = await ReviewCharacteristics.findAll({
      where: {
        tool_id: tools.map(tool => tool.id),
      },
      attributes: [
        'characteristic_id',
        'tool_id',
        [sequelize.fn('AVG', sequelize.col('rating')), 'rating']
      ],
      group: ['characteristic_id', 'tool_id'],
      raw: true
    });

    // const reviewCharacteristics = await Tools.findAll({
    //   attributes: [],
    //   include: {
    //     model: ReviewCharacteristics,
    //     attributes: [
    //       'tool_id',
    //       // 'characteristic_id',
    //       [sequelize.fn('AVG', sequelize.col('rating')), 'avg']
    //     ],
    //     // include: {
    //     //   model: Characteristics,
    //     //   attributes: {
    //     //     exclude: ['categoryId']
    //     //   }
    //     // },
    //     required: true,
    //     order: ['reviewCharacteristics.characteristic_id', 'ASC'],
    //     group: ['reviewCharacteristics.characteristic_id','tools.id',]
    //   },
    //   raw: true,
    //   group: 'tools.id'
    // })

    tools.forEach(tool => {
      const overallRating = tool['reviewCharacteristics.overall_rating'];
      delete tool['reviewCharacteristics.overall_rating'];
      tool.overall_rating = overallRating;
      tool.reviews = reviews.find(r => r.id === tool.id).reviews.filter(r => r.text.length > 0);

      tool.characteristics = characteristics.map(char => {
        const reviewChar = reviewCharacteristics.find(rc => rc.tool_id === tool.id && rc.characteristic_id === char.id);
        if (!reviewChar) {
          return {
            id: char.id,
            name: char.name,
            rating: null
          }
        }

        return {
          id: char.id,
          name: char.name,
          rating: reviewChar.rating
        }
      });

      tool.top_reviews = tool.reviews.slice(0, 3);
      tool.top_characteristics = tool.characteristics.slice(0, 3);
    });

    if (!tools) {
      return res.status(404).json({ message: 'Category not found' });
    }
  
    // const categoryData = category.get({ plain: true });
    // res.json(tools);
    res.render('ratings', { tools, characteristics, category, loggedIn: req.session.loggedIn });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

  module.exports = router;