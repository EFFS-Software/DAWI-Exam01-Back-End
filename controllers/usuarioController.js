import {db} from '../db/conn.js';

const getAuth = async (req, res)=>{
  const {nombre_usuario , pass} = req.params; 
  const sql = ` select nombre_usuario from tbl_usuarios where nombre_usuario = $1 and contrasena = $2`;
  const result = await db.query(sql, [nombre_usuario, pass]);
  if (result.length === 0 ){
    // res.status(404).json({mensaje: "Usuario y Contraseña no coinciden"})
    res.json(result);
  }else {
    res.json(result);
  }
}
const postUsuario = async (req, res) => {
  try {
    const { nombre_usuario, correo_electronico, contrasena, nombre, apellido } = req.body;
    const { buffer, mimetype, originalname } = req.file;

    const params = [nombre_usuario, correo_electronico, contrasena, nombre, apellido, buffer, mimetype, originalname ];
    const sql = `insert into tbl_usuarios ( nombre_usuario, correo_electronico, contrasena, nombre, apellido, foto_perfil, mime_type, nombre_archivo ) values ( $1, $2, $3, $4, $5, $6, $7, $8 ) returning * `;
    const result = await db.query(sql, params);

    res.json(result);

  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
}

export { getAuth, postUsuario }