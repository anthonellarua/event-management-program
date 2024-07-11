import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, name_event, description, dress_code, occasion, start_date, end_date, start_time, end_time } = req.body;

    try {
      await connection.query(
        'UPDATE evento SET name_event = ?, description = ?, dress_code = ?, occasion = ?, start_date = ?, end_date = ?, start_time = ?, end_time = ? WHERE id = ?',
        [name_event, description, dress_code, occasion, start_date, end_date, start_time, end_time, id]
      );

      res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
