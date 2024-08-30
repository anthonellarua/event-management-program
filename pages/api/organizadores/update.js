import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, name, last_name, phone } = req.body;

    try {
      const query = `
        UPDATE organizadores
        SET name = ?, last_name = ?, phone = ?
        WHERE id = ?
      `;
      const values = [name, last_name, phone, id];
      const [result] = await connection.query(query, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Organizador no encontrado' });
      }

      const updatedOrganizer = { id, name, last_name, phone };

      res.status(200).json({ organizer: updatedOrganizer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
