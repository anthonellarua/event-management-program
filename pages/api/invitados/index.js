import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [result] = await connection.query('SELECT * FROM invitados');
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
