const router = require("express").Router();
const { Reviews, ReviewCharacteristics } = require("../../models");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const { text, characteristics, tool_id } = req.body;

   
    if (!req.session.userId) {
      res.status(401).json({ message: "User not logged in!" });
      return;
    }

    const reviewData = await Reviews.create({
      text,
      tool_id,
      user_id: req.session.userId,
    });

    const reviewChars = characteristics.map((char) => {
      char.review_id = reviewData.id;
      return char;
    });
    const newReviewChars = await ReviewCharacteristics.bulkCreate(reviewChars);

    console.log(newReviewChars)
    res.status(200).json(newReviewChars);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//THIS IS THE ROUTE FOR DELETING A REVIEW. NICE TO HAVE FEATURE, NOT PRIORITY
//THIS IS THE ROUTE FOR DELETING A REVIEW. NICE TO HAVE FEATURE, NOT PRIORITY
//THIS IS THE ROUTE FOR DELETING A REVIEW. NICE TO HAVE FEATURE, NOT PRIORITY
router.delete("/:id", async (req, res) => {
  try {
    const reviewData = await Reviews.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
