import {db} from '../db/conn.js';

const getMantenimiento = async (req, res)=>{
  const sql = `select t1.id, t1.fecha, t1.diagnostico, t1.servicio, t1.kilometraje, t1.costos, t1.notas_adicionales, t4.descripcion "Marca", t3.descripcion "Modelo", t2.anio, t2.tipo_combustible, t2.kilometraje, t2.num_puertas, t2.num_asientos from tbl_mantenimiento t1 inner join tbl_vehiculo t2 on t2.id = t1.vehiculo_id inner join tbl_modelo t3 on t3.id = t2.modelo_id inner join tbl_marca t4 on t4.id = t3.marca_id order by t1.id`;
  const result = await db.query(sql);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registros.' });
  } else {
    res.json(result);
  };
};

const getIDMantenimiento = async (req, res)=>{
	const params = [req.params.id];
  const sql = `select t1.id, t1.fecha, t1.diagnostico, t1.servicio, t1.kilometraje, t1.costos, t1.notas_adicionales, t4.descripcion "Marca", t3.descripcion "Modelo", t2.anio, t2.tipo_combustible, t2.kilometraje, t2.num_puertas, t2.num_asientos from tbl_mantenimiento t1 inner join tbl_vehiculo t2 on t2.id = t1.vehiculo_id inner join tbl_modelo t3 on t3.id = t2.modelo_id inner join tbl_marca t4 on t4.id = t3.marca_id where t1.id = $1`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const postMantenimiento = async (req, res)=>{
  const { vehiculo_id, fecha, diagnostico, servicio, kilometraje, costos, notas_adicionales } = req.body;
  const params = [ vehiculo_id, fecha, diagnostico, servicio, kilometraje, costos, notas_adicionales ];
  const sql = `insert into tbl_mantenimiento ( vehiculo_id, fecha, diagnostico, servicio, kilometraje, costos, notas_adicionales ) values ( $1, $2, $3, $4, $5, $6, $7 ) returning * `;
  const result = await db.query(sql , params);

  res.json(result);
};

const putMantenimiento = async (req, res)=>{
	const id = req.params.id;
  const { vehiculo_id, fecha, diagnostico, servicio, kilometraje, costos, notas_adicionales } = req.body;
  const params = [ vehiculo_id, fecha, diagnostico, servicio, kilometraje, costos, notas_adicionales, id] ;
	const sql = `update tbl_mantenimiento set vehiculo_id = $1, fecha = $2, diagnostico = $3, servicio = $4, kilometraje = $5, costos = $6, notas_adicionales = $7, date_modify = current_timestamp where id = $8 returning *`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const deleteMantenimiento = async (req, res)=>{
  try {
    const params = [req.params.id];
    const sql = `delete from tbl_mantenimiento where id = $1 returning *`;
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

export { getMantenimiento, getIDMantenimiento, postMantenimiento, putMantenimiento, deleteMantenimiento };