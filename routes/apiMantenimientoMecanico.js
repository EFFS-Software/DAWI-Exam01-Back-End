import express from "express";
const mantenimientoMecanico = express();

import { getMantenimientoMecanico, getIDMantenimientoMecanico, postMantenimientoMecanico, putMantenimientoMecanico, deleteMantenimientoMecanico } from "../controllers/mantenimientoMecanicoController.js";

//Metodo para extraer datos a una base de Datos por medio de un api rest "GET"
mantenimientoMecanico.get('', getMantenimientoMecanico);

//Metodo para extraer datos por medio del ID a una base de Datos por medio de un api rest "GET"
mantenimientoMecanico.get('/:id', getIDMantenimientoMecanico);

//Metodo para agregar datos a una base de Datos por medio de un api rest "POST"
mantenimientoMecanico.post('', postMantenimientoMecanico);

//Metodo para modificar datos a una base de Datos por medio de un api rest "PUT"
mantenimientoMecanico.put('/:id', putMantenimientoMecanico);

//Metodo para borrar datos a una base de Datos por medio de un api rest "DELETE"
mantenimientoMecanico.delete('/:id', deleteMantenimientoMecanico);

export { mantenimientoMecanico };