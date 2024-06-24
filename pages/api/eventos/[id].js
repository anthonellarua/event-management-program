import connection from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Obtener los detalles del evento
      const [eventResult] = await connection.query('SELECT * FROM evento WHERE id = ?', [id]);
      if (eventResult.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Obtener los invitados
      const [invitedResult] = await connection.query('SELECT * FROM invitados WHERE evento_id = ?', [id]);

      // Obtener el programa del evento
      const [programResult] = await connection.query('SELECT * FROM programa WHERE event_id = ?', [id]);

      // Obtener el nombre del organizador
      const [organizadorResult] = await connection.query('SELECT * FROM organizadores WHERE event_id = ?', [id]);
      // Obtener el nombre del anfitrión
      const [anfitrionResult] = await connection.query('SELECT * FROM anfitriones WHERE event_id = ?', [id]);

      res.status(200).json({
        event: eventResult[0],
        invited: invitedResult,
        program: programResult,
        organizadores:organizadorResult,
        anfitriones:anfitrionResult,
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
