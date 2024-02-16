import express from "express";
const especialidadMecanico = express();

import { getEspecialidadMecanico, getIDEspecialidadMecanico, postEspecialidadMecanico, putEspecialidadMecanico, deleteEspecialidadMecanico } from "../controllers/especialidadMecanicoController.js";

//Metodo para extraer datos a una base de Datos por medio de un api rest "GET"
especialidadMecanico.get('', getEspecialidadMecanico);

//Metodo para extraer datos por medio del ID a una base de Datos por medio de un api rest "GET"
especialidadMecanico.get('/:id', getIDEspecialidadMecanico);

//Metodo para agregar datos a una base de Datos por medio de un api rest "POST"
especialidadMecanico.post('', postEspecialidadMecanico);

//Metodo para modificar datos a una base de Datos por medio de un api rest "PUT"
especialidadMecanico.put('/:id', putEspecialidadMecanico);

//Metodo para borrar datos a una base de Datos por medio de un api rest "DELETE"
especialidadMecanico.delete('/:id', deleteEspecialidadMecanico);

export { especialidadMecanico };