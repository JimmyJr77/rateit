let userId;

function init() {
    $('.error-message').hide();

    $('#login-form').on('submit', handleLogin);
    $('#signup-form').on('submit', handleSignup);
}

async function handleLogin(event) {
    event.preventDefault();

    const username = $('#login-username-input').val();
    const password = $('#login-password-input').val();

    const response = await fetch('/api/users/login', {
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
        const { userId } = await response.json();
        location.reload();
        // location.assign('/');
        return;
    }

    const { message } = await response.json();
    $('#login-form .error-message').text(message).show();
}

async function handleSignup(event) {
    event.preventDefault();

    const username = $('#signup-username-input').val();
    const password = $('#signup-password-input').val();
    const confirmPassword = $('#confirm-password-input').val();

    $('#signup-form .error-message').hide();

    if (password !== confirmPassword) {
        $('#signup-form .error-message').text('Password fields must match.').show();
        return;
    }

    const response = await fetch('/api/users/signup', {
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
        const { userId } = await response.json();
        location.reload();
        // location.assign('/');
        return;
    }

    const { message } = await response.json();
    $('#signup-form .error-message').text(message).show();
}

$(init());