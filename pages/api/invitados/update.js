import connection from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, name, last_name, phone, contactado } = req.body;

    try {
      const query = `
        UPDATE invitados
        SET name = ?, last_name = ?, phone = ?, contactado = ?
        WHERE id = ?
      `;
      const values = [name, last_name, phone, contactado, id];
      const [result] = await connection.query(query, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Invitado no encontrado' });
      }

      const updatedInvitado = { id, name, last_name, phone, contactado };

      res.status(200).json({ invitado: updatedInvitado });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
