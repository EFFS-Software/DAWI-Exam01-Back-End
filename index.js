import express from 'express';
const app = express();
import cors from "cors";

import {marca} from './routes/apiMarca.js';
import {modelo} from './routes/apiModelo.js';
import {vehiculo} from './routes/apiVehiculo.js';
import {mantenimiento} from './routes/apiMantenimiento.js';
import {especialidadMecanico} from './routes/apiEspecialidadMecanico.js';
import {mecanico} from './routes/apiMecanico.js';
import {mantenimientoMecanico} from './routes/apiMantenimientoMecanico.js';
import {historialVehiculo} from './routes/apiHistorialVehiculo.js';
import {usuario} from './routes/apiUsuario.js';

const port = 4000;
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5175',
  credential: true,
  methods: ['POST', 'PUT', 'DELETE', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));

app.use('/api/usuario', usuario);
app.use('/api/marca', marca);
app.use('/api/modelo', modelo);
app.use('/api/vehiculo', vehiculo);
app.use('/api/mantenimiento', mantenimiento);
app.use('/api/especialidad_mecanico', especialidadMecanico);
app.use('/api/mecanico', mecanico);
app.use('/api/mantenimiento_mecanico', mantenimientoMecanico);
app.use('/api/historial_vehiculo', historialVehiculo);
app.use('/api/historial_vehiculo', historialVehiculo);

app.listen(port, ()=>{
  console.log(`Escuchando en el puerto ${port}.`);
});