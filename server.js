const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // Middleware para analizar el cuerpo de las solicitudes
const cors = require('cors'); // Permite solicitudes CORS
const path = require('path'); 

const app = express(); // Inicializa la aplicación Express
const port = 3000; // Define el puerto donde correrá el servidor

// Middleware
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '220204',
    database: 'login_prueba'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log('Email recibido:', email);
    console.log('Contraseña recibida:', password);

    const query = 'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            return res.status(500).send('Error en la consulta a la base de datos');
        }
        if (results.length > 0) {
            res.status(200).send('Inicio de sesión exitoso');
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    });
});

// Levanta el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
