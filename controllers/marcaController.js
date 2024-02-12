import {db} from '../db/conn.js';

const getMarca = async (req, res)=>{
  const sql = `select *from tbl_marca order by id`;
  const result = await db.query(sql);
  
  res.json(result);
};

const getIDMarca = async (req, res)=>{
	const params = [req.params.id];
  const sql = `select *from tbl_marca where id = $1`;
  const result = await db.query(sql, params);

  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const postMarca = async (req, res)=>{
  const { descripcion } = req.body;
  const params = [descripcion];
  const sql = `insert into tbl_marca ( descripcion ) values ( $1 ) returning * `;
  const result = await db.query(sql , params);

  res.json(result);
};

const putMarca = async (req, res)=>{
	const id = req.params.id;
  const { descripcion } = req.body;
  const params = [descripcion, id];
	const sql = `update tbl_marca set descripcion = $1, date_modify = current_timestamp where id = $2 returning *`;
  const result = await db.query(sql, params);

  if (result.length === 0) {
    res.status(404).json({ message: 'No se encontró registro.' });
  } else {
    res.json(result);
  };
};

const deleteMarca = async (req, res)=>{
  try{
    let isDeleteRecord = false;
    let sql = "";
    let result = "";
    const params = [req.params.id];

    sql = `select *from tbl_vehiculo t1 inner join tbl_modelo t2 on t2.id = t1.modelo_id inner join tbl_marca t3 on t3.id = t2.marca_id where t3.id = $1`;
    result = await db.query(sql, params);
  
    if (result.length === 0) {
      isDeleteRecord = true;
    } else {
      sql = `delete from tbl_vehiculo where modelo_id in (select id from tbl_modelo where marca_id =$1) returning *`;
      result = await db.query(sql, params);

      isDeleteRecord = (result.length === 0, false, true);

      if(!isDeleteRecord){
        res.json({ Detalle: 'Ocurrió un error en tbl_vehiculo' });
      };
    };

    if(isDeleteRecord){
      sql = `select *from tbl_modelo where marca_id = $1`;
      result = await db.query(sql, params);

      if (result.length === 0) {
        isDeleteRecord = true;
      } else {
        sql = `delete from tbl_modelo where marca_id = $1 returning *`;
        result = await db.query(sql, params);

        isDeleteRecord = (result.length === 0, false, true); 
      };

      if (!isDeleteRecord) {
        res.status(404).json({ message: 'No se pudo borrar registro.' });
      } else {
        const params = [req.params.id];
        const sql = `delete from tbl_marca where id = $1 returning *`;
        const result = await db.query(sql, params);

        if (result.length === 0) {
          res.status(404).json({ message: 'No se encontró registro.' });
        } else {
          res.json(result);
        };
      };
    }
  }catch (error) {
    res.json({ error, Detalle: 'Ocurrió un error' });
  }
};

export { getMarca, getIDMarca, postMarca, putMarca, deleteMarca };