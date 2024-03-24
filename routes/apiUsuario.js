import express from "express";
const usuario = express();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer( {storage : storage} );

import { getAuth, postUsuario } from "../controllers/usuarioController.js";

//Metodo para extraer datos a una base de Datos por medio de un api rest "GET"

//Metodo para extraer datos por medio del ID a una base de Datos por medio de un api rest "GET"
usuario.get('/auth/:nombre_usuario/:pass', getAuth);

//Metodo para agregar datos a una base de Datos por medio de un api rest "POST"
usuario.post('', upload.single('foto_perfil'), postUsuario);

//Metodo para modificar datos a una base de Datos por medio de un api rest "PUT"

//Metodo para borrar datos a una base de Datos por medio de un api rest "DELETE"

export { usuario };