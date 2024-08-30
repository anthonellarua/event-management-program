import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      const query = `
        DELETE FROM programa
        WHERE id = ?
      `;
      const values = [id];
      const [result] = await connection.query(query, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
      }

      res.status(200).json({ message: 'Actividad eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
