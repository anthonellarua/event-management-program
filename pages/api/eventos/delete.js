import connection from '../../../lib/db';
export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
     const values = [id];

     const organizadores = `DELETE FROM organizadores WHERE event_id = ?`;
     await connection.query(organizadores, values);

     const programa = `DELETE FROM programa WHERE event_id = ?`;
     await connection.query(programa, values);

      const anfitriones = `DELETE FROM anfitriones WHERE event_id = ?`;
      await connection.query(anfitriones, values);

      const lugares = `DELETE FROM lugares WHERE evento_id = ?`;
      await connection.query(lugares, values);

      const invitados = `DELETE FROM invitados WHERE evento_id = ?`;
      await connection.query(invitados, values);

      const evento = `DELETE FROM evento WHERE id = ?`;
      const [result] = await connection.query(evento, values);


      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }

      res.status(200).json({ message: 'Evento eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}