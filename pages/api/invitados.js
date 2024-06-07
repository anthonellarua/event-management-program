import connection from '../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const [rows] = await connection.query('SELECT * FROM invitados');
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'POST':
      try {
        const { nombre, email } = req.body;
        const [result] = await connection.query('INSERT INTO invitados (nombre, email) VALUES (?, ?)', [nombre, email]);
        res.status(201).json({ id: result.insertId, nombre, email });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    // Puedes agregar más casos para PUT y DELETE si lo necesitas
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
