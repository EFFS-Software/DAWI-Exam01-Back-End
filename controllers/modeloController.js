import {db} from '../db/conn.js';

const getModelo = async (req, res)=>{
  const sql = `select t1.id, t1.descripcion "Modelo", t2.descripcion "Marca" from tbl_modelo t1 inner join tbl_marca t2 on t2.id = t1.marca_id order by t1.id`;
  const result = await db.query(sql);
  
  res.json(result);
};

const getIDModelo = async (req, res)=>{
	const params = [req.params.id];
  const sql = `select t1.id, t1.descripcion "Modelo", t2.descripcion "Marca" from tbl_modelo t1 inner join tbl_marca t2 on t2.id = t1.marca_id where t1.id = $1`;
  const result = await db.query(sql, params);

  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const postModelo = async (req, res)=>{
  const { descripcion, marca_id } = req.body;
  const params = [descripcion, marca_id];
  const sql = `insert into tbl_modelo ( descripcion, marca_id ) values ( $1, $2 ) returning * `;
  const result = await db.query(sql , params);

  res.json(result);
};

const putModelo = async (req, res)=>{
	const id = req.params.id;
  const { descripcion, marca_id } = req.body;
  const params = [descripcion, marca_id, id];
	const sql = `update tbl_modelo set descripcion = $1, marca_id = $2, date_modify = current_timestamp where id = $3 returning *`;
  const result = await db.query(sql, params);

  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const deleteModelo = async (req, res)=>{
try{
    let isDeleteRecord = false;
    let sql = "";
    let result = "";
    const params = [req.params.id];

    sql = `select *from tbl_vehiculo where modelo_id = $1`;
    result = await db.query(sql, params);
  
    if (result.length === 0) {
      isDeleteRecord = true;
    } else {
      sql = `delete from tbl_vehiculo where modelo_id = $1 returning *`;
      result = await db.query(sql, params);

      isDeleteRecord = (result.length === 0, false, true);
    };

    if (!isDeleteRecord) {
      res.status(404).json({ message: 'No se pudo borrar registro.' });
    } else {
      const params = [req.params.id];
      const sql = `delete from tbl_modelo where id = $1 returning *`;
      const result = await db.query(sql, params);

      if (result.length === 0) {
        res.status(404).json({ message: 'No se encontró registro.' });
      } else {
        res.json(result);
      };
    };
  }catch (error) {
    res.json({ error, Detalle: 'Ocurrió un error' });
  };
};

export { getModelo, getIDModelo, postModelo, putModelo, deleteModelo };