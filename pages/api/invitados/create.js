import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, last_name, phone, evento_id, contactado } = req.body;

    try {
      const query = `
        INSERT INTO invitados
        (name, last_name, phone, evento_id, contactado)
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [name, last_name, phone, evento_id, contactado];
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
