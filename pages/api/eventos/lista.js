import connection from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Obtener los detalles del evento
      const [eventResult] = await connection.query('SELECT id as value, name_event as label FROM evento');
      if (eventResult.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }

      res.status(200).json(eventResult);
    } catch (error) {
      console.error('Error fetching event data:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
