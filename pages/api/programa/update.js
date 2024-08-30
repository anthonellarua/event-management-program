import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, date, start_time, end_time, description } = req.body;

    try {
      const query = `
        UPDATE programa
        SET date = ?, start_time = ?, end_time = ?, description = ?
        WHERE id = ?
      `;
      const values = [date, start_time, end_time, description, id];
      const [result] = await connection.query(query, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
      }

      const updatedActivity = { id, date, start_time, end_time, description };

      res.status(200).json({ activity: updatedActivity });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
