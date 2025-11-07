const express = require('express');
const app = express();
const PORT = 3000;

// Importar las rutas
const taller1 = require('./routes/taller1');
const taller2 = require('./routes/taller2');
const taller3 = require('./routes/taller3');

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas
app.use('/taller-1', taller1);
app.use('/taller-2', taller2);
app.use('/taller-3', taller3);

// Ruta base
app.get('/', (req, res) => {
  res.send('Backend simple con 3 rutas de talleres');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
