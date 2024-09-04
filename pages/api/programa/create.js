import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { date, start_time, end_time, description, evento_id } = req.body;

    console.log(req.body);
    try {
      const query = `
        INSERT INTO programa
        (date, start_time, end_time, description, event_id)
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [date, start_time, end_time, description, evento_id];
      const [result] = await connection.query(query, values);
      
      const newActivity = {
        id: result.insertId,
        date,
        start_time,
        end_time,
        description,
        evento_id
      };

      res.status(201).json({ program: newActivity });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
