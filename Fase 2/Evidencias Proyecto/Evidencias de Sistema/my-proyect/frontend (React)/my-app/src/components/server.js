const express = require('express');
const sql = require('mssql'); // Asegúrate de que tienes este paquete instalado
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // Cambia esto al puerto que prefieras

app.use(bodyParser.json()); // Permite manejar JSON en el cuerpo de las solicitudes

// Configuración de la conexión a la base de datos (dbConfig)
const dbConfig = {
    server: 'localhost',
    database: 'Prueba',
    options: {
        encrypt: true,
        trustServerCertificate: true,
        trustedConnection: true,
    },
};

// Ruta para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        // Validar si el email ya está registrado
        await sql.connect(dbConfig);
        const existingUser = await sql.query`
            SELECT * FROM Usuario WHERE email_user = ${email};
        `;

        if (existingUser.recordset.length > 0) {
            return res.status(400).send({ error: 'El correo electrónico ya está registrado.' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        await sql.query`
            INSERT INTO Usuario (name_user, last_name_user, email_user, pass_user)
            VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword});
        `;

        res.status(201).send({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).send({ error: 'Error al registrar el usuario' });
    } finally {
        await sql.close();
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:5000`);
});

