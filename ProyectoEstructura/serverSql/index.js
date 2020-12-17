const express = require('express'); //importa la libreria
const bodyParser = require('body-parser');
const misRutas = require('./routes/rutas');
const cors = require('cors')

const app = express(); // crea el servidor
const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/',misRutas);

app.get('/', (req, res) => {
    res.send({ message: 'hola mundo' })
});

app.listen(port, () => {
    console.log(`Mi Servidor en ejecucion en el puerto http://localhost:${port}`);
});