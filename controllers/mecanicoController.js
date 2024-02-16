import {db} from '../db/conn.js';

const getMecanico = async (req, res)=>{
  const sql = `select t1.id, t1.nombre, t2.descripcion "especialidad" from tbl_mecanico t1 inner join tbl_especialidad_mecanico t2 on t2.id = t1.especialidad_mecanico_id order by t1.id`;
  const result = await db.query(sql);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registros.' });
  } else {
    res.json(result);
  };
};

const getIDMecanico = async (req, res)=>{
	const params = [req.params.id];
  const sql = `select t1.id, t1.nombre, t2.descripcion "especialidad" from tbl_mecanico t1 inner join tbl_especialidad_mecanico t2 on t2.id = t1.especialidad_mecanico_id where t1.id = $1`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const postMecanico = async (req, res)=>{
  const { nombre, especialidad_mecanico_id } = req.body;
  const params = [ nombre, especialidad_mecanico_id ];
  const sql = `insert into tbl_mecanico ( nombre, especialidad_mecanico_id ) values ( $1, $2 ) returning * `;
  const result = await db.query(sql , params);

  res.json(result);
};

const putMecanico = async (req, res)=>{
	const id = req.params.id;
  const { nombre, especialidad_mecanico_id } = req.body;
  const params = [ nombre, especialidad_mecanico_id, id] ;
	const sql = `update tbl_mecanico set nombre = $1, especialidad_mecanico_id = $2, date_modify = current_timestamp where id = $3 returning *`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const deleteMecanico = async (req, res)=>{
  try {
    const params = [req.params.id];
    const sql = `delete from tbl_mecanico where id = $1 returning *`;
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

export { getMecanico, getIDMecanico, postMecanico, putMecanico, deleteMecanico };