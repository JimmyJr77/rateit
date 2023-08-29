var value = 3.5; // change this value to be generated dynamically

function renderStars(value) {
  const maxStars = 5;
  let fullStars = Math.floor(value);
  let decimalPart = value - fullStars;
  
  let extraStar = 0;  // This will be either 0 or 1
  let halfStar = 0;  // This will be either 0 or 1
  
  if (decimalPart >= 0 && decimalPart <= 0.3) {
      extraStar = 0;
  } else if (decimalPart >= 0.4 && decimalPart <= 0.6) {
      halfStar = 1;
  } else if (decimalPart >= 0.7 && decimalPart <= 0.9) {
      extraStar = 1;
  } 
  
  let totalStars = fullStars + extraStar;  // Full star count
  let emptyStars = maxStars - totalStars - halfStar; // Empty star count
  
  let starsHTML = "";

  // Render full stars
  for(let i = 0; i < fullStars; i++) {
      starsHTML += `<span class="bi bi-star-fill yellow"></span>`;
  }

  // Render extra full-star if applicable
  for(let i = 0; i < extraStar; i++) {
      starsHTML += `<span class="bi bi-star-fill yellow"></span>`;
  }

  // Render half-star if applicable
  for(let i = 0; i < halfStar; i++) {
      starsHTML += `<span class="bi bi-star-half yellow"></span>`;
  }

  // Render empty stars
  for(let i = 0; i < emptyStars; i++) {
      starsHTML += `<span class="bi bi-star yellow"></span>`;
  }

  document.getElementById('overall-rating-stars').innerHTML = starsHTML;
}

// Call function to render stars
renderStars(value);


// Call function to render stars
renderStars(value);




// const stars = document.querySelectorAll(".star");
// const ratingOutput = document.getElementById("rating-output");
// // FOR WHEN THIS GETS INTEGRATED WITH THE REST OF THE PROJECT FOR DISPLAYING AVERAGE 5 STAR RATING
// // const avgStars = document.getElementById("");

// stars.forEach((star) => {
//   star.addEventListener("click", (e) => {
//     const value = parseFloat(e.target.getAttribute("value"));
//     console.log("value is " + value);
//     fillStars(value);
//   });

//   //this function just lists the rating
//   star.addEventListener("click", (e) => {
//     const targetValue = parseFloat(e.target.getAttribute("value"));
//     if (targetValue === 1) {
//       ratingOutput.innerHTML = `You rated this ${targetValue} star.`;
//     } else if (targetValue > 1) {
//       ratingOutput.innerHTML = `You rated this ${targetValue} stars.`;
//     }
//   });
// });

// function fillStars(value) {
//   clearStars();
//   for (let i = 0; i < stars.length; i) {
//     const starValue = parseFloat(stars[i].getAttribute("value"));
//     if (
//       starValue - Math.floor(starValue) > 0.2 &&
//       starValue - Math.floor(starValue) < 0.8 &&
//       Math.floor(starValue) === parseInt(value)
//     ) {
//       stars[i].classList.add("full");
//       stars[i + 1].classList.add("half");
//       console.log("added half");
//       i += 2;
//     } else if (
//       starValue - Math.floor(starValue) <= 0.2 &&
//       Math.floor(starValue) === parseInt(value)
//     ) {
//       stars[i].classList.add("full");
//       i++;
//     } else if (
//       starValue - Math.floor(starValue) >= 0.8 &&
//       Math.floor(starValue) === parseInt(value)
//     ) {
//       stars[i].classList.add("full");
//       stars[i + 1].classList.add("full");
//       i += 2;
//     } else if (starValue <= value) {
//       stars[i].classList.add("full");
//       console.log("added full");
//       i++;
//     } else {
//       stars[i].classList.remove("full", "half");
//       console.log("removed both");
//       i++;
//     }
//   }
// }

// function clearStars() {
//   console.log("clear stars function hit");
//   stars.forEach((star) => {
//     star.classList.remove("full", "half");
//   });
// }
