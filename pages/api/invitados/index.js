import connection from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const [result] = await connection.query('SELECT * FROM invitados');
        const [event] = await connection.query(`SELECT * FROM evento`);
        result.forEach((obj)=>{
          const currentEvent = event.find(el=>el.id==obj.evento_id)
          if(currentEvent){
            obj.name_event= currentEvent.name_event
          }
        })
  
        res.status(200).json(result);
      } catch (error) {
        console.error('Error fetching invited data:', error);
        res.status(500).json({ error: error.message });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
