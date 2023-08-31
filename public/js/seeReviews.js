$( document ).ready(function() {
    $(".top-reviews-container").show();
    $('.reviews-container').hide();
    $('.seeAllReviewsBtn').text("See all Reviews");
    
    $('.seeAllReviewsBtn').on('click', function(event) {
        const toolId = $(this).attr('data-tool-id');
        // getting the value
        if( $(`.seeAllReviewsBtn[data-tool-id=${toolId}]`).text() === "See all Reviews"){
            // setting the value
            $(`.seeAllReviewsBtn[data-tool-id=${toolId}]`).text("Close Reviews");
        }
        else {
        // setting the value
            $(`.seeAllReviewsBtn[data-tool-id=${toolId}]`).text("See all Reviews");
        }
            
        $(`.reviews-container[data-tool-id=${toolId}]`).toggle();
        $(`.top-reviews-container[data-tool-id=${toolId}]`).toggle();
    });
});