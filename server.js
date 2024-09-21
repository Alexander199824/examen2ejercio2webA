const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./app/config/db.config.js');
let router = require('./app/routers/router.js'); // Cambiamos el enrutador a usuarios
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Sincronizar la base de datos
db.sequelize.sync({ force: true }).then(() => {
    console.log('Base de datos sincronizada sin eliminar tablas existentes');
    
    // Usa el enrutador para manejar las rutas de usuarios
    app.use('/', router);

    // Define una ruta para la raíz de la aplicación
    app.get("/", (req, res) => {
        res.json({ message: "Bienvenido a la aplicación de gestión de usuarios" });
    });

    // Inicia el servidor
    const server = app.listen(8080, function () {
        let host = server.address().address;
        let port = server.address().port;
        console.log("App listening at http://%s:%s", host, port); 
    });
}).catch(error => {
    console.log("Error al sincronizar la base de datos:", error);
});
