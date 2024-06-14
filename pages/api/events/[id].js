// pages/api/events/[id].js
import connection from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Consulta SQL para obtener los detalles del evento
      const [eventResult] = await connection.query('SELECT * FROM evento WHERE id = ?', [id]);

      // Si no se encuentra el evento, devolver un mensaje de error
      if (eventResult.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Consulta SQL para obtener los invitados del evento
      const [invitedResult] = await connection.query('SELECT * FROM invitados WHERE evento_id = ?', [id]);

      // Responder con los detalles del evento y la lista de invitados
      res.status(200).json({
        event: eventResult[0],
        invited: invitedResult,
      });
    } catch (error) {
      console.error('Error fetching event data:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
