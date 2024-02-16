import {db} from '../db/conn.js';

const getEspecialidadMecanico = async (req, res)=>{
  const sql = `select id, descripcion from tbl_especialidad_mecanico order by id`;
  const result = await db.query(sql);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registros.' });
  } else {
    res.json(result);
  };
};

const getIDEspecialidadMecanico = async (req, res)=>{
	const params = [req.params.id];
  const sql = `select id, descripcion from tbl_especialidad_mecanico where id = $1`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const postEspecialidadMecanico = async (req, res)=>{
  const { descripcion } = req.body;
  const params = [ descripcion ];
  const sql = `insert into tbl_especialidad_mecanico ( descripcion ) values ( $1 ) returning * `;
  const result = await db.query(sql , params);

  res.json(result);
};

const putEspecialidadMecanico = async (req, res)=>{
	const id = req.params.id;
  const { descripcion } = req.body;
  const params = [ descripcion, id] ;
	const sql = `update tbl_especialidad_mecanico set descripcion = $1, date_modify = current_timestamp where id = $2 returning *`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const deleteEspecialidadMecanico = async (req, res)=>{
  try {
    const params = [req.params.id];
    const sql = `delete from tbl_especialidad_mecanico where id = $1 returning *`;
    const result = await db.query(sql, params);

    if (result.length === 0) {
      res.status(404).json({ message: 'No se encontró registros.' });
    } else {
      res.json(result);
    };
  } catch (error) {
    // Captura el error y maneja la respuesta apropiada
    console.error('Error al eliminar el registro:', error.message);
    res.status(500).json({ message: 'Error al eliminar el registro.' });
  }
};

export { getEspecialidadMecanico, getIDEspecialidadMecanico, postEspecialidadMecanico, putEspecialidadMecanico, deleteEspecialidadMecanico };