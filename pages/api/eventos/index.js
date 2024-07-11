import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const eventsQuery = `
        SELECT evento.*, lugares.name AS location, anfitriones.name AS host_name
        FROM evento
        LEFT JOIN lugares ON lugares.evento_id = evento.id
        LEFT JOIN anfitriones ON anfitriones.event_id = evento.id
        ORDER BY start_date ASC;
      `;

      const [rows] = await connection.query(eventsQuery);
      const formatDate = (date) => {
        if (!date) return null;
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString('es-ES', options);
      };

      const events = rows.map(event => ({
        ...event,
        start_date: formatDate(event.start_date),
        end_date: formatDate(event.end_date),
      }));

      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Error fetching events: " + error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
