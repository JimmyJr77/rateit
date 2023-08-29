const router = require('express').Router();
//const path = require('path');
const { Users, Categories, Tools, Characteristics, Reviews, ReviewCharacteristics } = require('../models');
const sequelize = require('../config/connection.JS');

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
            [sequelize.fn('AVG', sequelize.col('reviewCharacteristics.rating')), 'rating_avg']
          ],
          group: 'reviewCharacteristics.tool_id',
        },
      ],
      group: 'id',
      raw: true          
    });

    const reviews = await Tools.findAll({
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
    })

    if (!tools) {
      return res.status(404).json({ message: 'Category not found' });
    }
  
    // const categoryData = category.get({ plain: true });
    res.json(reviews);
    // res.render('category', { category: categoryData });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

  module.exports = router;