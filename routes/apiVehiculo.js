import express from "express";
const vehiculo = express();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer( {storage : storage} );

import { getVehiculo, getIDVehiculo, postVehiculo, putVehiculo, deleteVehiculo } from "../controllers/vehiculoController.js";

//Metodo para extraer datos a una base de Datos por medio de un api rest "GET"
vehiculo.get('', getVehiculo);

//Metodo para extraer datos por medio del ID a una base de Datos por medio de un api rest "GET"
vehiculo.get('/:id', getIDVehiculo);

//Metodo para agregar datos a una base de Datos por medio de un api rest "POST"
vehiculo.post('', upload.single('foto_vehiculo'), postVehiculo);

//Metodo para modificar datos a una base de Datos por medio de un api rest "PUT"
vehiculo.put('/:id', upload.single('foto_vehiculo'), putVehiculo);

//Metodo para borrar datos a una base de Datos por medio de un api rest "DELETE"
vehiculo.delete('/:id', deleteVehiculo);

export { vehiculo };