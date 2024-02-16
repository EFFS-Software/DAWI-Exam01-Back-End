import {db} from '../db/conn.js';

const getMantenimientoMecanico = async (req, res)=>{
  const sql = `select t1.id, t2.nombre "Mecanico", t3.descripcion "Especialidad", t4.fecha, t4.diagnostico, t4.servicio, t1.detalle_servicio from tbl_mantenimiento_mecanico t1 inner join tbl_mecanico t2 on t2.id = t1.mecanico_id inner join tbl_especialidad_mecanico t3 on t3.id = t2.especialidad_mecanico_id inner join tbl_mantenimiento t4 on t4.id = t1.mantenimiento_id order by t1.id;`;
  const result = await db.query(sql);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registros.' });
  } else {
    res.json(result);
  };
};

const getIDMantenimientoMecanico = async (req, res)=>{
	const params = [req.params.id];
  const sql = `select t1.id, t2.nombre "Mecanico", t3.descripcion "Especialidad", t4.fecha, t4.diagnostico, t4.servicio, t1.detalle_servicio from tbl_mantenimiento_mecanico t1 inner join tbl_mecanico t2 on t2.id = t1.mecanico_id inner join tbl_especialidad_mecanico t3 on t3.id = t2.especialidad_mecanico_id inner join tbl_mantenimiento t4 on t4.id = t1.mantenimiento_id where t1.id = $1`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const postMantenimientoMecanico = async (req, res)=>{
  const { mecanico_id, mantenimiento_id, detalle_servicio } = req.body;
  const params = [ mecanico_id, mantenimiento_id, detalle_servicio ];
  const sql = `insert into tbl_mantenimiento_mecanico ( mecanico_id, mantenimiento_id, detalle_servicio ) values ( $1, $2, $3 ) returning * `;
  const result = await db.query(sql , params);

  res.json(result);
};

const putMantenimientoMecanico = async (req, res)=>{
	const id = req.params.id;
  const { mecanico_id, mantenimiento_id, detalle_servicio } = req.body;
  const params = [ mecanico_id, mantenimiento_id, detalle_servicio, id] ;
	const sql = `update tbl_mantenimiento_mecanico set mecanico_id = $1, mantenimiento_id = $2, detalle_servicio = $3, date_modify = current_timestamp where id = $4 returning *`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const deleteMantenimientoMecanico = async (req, res)=>{
  try {
    const params = [req.params.id];
    const sql = `delete from tbl_mantenimiento_mecanico where id = $1 returning *`;
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

export { getMantenimientoMecanico, getIDMantenimientoMecanico, postMantenimientoMecanico, putMantenimientoMecanico, deleteMantenimientoMecanico };