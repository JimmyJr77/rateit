// handles login and signup for clients

function init() {
    $('.btn-rate').on('click', function(event) {
        event.stopImmediatePropagation();
        if ($(this).attr('data-target') === '#rateModal') {
            $('#rateModal').modal('show');
            $('#rate-tool-name').text($(this).attr('data-tool-name'));
            $('#rate-tool-form').attr('data-tool-id', $(this).attr('data-tool-id'));
        }

        else {
            $('#signupModal').modal('show');
        }
    });

    $('#rate-tool-form').on('submit', handleRate);
}

async function handleRate(event) {
    event.preventDefault();

    const text = $('#review-text').val();

    const tool_id = $('#rate-tool-form').attr('data-tool-id');

    const characteristics = [];

    for (const charValue of $('.char-value')) {
        if ($(charValue).val()) {
            characteristics.push({
                rating: $(charValue).val(),
                characteristic_id: $(charValue).attr('data-char-id'),
                tool_id: tool_id
            });
        }
    }

    if (characteristics.length === 0) return;

   
    
    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text, characteristics, tool_id
        }),
        
    });
    if (response.ok) {
        // const { userId } = await response.json();
        location.reload();
        return;
    }

    const { message } = await response.json();
    $('#login-form .error-message').text(message).show();
}

$(init());