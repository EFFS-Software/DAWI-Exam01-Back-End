import express from "express";
const historialVehiculo = express();

import { getHistorialVehiculo, getIDHistorialVehiculo, postHistorialVehiculo, putHistorialVehiculo, deleteHistorialVehiculo } from "../controllers/historialVehiculoController.js";

//Metodo para extraer datos a una base de Datos por medio de un api rest "GET"
historialVehiculo.get('', getHistorialVehiculo);

//Metodo para extraer datos por medio del ID a una base de Datos por medio de un api rest "GET"
historialVehiculo.get('/:id', getIDHistorialVehiculo);

//Metodo para agregar datos a una base de Datos por medio de un api rest "POST"
historialVehiculo.post('', postHistorialVehiculo);

//Metodo para modificar datos a una base de Datos por medio de un api rest "PUT"
historialVehiculo.put('/:id', putHistorialVehiculo);

//Metodo para borrar datos a una base de Datos por medio de un api rest "DELETE"
historialVehiculo.delete('/:id', deleteHistorialVehiculo);

export { historialVehiculo };