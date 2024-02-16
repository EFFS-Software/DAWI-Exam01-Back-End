import express from "express";
const mecanico = express();

import { getMecanico, getIDMecanico, postMecanico, putMecanico, deleteMecanico } from "../controllers/mecanicoController.js";

//Metodo para extraer datos a una base de Datos por medio de un api rest "GET"
mecanico.get('', getMecanico);

//Metodo para extraer datos por medio del ID a una base de Datos por medio de un api rest "GET"
mecanico.get('/:id', getIDMecanico);

//Metodo para agregar datos a una base de Datos por medio de un api rest "POST"
mecanico.post('', postMecanico);

//Metodo para modificar datos a una base de Datos por medio de un api rest "PUT"
mecanico.put('/:id', putMecanico);

//Metodo para borrar datos a una base de Datos por medio de un api rest "DELETE"
mecanico.delete('/:id', deleteMecanico);

export { mecanico };