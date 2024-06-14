import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Error fetching events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    router.push('/events/create');
  };

  return (
    <div>
      <h1>Lista de Eventos</h1>
      <button onClick={handleCreateEvent}>Crear Evento</button>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name_event} - {event.occasion} (Desde: {event.start_date} {event.start_time} Hasta: {event.end_date} {event.end_time})
            <Link href={`/events/${event.id}`}>
              <button>Ver Evento</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
