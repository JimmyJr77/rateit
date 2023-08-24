const router = require('express').Router();
//const path = require('path');
const { Users, Categories, Tools, Characteristics, Reviews, ReviewCharacteristics } = require('../models');

// This is the 'get' route 
router.get('/', async (req, res) => {
    try {

 // res.sendFile(path.join(__dirname, '../res.render main handlebarsPage')); from views
 //placeholder---- change data below once views are ready
 res.render('main', { dataFromMainHandlebar });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//route to get one category
router.get('/category/:id', async (req, res) => {
    try {


 //placeholder----
    const oneCategory = await Categories.findByPk(req.params.id);
    if(!oneCategory) {
        res.status(404).json({message: 'No Category with this name available!'});
        return;
    }
    const category = oneCategory.get({ plain: true });
    //view/handlebar name, data that needs to be passed through
    res.render('category', category);
  } catch (err) {
      res.status(500).json(err);
  };     
});

// route to get all tools
// router.get('/categories/tools', async (req, res) => {
//     const toolset = await Tools.findAll().catch((err) => { 
//         res.json(err);
//       });
//       // We use map() to iterate over toolset and then add .get({ plain: true }) each object to serialize it. 
//       const tools = toolset.map((tool) => tool.get({ plain: true }));
//       // We render the template, 'all', passing in tools, a new array of serialized objects.
//       res.render('all', { tools });
//       });


  // route to get one tool
router.get('/tools/:id', async (req, res) => {
    try {
 //placeholder----
    const oneTool = await Tools.findByPk(req.params.id);
    if(!oneTool) {
        res.status(404).json({message: 'No Tool with this name available!'});
        return;
    }
    const tool = oneTool.get({ plain: true });
    res.render('tool', tool);
  } catch (err) {
      res.status(500).json(err);
  };     
});



module.exports = router;