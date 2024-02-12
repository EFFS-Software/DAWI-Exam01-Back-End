import express from 'express';
const app = express();

import {marca} from './routes/apiMarca.js';
import {modelo} from './routes/apiModelo.js';
import {vehiculo} from './routes/apiVehiculo.js';

const port = 4000;
app.use(express.json());

app.use('/api/marca', marca);
app.use('/api/modelo', modelo);
app.use('/api/vehiculo', vehiculo);

app.listen(port, ()=>{
  console.log(`Escuchando en el puerto ${port}.`);
});