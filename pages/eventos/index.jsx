import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './index.module.scss';
import Image from 'next/image';

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/eventos');
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
    router.push('/eventos/create');
  };

  return (
    <div className={styles.eventos}>
      <div className={styles.eventos__tittle}>
        <h1>Eventos</h1>
        <span onClick={handleCreateEvent}><Image width={20} height={20} src="/icons/add-icon.png"/>Nuevo evento</span>
      </div>
      {events.map((event) => (
        <div className={styles.evento_item}>
          <h3>{event.name_event}</h3>
          <span>{event.description}</span>
          <div className={styles.evento_item__details}>
            <div>
              <span><Image width={24} height={24} src="/icons/user-icon-gray.png" alt=""/>{event.start_date}</span>
              <span><Image width={24} height={24} src="/icons/pin-icon-gray.png" alt=""/> {event.location}</span>
              <span><Image width={24} height={24} src="/icons/calendar-icon-gray.png" alt=""/>{event.host_name}</span>
            </div>
            <Link className={styles.evento_item__button} href={`/eventos/${event.id}`}>
              Ver Evento
              <Image width={24} height={24} src="/icons/chevron-right-light.png" alt=""/>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
