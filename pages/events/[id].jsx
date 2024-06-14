import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/events/${id}`)
        .then(response => response.json())
        .then(data => setEventDetails(data))
        .catch(error => console.error('Error fetching event:', error));
    }
  }, [id]);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  const { event, invited } = eventDetails;

  return (
    <div>
      <h1>{event.name_event}</h1>
      <p>{event.description}</p>
      <p>Código de Vestimenta: {event.dress_code}</p>
      <p>Ocasión: {event.occasion}</p>
      <p>Hora de Inicio: {event.start_time}</p>
      <p>Hora de Fin: {event.end_time}</p>
      <p>Fecha de Inicio: {event.start_date}</p>
      <p>Fecha de Fin: {event.end_date}</p>
      <p>Organizador ID: {event.organizador_id}</p>
      <p>Anfitrión ID: {event.anfitrion_id}</p>

      <h2>Invitados</h2>
      {invited.length > 0 ? (
        <ul>
          {invited.map(invite => (
            <li key={invite.id}>
              {invite.name} {invite.phone} 
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay invitados para este evento.</p>
      )}
    </div>
  );
}
