const router = require('express').Router();
//const path = require('path');
const { Tools, Reviews, Characteristics, ReviewCharacteristics } = require('../models');

  // route to get one tool

  router.get('/Tools/:id', async (req, res) => {
    try {
        const oneTool = await Tools.findByPk(req.params.id, {
          include: [
            {
              model: Reviews,
              attributes: [
                'name',
                'text',
              ],
            },
            {
                model: Characteristics,
              attributes: [
                'name',
              ],
            },
            {
                model: ReviewCharacteristics,
                attributes: [
                  'rating',
                  ],
            },
        ],
        });
        const tool = oneTool.get({ plain: true });
        res.render('tool', { tool });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });

    module.exports = router;
    
  // route to get one tool
//   router.get('/tools/:id', async (req, res) => {
//     try {
//  //placeholder----
//     const oneTool = await Tools.findByPk(req.params.id);
//     if(!oneTool) {
//         res.status(404).json({message: 'No Tool with this name available!'});
//         return;
//     }
//     const tool = oneTool.get({ plain: true });
//     res.render('tool', tool);
//   } catch (err) {
//       res.status(500).json(err);
//   };  
// });