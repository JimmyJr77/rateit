const router = require('express').Router();
//const path = require('path');
const { Categories, Tools, Characteristics, Reviews, ReviewCharacteristics } = require('../models');

//route to get one category
router.get('/category/:id', async (req, res) => {
  try {
          const categoryId = req.params.id;
// Fetch category and associated tools with characteristics and reviews
          const category = await Categories.findByPk(categoryId, {
              include: [
                  {
                      model: Tools,
                      attributes: ['id', 'name'],
                      include: [ //include joins the tables together, nested
                          {
                            model: ReviewCharacteristics,
                            attributes: [
                              [sequelize.fn('AVG', sequelize.col('rating')), 'overallCharacteristics_rating'], // Calculate average rating
                            ]
                            //   model: Reviews,
                            //   attributes: [
                            //     [sequelize.fn('AVG', sequelize.col('rating')), 'overall_rating'], // Calculate average rating
                            // ],
                              // include: [
                              //     {
                              //         model: ReviewCharacteristics,
                              //         attributes: ['rating'],
                              //     },
                              // ],
                          },
                      ],
                      group: ['tools.id'], // Group by tool id to calculate average per tool
                    },
                      {
                        model: Characteristics,
                        attributes: ['name'],
                        include: [
                          {
                              model: ReviewCharacteristics,
                              attributes: [
                                  [sequelize.fn('AVG', sequelize.col('rating')), 'averageCharaceristics_rating'],
                              ],
                    },
                ],
                group: ['Characteristics.id'], // Group by Characteristics id to calculate average per characteristic
              },
            ],
            });
            if (!category) {
              return res.status(404).json({ message: 'Category not found' });
          }
  
          const categoryData = category.get({ plain: true });
          res.render('category', { category: categoryData });
      } catch (err) {
          console.error(err);
          res.status(500).json(err);
      }
  });

  module.exports = router;

each category- Tools
each tool- multiple Reviews (ratings)
// router.get('/category/:id', async (req, res) => {
//     try {
//         const oneCategory = await Categories.findByPk(req.params.id, {
//           include: 
//             {
//               model: Tools,
//               attributes: [
//                 'name',
//               ],
//             },
//         });
//         const category = oneCategory.get({ plain: true });
//         res.render('category', { category });
//       } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//       }
//     });

//     module.exports = router;
//     try {

//  //placeholder----
//     const oneCategory = await Categories.findByPk(req.params.id);
//     if(!oneCategory) {
//         res.status(404).json({message: 'No Category with this name available!'});
//         return;
//     }

//     const category = oneCategory.get({ plain: true });
    
//     //view/handlebar name, data that needs to be passed through
//     res.render('category', category);
//   } catch (err) {
//       res.status(500).json(err);
//   };     
// });