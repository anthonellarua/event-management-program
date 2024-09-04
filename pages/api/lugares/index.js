import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await connection.query('SELECT * FROM lugares');
      const [event] = await connection.query(`SELECT * FROM evento`);
      rows.forEach((obj)=>{
        const currentEvent = event.find(el=>el.id==obj.evento_id)
        if(currentEvent){
          obj.name_event= currentEvent.name_event
        }
      })
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
