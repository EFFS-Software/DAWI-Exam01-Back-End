import {db} from '../db/conn.js';

const getHistorialVehiculo = async (req, res)=>{
  const sql = `select t1.id, t4.descripcion "Marca", t3.descripcion "Modelo", t2.anio, t1.fecha, t1.reparaciones, t1.modificaciones, t1.notas_adicionales from tbl_historial_vehiculo t1 inner join tbl_vehiculo t2 on t2.id = t1.vehiculo_id inner join tbl_modelo t3 on t3.id = t2.modelo_id inner join tbl_marca t4 on t4.id = t3.marca_id order by t1.id`;
  const result = await db.query(sql);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registros.' });
  } else {
    res.json(result);
  };
};

const getIDHistorialVehiculo = async (req, res)=>{
	const params = [req.params.id];
  const sql = `select t1.id, t4.descripcion "Marca", t3.descripcion "Modelo", t2.anio, t1.fecha, t1.reparaciones, t1.modificaciones, t1.notas_adicionales from tbl_historial_vehiculo t1 inner join tbl_vehiculo t2 on t2.id = t1.vehiculo_id inner join tbl_modelo t3 on t3.id = t2.modelo_id inner join tbl_marca t4 on t4.id = t3.marca_id where t1.id = $1`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const postHistorialVehiculo = async (req, res)=>{
  const { vehiculo_id, fecha, reparaciones, modificaciones, notas_adicionales } = req.body;
  const params = [ vehiculo_id, fecha, reparaciones, modificaciones, notas_adicionales ];
  const sql = `insert into tbl_historial_vehiculo ( vehiculo_id, fecha, reparaciones, modificaciones, notas_adicionales ) values ( $1, $2, $3, $4, $5 ) returning * `;
  const result = await db.query(sql , params);

  res.json(result);
};

const putHistorialVehiculo = async (req, res)=>{
	const id = req.params.id;
  const { vehiculo_id, fecha, reparaciones, modificaciones, notas_adicionales } = req.body;
  const params = [ vehiculo_id, fecha, reparaciones, modificaciones, notas_adicionales, id] ;
	const sql = `update tbl_historial_vehiculo set vehiculo_id = $1, fecha = $2, reparaciones = $3, modificaciones = $4, notas_adicionales = $5, date_modify = current_timestamp where id = $6 returning *`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const deleteHistorialVehiculo = async (req, res)=>{
  try {
    const params = [req.params.id];
    const sql = `delete from tbl_historial_vehiculo where id = $1 returning *`;
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

export { getHistorialVehiculo, getIDHistorialVehiculo, postHistorialVehiculo, putHistorialVehiculo, deleteHistorialVehiculo };