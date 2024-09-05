import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let data = []
      const [eventResult] = await connection.query('SELECT * FROM evento');

      for(let event of eventResult){
        console.log(event)
        const [organizadorResult] = await connection.query('SELECT COUNT(*) AS "CANTIDAD_MAXIMA" FROM organizadores WHERE event_id = ?', [event.id]);
        const [invitedResult_contactado] = await connection.query('SELECT COUNT(*) AS "CANTIDAD_CONTACTADOS" FROM invitados LEFT JOIN evento ON invitados.evento_id = evento.id WHERE invitados.evento_id = ? AND invitados.contactado = 1 ', [event.id]);
        const [invitedResult_no_contactado] = await connection.query('SELECT COUNT(*) AS "CANTIDAD_NO_CONTACTADOS" FROM invitados LEFT JOIN evento ON invitados.evento_id = evento.id WHERE invitados.evento_id = ? AND invitados.contactado = 0 ', [event.id]);
        data.push({
          "ID":event.id,
          "Nombre del evento":event.name_event,
          "Organizador":organizadorResult[0].CANTIDAD_MAXIMA,
          "Invitados Contactados":invitedResult_contactado[0].CANTIDAD_CONTACTADOS,
          "Invitados No Contactados":invitedResult_no_contactado[0].CANTIDAD_NO_CONTACTADOS,

        })

      }
      res.status(200).json(data);

    } catch (error) {
      console.error('Error fetching event data:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}