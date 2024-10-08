import connection from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, last_name, phone, evento_id, name_event, contactado } = req.body;

        try {
            const query = `
        INSERT INTO invitados
        (name, last_name, phone, evento_id, contactado)
        VALUES (?, ?, ?, ?, ?)
      `;
            const values = [name, last_name, phone, evento_id, contactado];
            const [result] = await connection.query(query, values);

            const newItem = {
                id: result.insertId,
                name,
                last_name,
                phone,
                evento_id,
                contactado,
            };

            res.status(201).json({ invitado: newItem });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
