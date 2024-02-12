import express from "express";
const modelo = express();

import { getModelo, getIDModelo, postModelo, putModelo, deleteModelo } from "../controllers/modeloController.js";

//Metodo para extraer datos a una base de Datos por medio de un api rest "GET"
modelo.get('', getModelo);

//Metodo para extraer datos por medio del ID a una base de Datos por medio de un api rest "GET"
modelo.get('/:id', getIDModelo);

//Metodo para agregar datos a una base de Datos por medio de un api rest "POST"
modelo.post('', postModelo);

//Metodo para modificar datos a una base de Datos por medio de un api rest "PUT"
modelo.put('/:id', putModelo);

//Metodo para borrar datos a una base de Datos por medio de un api rest "DELETE"
modelo.delete('/:id', deleteModelo);

export { modelo };