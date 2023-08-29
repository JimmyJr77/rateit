const router = require('express').Router();
//const path = require('path');
//const { Tools, Characteristics, Reviews, ReviewCharacteristics } = require('../models');

// This is the 'get' route 
router.get('/', async (req, res) => {
    try {
 // res.sendFile(path.join(__dirname, '../res.render main handlebarsPage')); from views
 //placeholder---- change data below once views are ready
 res.render('index');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/modal', async (req, res) => {
    try {
        res.render('modal');
    } catch (err) {
        console.log("lol jk");
        console.log(err);
        res.status(500).json(err);
    }
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



module.exports = router;