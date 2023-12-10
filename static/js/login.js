async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    });
    if (!response.ok) {
        // Handle HTTP errors
        const text = await response.text();
        console.error(`HTTP Error: ${response.status}\n${text}`);
        return;
    }

    const data = await response.json();

    if (data.status === 'success') {
        alert('Logged in successfully');
        // Directly set the username in local storage upon successful login
        localStorage.setItem('username', username);
        // You can also navigate the user to another page or update the UI
        // Redirect the user to the store page
        window.location.href = "/instructions";
    } else {
        alert(data.message);
        const formToReset = document.getElementById('loginForm');
        formToReset.reset();
    }
}


async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    });

    const data = await response.json();

    if (data.status === 'success') {
        alert('Registered successfully');
        const formToReset = document.getElementById('loginForm');
        formToReset.reset();
        // You can also navigate the user to another page or update the UI

    } else {
        alert(data.message);
        const formToReset = document.getElementById('loginForm');
        formToReset.reset();
    }
}