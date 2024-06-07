// pages/events/[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [invitados, setInvitados] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchInvitados = async () => {
        try {
          const response = await fetch(`/api/events/${id}`);
          if (!response.ok) {
            throw new Error('Error fetching invitados');
          }
          const data = await response.json();
          setInvitados(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchInvitados();
    }
  }, [id]);

  return (
    <div>
      <h1>Detalles del Evento {id}</h1>
      <h2>Lista de Invitados:</h2>
      <ul>
        {invitados.map((invitado) => (
          <li key={invitado.id}>{invitado.name} ({invitado.phone})</li>
        ))}
      </ul>
    </div>
  );
}
