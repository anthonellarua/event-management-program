import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from "./event.module.scss";
import Image from 'next/image';
import EditEventForm from '../../components/eventos/EditEventForm';
import AddActivityForm from '../../components/programa/AddActivityForm';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [eventDetails, setEventDetails] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/eventos/${id}`)
        .then(response => response.json())
        .then(data => setEventDetails(data))
        .catch(error => console.error('Error fetching event:', error));
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddActivityClick = () => {
    setIsAddActivityModalOpen(true);
  };

  const handleCloseActivityModal = () => {
    setIsAddActivityModalOpen(false);
  };

  const handleSaveChanges = async (updatedEvent) => {
    try {
      const response = await fetch(`/api/eventos/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedEvent, id })
      });

      if (!response.ok) {
        throw new Error('Error updating event');
      }

      const updatedData = await response.json();
      console.log('Event updated successfully:', updatedData);

      setEventDetails(prevDetails => ({
        ...prevDetails,
        event: { ...prevDetails.event, ...updatedEvent }
      }));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleSaveActivity = async (newActivity) => {
    try {
      const response = await fetch(`/api/programa/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newActivity, event_id: id })
      });

      if (!response.ok) {
        throw new Error('Error adding activity');
      }

      const updatedData = await response.json();
      console.log('Activity added successfully:', updatedData);

      setEventDetails(prevDetails => ({
        ...prevDetails,
        program: [...prevDetails.program, updatedData.activity]
      }));
      setIsAddActivityModalOpen(false);
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  const { event, invited = [], program = [], organizadores = [], anfitriones = [] } = eventDetails;

  return (
    <div className={styles.event}>
      <h1>{event.name_event}</h1>
      <div className={styles.people}>
        <div>
          <Image width={24} height={24} src="/icons/user-icon-black.png" alt="" />
          <div>
            <span>Organizador</span>
            {organizadores.length > 0 ? (
              organizadores.map((organizer, index) => (
                <span key={index}>
                  {organizer.name}
                </span>
              ))
            ) : (
              <p>No hay organizadores para este evento.</p>
            )}
          </div>
          <Image width={24} height={24} src="/icons/chevron-right-black.png" alt="" />
        </div>
        <div>
          <Image width={24} height={24} src="/icons/user-icon-black.png" alt="" />
          <div>
            <span>Anfitrión</span>
            {anfitriones.length > 0 ? (
              anfitriones.map((anfitrion, index) => (
                <span key={index}>
                  {anfitrion.name}
                </span>
              ))
            ) : (
              <p>No hay anfitriones para este evento.</p>
            )}
          </div>
          <Image width={24} height={24} src="/icons/chevron-right-black.png" alt="" />
        </div>
      </div>

      <div className={styles.datos}>
        <div className={styles.datos__title}>
          <h2>Datos generales</h2>
          <span className={styles.buttonadd} onClick={handleEditClick}><Image width={20} height={20} src="/icons/edit-icon-white.png" alt="" />Editar datos</span>
        </div>
        <div className={styles.datos__content}>
          <p>{event.description}</p>
          <div className={styles.datos__data}>
            <div>
              <p className={styles.datos__data__item}><span>Dress code</span> <span>{event.dress_code}</span></p>
              <p className={styles.datos__data__item}><span>Ocasión</span> <span>{event.occasion}</span></p>
            </div>
            <div className={styles.datos__data__item}><span>Hora</span> <span>{event.start_time} - {event.end_time}</span></div>
            <div className={styles.datos__data__item}><span>Fecha</span> <span>{event.start_date} - {event.end_date}</span></div>
          </div>
        </div>
      </div>

      <div className={styles.programa}>
        <div className={styles.programa__title}>
          <h2>Programa</h2>
          <span className={styles.buttonadd} onClick={handleAddActivityClick}><Image width={20} height={20} src="/icons/add-icon.png" alt="" />Agregar actividad</span>
        </div>
        {program.length > 0 ? (
          <div className={styles.programa__content}>
            {program.map((item, index) => (
              <div key={index} className={styles.programa__item}>
                <div>
                  <span className={styles.programa__item__date}>{new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className={styles.programa__item__date}>{item.start_time} - {item.end_time}</span>
                  <span>{item.description}</span>
                </div>
                <div>
                  <Image width={24} height={24} src="/icons/edit-icon-black.png" alt="" />
                  <Image width={24} height={24} src="/icons/delete-icon-black.png" alt="" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay programa para este evento.</p>
        )}
      </div>

      <div className={styles.invitados}>
        <div className={styles.invitados__title}>
          <h2>Invitados</h2>
          <span className={styles.buttonadd}><Image width={20} height={20} src="/icons/add-icon.png" alt="" />Agregar invitado</span>
        </div>
        {invited.length > 0 ? (
          <div className={styles.invitados__content}>
            {invited.map((invite, index) => (
              <div key={index} className={styles.invitados__item}>
                <Image width={52} height={52} src="/avatar-invited.png" alt="" />
                <div>
                  {invite.name} {invite.last_name}
                </div>
                <div>
                  {invite.phone}
                </div>
                <div>
                  {invite.contactado === 0 ? (
                    <span className={styles.invitados__buttoncontactar}>Contactar</span>
                  ) : (
                    <span className={styles.invitados__buttoncontactado}>Contactado</span>
                  )}
                </div>
                <div className={styles.invitados__actions}>
                  <Image width={24} height={24} src="/icons/edit-icon-black.png" alt="" />
                  <Image width={24} height={24} src="/icons/delete-icon-black.png" alt="" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay invitados para este evento.</p>
        )}
      </div>

      {isEditModalOpen && (
        <EditEventForm
          event={event}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
        />
      )}

      {isAddActivityModalOpen && (
        <AddActivityForm
          onClose={handleCloseActivityModal}
          onSave={handleSaveActivity}
        />
      )}
    </div>
  );
}
