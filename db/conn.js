import pg from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();
const pgp = pg();

const user = process.env._USER;
const pass = process.env._PASS;
const host = process.env._HOST;
const dbname = process.env._DBNAME;
const port = process.env._PORT;

const Pass = encodeURIComponent(pass);
const cnstr = `postgresql://${user}:${Pass}@${host}:${port}/${dbname}`;
const db = pgp(cnstr);

db.connect()
  .then( ()=>{
    console.log(`Conexión exitosa`);
  })
  .catch( (err)=>{
    console.log(`Error de conexion: ${err}`);
  })
export {db};