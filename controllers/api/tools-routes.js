const router = require("express").Router();
const { Tools } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const { name, category_id } = req.body;
    const toolData = await Tools.create({ name, category_id });
    res.status(200).json(toolData);
  } catch (err) {
    res.status(500).json({ message: "Tool failed to create." });
  }
});

module.exports = router;