document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Realiza la solicitud POST al servidor
    fetch('http://6.128.0.1:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Credenciales incorrectas');
        }
    })
    .then(data => {
        document.getElementById('message').innerText = data;
        // Redirige a home.html si el login es exitoso
        if (data === 'Inicio de sesión exitoso') {
            window.location.href = 'home.html';
        }
    })
    .catch(error => {
        document.getElementById('message').innerText = error.message;
    });
});
