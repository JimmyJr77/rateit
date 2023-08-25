const router = require("express").Router();
//const path = require('path');
const { Reviews, ReviewCharacteristics } = require("../../models");

router.post("/api/reviews", async (req, res) => {
  try {
    // const { rating, text, characteristics = [] } = req.body;
    const { rating, text, characteristics } = req.body;
    const reviewData = await Reviews.create({
      rating,
      text,
      user_id: req.session.userId,
    });

    const reviewChars = characteristics.map((char) => {
      char.review_id = reviewData.id;
      return char;
    });
    const newReviewChars = await ReviewCharacteristics.bulkCreate(reviewChars);

    res.status(200).json(newReviewChars);
  } catch (err) {
    res.status(500).json({ message: "Review failed to create." });
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
