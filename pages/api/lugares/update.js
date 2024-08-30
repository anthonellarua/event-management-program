import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, name, address, reference } = req.body;

    try {
      const query = `
        UPDATE lugares
        SET name = ?, address = ?, reference = ?
        WHERE id = ?
      `;
      const values = [name, address, reference, id];
      const [result] = await connection.query(query, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Lugar no encontrado' });
      }

      const updatedLugar = { id, name, address, reference };

      res.status(200).json({ lugar: updatedLugar });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
