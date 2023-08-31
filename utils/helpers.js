module.exports = {
  roundToTenth: (num) => {
    return Math.round(num * 10) / 10;
  },

  renderStars: (value) => {
    const maxStars = 5;
    let fullStars = Math.floor(value);
    let decimalPart = value - fullStars;

    let extraStar = 0; // This will be either 0 or 1
    let halfStar = 0; // This will be either 0 or 1

    if (decimalPart <= 0.3) {
      extraStar = 0;
    } else if (decimalPart <= 0.7) {
      halfStar = 1;
    } else {
      extraStar = 1;
    }

    let totalStars = fullStars + extraStar; // Full star count
    let emptyStars = maxStars - totalStars - halfStar; // Empty star count

    let starsHTML = "";

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += `<span class="bi bi-star-fill yellow"></span>`;
    }

    // Render extra full-star if applicable
    for (let i = 0; i < extraStar; i++) {
      starsHTML += `<span class="bi bi-star-fill yellow"></span>`;
    }

    // Render half-star if applicable
    for (let i = 0; i < halfStar; i++) {
      starsHTML += `<span class="bi bi-star-half yellow"></span>`;
    }

    // Render empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += `<span class="bi bi-star yellow"></span>`;
    }

    return `<span id="overall-rating-stars" class="star-rating">${starsHTML}</span>`;
  },
};
