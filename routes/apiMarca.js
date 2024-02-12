import express from "express";
const marca = express();

import { getMarca, getIDMarca, postMarca, putMarca, deleteMarca } from "../controllers/marcaController.js";

//Metodo para extraer datos a una base de Datos por medio de un api rest "GET"
marca.get('', getMarca);

//Metodo para extraer datos por medio del ID a una base de Datos por medio de un api rest "GET"
marca.get('/:id', getIDMarca);

//Metodo para agregar datos a una base de Datos por medio de un api rest "POST"
marca.post('', postMarca);

//Metodo para modificar datos a una base de Datos por medio de un api rest "PUT"
marca.put('/:id', putMarca);

//Metodo para borrar datos a una base de Datos por medio de un api rest "DELETE"
marca.delete('/:id', deleteMarca);

export { marca };