// SLIDER FUNCTIONALITY

$( function() {
    $( "#slider-range-max" ).slider({
    range: "max",
    min: 0,
    max: 10,
    value: 4,
    slide: function( event, ui ) {
        $( "#characteristic1" ).val( ui.value );
    }
});
    $( "#characteristic1" ).val( $( "#slider-range-max" ).slider( "value" ) );
});

$(function() {
    var $slider = $("#slider-range-max");
    var $checkbox = $("#customCheck1");
    var $charInput = $("#characteristic1");

    $slider.slider({
        range: "max",
        min: 0,
        max: 10,
        value: 0, // Set initial value to 0
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
            $slider.slider("value", 0); // Sets the slider value to 0 when checked
            $charInput.val(0); // Updates the text input value
        } else {
            $slider.addClass('slider-disabled').slider("disable");
            $charInput.val(""); // Empties the text input value
        }
    });
});