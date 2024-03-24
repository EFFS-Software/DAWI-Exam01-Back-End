import {db} from '../db/conn.js';

const getVehiculo = async (req, res)=>{
  const sql = `select t1.id, t3.descripcion "marca", t2.descripcion "modelo", t1.anio, t1.tipo_combustible, t1.kilometraje, t1.num_puertas, t1.num_asientos, t3.descripcion || ' | ' || t2.descripcion || ' | ' || t1.anio "vehiculo", mime_type, encode(foto_vehiculo, 'base64') "foto_vehiculo" from tbl_vehiculo t1 inner join tbl_modelo t2 on t2.id = t1.modelo_id inner join tbl_marca t3 on t3.id = t2.marca_id order by t1.id`;
  const result = await db.query(sql);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registros.' });
  } else {
    res.json(result);
  };
};

const getIDVehiculo = async (req, res)=>{
	const params = [req.params.id];
  const sql = `select t1.id, t3.descripcion "marca", t1.modelo_id, t2.descripcion "Modelo", t1.anio, t1.tipo_combustible, t1.kilometraje, t1.num_puertas, t1.num_asientos, foto_vehiculo, mime_type, nombre_archivo from tbl_vehiculo t1 inner join tbl_modelo t2 on t2.id = t1.modelo_id inner join tbl_marca t3 on t3.id = t2.marca_id where t1.id = $1`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const postVehiculo = async (req, res)=>{
  const { modelo_id, anio, tipo_combustible, kilometraje, num_puertas, num_asientos } = req.body;
  const { buffer, mimetype, originalname } = req.file;
  
  const params = [modelo_id, anio, tipo_combustible, kilometraje, num_puertas, num_asientos, buffer, mimetype, originalname];

  const sql = `insert into tbl_vehiculo ( modelo_id, anio, tipo_combustible, kilometraje, num_puertas, num_asientos, foto_vehiculo, mime_type, nombre_archivo ) values ( $1, $2, $3, $4, $5, $6, $7, $8, $9 ) returning * `;
  const result = await db.query(sql , params);

  res.json(result);
};

const putVehiculo = async (req, res)=>{
	const id = req.params.id;
  const { modelo_id, anio, tipo_combustible, kilometraje, num_puertas, num_asientos } = req.body;
  const { buffer, mimetype, originalname } = req.file;

  const params = [modelo_id, anio, tipo_combustible, kilometraje, num_puertas, num_asientos, buffer, mimetype, originalname, id];

	const sql = `update tbl_vehiculo set modelo_id = $1, anio = $2, tipo_combustible = $3, kilometraje = $4, num_puertas = $5, num_asientos = $6, foto_vehiculo = $7, mime_type = $8, nombre_archivo=$9, date_modify = current_timestamp where id=$10 returning *`;
  const result = await db.query(sql, params);
  
  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const deleteVehiculo = async (req, res)=>{
  try {
    const params = [req.params.id];
    const sql = `delete from tbl_vehiculo where id = $1 returning *`;
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

export { getVehiculo, getIDVehiculo, postVehiculo, putVehiculo, deleteVehiculo };