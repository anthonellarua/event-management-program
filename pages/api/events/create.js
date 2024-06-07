import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name_event, dress_code, occasion, start_time, end_time, start_date, end_date, organizador_id, anfitrion_id } = req.body;
    
    try {
      const query = `
        INSERT INTO eventos 
        (name_event, dress_code, occasion, start_time, end_time, start_date, end_date, organizador_id, anfitrion_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [name_event, dress_code, occasion, start_time, end_time, start_date, end_date, organizador_id, anfitrion_id];
      const [result] = await connection.query(query, values);
      res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
