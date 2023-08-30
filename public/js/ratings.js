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
});