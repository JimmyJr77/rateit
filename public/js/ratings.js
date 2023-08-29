$(document).ready(function() {

    // TOOL BOX DROP DOWN TOGGLE

    function toggleDropdown(element) {
        const dropdown = element.nextElementSibling;
        if (dropdown.style.display === "none" || dropdown.classList.contains("d-none")) {
            dropdown.style.display = "block";
            dropdown.classList.remove("d-none");
        } else {
            dropdown.style.display = "none";
        }
    }

    // JAVASCRIPT TO TOGGLE THE STAR AND COUNT

    function toggleStar(starElement) {
        const commentId = starElement.getAttribute('data-id');
        let storedStarState = localStorage.getItem(commentId);
        let likesCount = starElement.previousElementSibling;

        if (!storedStarState || storedStarState === 'empty') {
            starElement.innerHTML = "&#9733;";
            likesCount.innerText = parseInt(likesCount.innerText) + 1;
            localStorage.setItem(commentId, 'filled');
        } else {
            starElement.innerHTML = "&#9734;";
            likesCount.innerText = parseInt(likesCount.innerText) - 1;
            localStorage.setItem(commentId, 'empty');
        }
    }


    // RENDER STARS FOR OVERALL RATING

    // This is assuming 'data' is the array containing the "tool" data
    data.forEach(function(tool) {
        renderStars(tool["reviewCharacteristics.overall_rating"], tool.id);
    });

    function renderStars(value, id) {
        // Your existing code...
        document.getElementById('overall-rating-stars-' + id).innerHTML = starsHTML;
    }

    //var value = 3.5; // change this value to be generated dynamically

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

});