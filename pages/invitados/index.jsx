import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Invitados() {
  const [invitados, setInvitados] = useState([]);

  useEffect(() => {
    fetch('/api/invitados')
      .then(response => response.json())
      .then(data => setInvitados(data))
      .catch(error => console.error('Error fetching invited:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Invitados</h1>
      <Link href="/invitados/create">
        Agregar Invitado
      </Link>
      {invitados.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>ID del Evento</th>
              <th>Contactado</th>
            </tr>
          </thead>
          <tbody>
            {invitados.map((invitado) => (
              <tr key={invitado.id}>
                <td>{invitado.name}</td>
                <td>{invitado.last_name}</td>
                <td>{invitado.phone}</td>
                <td>{invitado.evento_id}</td>
                <td>{invitado.contactado ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay invitados en este momento.</p>
      )}
    </div>
  );
}
