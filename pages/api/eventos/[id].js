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
      const [invitedResult] = await connection.query('SELECT invitados.*, evento.name_event FROM invitados LEFT JOIN evento ON invitados.evento_id = evento.id WHERE invitados.evento_id = ?', [id]);

      // Obtener el programa del evento
      const [programResult] = await connection.query('SELECT * FROM programa WHERE event_id = ?', [id]);

      // Obtener el nombre del organizador
      const [organizadorResult] = await connection.query('SELECT * FROM organizadores WHERE event_id = ?', [id]);

      // Obtener el nombre del anfitrión
      const [anfitrionResult] = await connection.query('SELECT * FROM anfitriones WHERE event_id = ?', [id]);

      // Obtener el nombre del lugar
      const [placeResult] = await connection.query('SELECT * FROM lugares WHERE evento_id = ?', [id]);

      // Función para formatear la fecha en formato dd/mm/yyyy
      const formatDate = (date) => {
        if (!date) return null;
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('es-ES', options);
      };

      // Función para formatear la fecha en formato "14 de junio"
      const formatProgramDate = (date) => {
        if (!date) return null;
        const options = { day: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString('es-ES', options);
      };

      const event = eventResult[0];
      event.start_date = formatDate(event.start_date);
      event.end_date = formatDate(event.end_date);

      const program = programResult.map(item => ({
        ...item,
        dateModified: formatProgramDate(item.date),
        date: item.date
      }));

      res.status(200).json({
        event,
        invited: invitedResult,
        program,
        organizadores: organizadorResult,
        anfitriones: anfitrionResult,
        lugares: placeResult,
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
