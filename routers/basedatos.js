const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'uhxqnbth',
  host: 'lallah.db.elephantsql.com',
  database: 'uhxqnbth',
  password: 'Udz8WastnUAH32fdJUMShysHpr6-ps0J',
  port: 5432,
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.post('/insertarpacientes', async (req, res) => {
  const { id, nombre, apellido } = req.body;
  await pool.query(
    `INSERT INTO pacientes(id, nombre, apellido) VALUES('${id}','${nombre}','${apellido}')`
  );
  res.send('INSERTADO');
});

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.put('/editarpaciente', async (req, res) => {
  const {id, nombre, apellido} = req.body;
  await pool.query('UPDATE pacientes SET nombre = $1, apellido = $2 WHERE id= $3', [nombre, apellido, id]);
  res.send('ACTUALIZADO');
});

router.delete('/eliminarpaciente', async(req, res) => {
  const {id} = req.body;
  await pool.query('DELETE FROM pacientes WHERE id = $1',[id]);
  res.send('ELIMINADO');
});