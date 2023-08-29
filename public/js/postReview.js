// handles login and signup for clients

function init() {
    $('.error-message').hide();

    $('#login-form').on('submit', handleLogin);
    $('#signup-form').on('submit', handleSignup);
}

async function handleLogin(event) {
    event.preventDefault();

    const username = $('#login-username-input').val();
    const password = $('#login-password-input').val();

    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: username,
            password: password
        }),
        
    });
    if (response.ok) {
        // const { userId } = await response.json();
        location.assign('/');
        return;
    }

    const { message } = await response.json();
    $('#login-form .error-message').text(message).show();
}