const router = require('express').Router();
//const path = require('path');
const { Categories } = require('../models');

//route to get one category

router.get('/category/:id', async (req, res) => {
    try {
        const oneCategory = await Categories.findByPk(req.params.id, {
          include: 
            {
              model: Tools,
              attributes: [
                'name',
              ],
            },
        });
        const category = oneCategory.get({ plain: true });
        res.render('category', { category });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });

    module.exports = router;
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