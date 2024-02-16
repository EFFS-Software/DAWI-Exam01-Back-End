import express from "express";
const mantenimiento = express();

import { getMantenimiento, getIDMantenimiento, postMantenimiento, putMantenimiento, deleteMantenimiento } from "../controllers/mantenimientoController.js";

//Metodo para extraer datos a una base de Datos por medio de un api rest "GET"
mantenimiento.get('', getMantenimiento);

//Metodo para extraer datos por medio del ID a una base de Datos por medio de un api rest "GET"
mantenimiento.get('/:id', getIDMantenimiento);

//Metodo para agregar datos a una base de Datos por medio de un api rest "POST"
mantenimiento.post('', postMantenimiento);

//Metodo para modificar datos a una base de Datos por medio de un api rest "PUT"
mantenimiento.put('/:id', putMantenimiento);

//Metodo para borrar datos a una base de Datos por medio de un api rest "DELETE"
mantenimiento.delete('/:id', deleteMantenimiento);

export { mantenimiento };