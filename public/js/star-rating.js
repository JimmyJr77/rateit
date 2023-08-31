const stars = document.querySelectorAll(".star-rating");
const tools = document.getElementById("tool-1");
const ratingOutput = document.getElementById("rating-output");
// FOR WHEN THIS GETS INTEGRATED WITH THE REST OF THE PROJECT FOR DISPLAYING AVERAGE 5 STAR RATING
// const avgStars = document.getElementById("");

stars.forEach((star) => {
  //CHANGE THE 3.7 IN HERE TO A VARIABLE THAT'LL BE RECEIVED FROM THE AVERAGE USER RATINGS
  //CHANGE THE 3.7 IN HERE TO A VARIABLE THAT'LL BE RECEIVED FROM THE AVERAGE USER RATINGS
  //CHANGE THE 3.7 IN HERE TO A VARIABLE THAT'LL BE RECEIVED FROM THE AVERAGE USER RATINGS

  const value = parseFloat(3.7);
  fillStars(value);
});

function fillStars(value) {
  // const stars = document.querySelectorAll(`#tool-${toolId} .star-rating`);
  // clearStars();
  for (let i = 0; i < stars.length; i) {
    const starValue = parseFloat(stars[i].getAttribute("data-average-rating"));
    if (
      starValue - Math.floor(starValue) > 0.2 &&
      starValue - Math.floor(starValue) < 0.8 &&
      Math.floor(starValue) === parseInt(value)
    ) {
      stars[i].classList.replace("bi-star", "bi-star-fill");
      stars[i + 1].classList.replace("bi-star", "bi-star-half");
      i += 2;
    } else if (
      starValue - Math.floor(starValue) <= 0.2 &&
      Math.floor(starValue) === parseInt(value)
    ) {
      stars[i].classList.replace("bi-star", "bi-star-fill");
      i++;
    } else if (
      starValue - Math.floor(starValue) >= 0.8 &&
      Math.floor(starValue) === parseInt(value)
    ) {
      stars[i].classList.replace("bi-star", "bi-star-fill");
      stars[i + 1].classList.replace("bi-star", "bi-star-half");
      i += 2;
    } else if (starValue <= value) {
      stars[i].classList.replace("bi-star", "bi-star-fill");
      i++;
    } else {
      stars[i].classList.remove("bi-star-fill", "bi-star-half");
      stars[i].classList.add("bi-star");
      i++;
    }
  }
}

function clearStars() {
  stars.forEach((star) => {
    star.classList.remove("bi-star-fill", "bi-star-half");
    star.classList.add("bi-star");
  });
}
