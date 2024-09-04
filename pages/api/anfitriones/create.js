import connection from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, last_name, phone, evento_id, name_event } = req.body;

        console.log(name_event);
        try {
            const query = `
        INSERT INTO anfitriones
        (name, last_name, phone, event_id)
        VALUES (?, ?, ?, ?)
      `;
            const values = [name, last_name, phone, evento_id];
            const [result] = await connection.query(query, values);

            const newItem = {
                id: result.insertId,
                name,
                last_name,
                phone,
                evento_id,
            };

            res.status(201).json({ anfitriones: newItem });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
