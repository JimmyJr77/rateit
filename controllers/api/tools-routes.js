const router = require("express").Router();
//const path = require('path');
const { Tools } = require("../../models");

router.post("/api/tools", async (req, res) => {
  try {
    const toolData = await Tools.create(req.body);
    res.status(200).json(toolData);
  } catch (err) {
    res.status(500).json({ message: "Tool failed to create." });
  }
});

module.exports = router;
//added this to test
