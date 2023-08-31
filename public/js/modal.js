// SLIDER FUNCTIONALITY

// $( function() {
//     $( ".char-slider" ).slider({
//     range: "max",
//     min: 0,
//     max: 10,
//     value: 4,
//     slide: function( event, ui ) {
//         const charId = $(event.target).attr('data-char-id');
//         $(`#characteristic-${charId}`).val( ui.value );
//     }
// });
//     $( "#characteristic1" ).val( $( ".char-slider" ).slider( "value" ) );
// });


function initSlider(id) {
    var $slider = $("#char-slider-" + id);
    var $checkbox = $("#customCheck" + id);
    var $charInput = $("#characteristic-" + id);

    $slider.slider({
        range: "max",
        min: 1,
        max: 5,
        value: 1, // Set initial value to 0
        slide: function(event, ui) {
            $charInput.val(ui.value);
        }
    });

    // Gray out and disable the slider by default
    $slider.addClass('slider-disabled').slider("disable");
    $charInput.val(""); // Sets the text input to an empty string

    // Add checkbox event listener
    $checkbox.on("change", function() {
        if ($checkbox.prop("checked")) {
            $slider.removeClass('slider-disabled').slider("enable");
            $slider.slider("value", 1); // Sets the slider value to 0 when checked
            $charInput.val(1); // Updates the text input value
        } else {
            $slider.addClass('slider-disabled').slider("disable");
            $slider.slider("value", 1);
            $charInput.val(""); // Empties the text input value
        }
    });
}

function init() {
    for (const rateCharContainer of $('.rate-chars').children()) {
        initSlider($(rateCharContainer).attr('data-char-id'));
    }
}

$(init());