import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from "./event.module.scss";
import Image from 'next/image';
import EditEventForm from '../../components/eventos/EditEventForm';
import AddActivityForm from '../../components/programa/AddActivityForm';
import AddInvitadoForm from '../../components/invitados/AddInvitadoForm';
import EditActivityForm from '@/components/programa/EditActivityForm';
import ConfirmDeleteModal from '@/components/confirm/ConfirmDeleteModal';
import EditInvitadoForm from '@/components/invitados/EditInvitadoForm';
import EditOrganizerForm from '@/components/organizadores/EditOrganizerForm';
import EditAnfitrionForm from '@/components/anfitriones/EditAnfitrionForm';
import EditLugarForm from '@/components/lugares/EditLugarForm';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [eventDetails, setEventDetails] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);
  const [isEditActivityModalOpen, setIsEditActivityModalOpen] = useState(false);
  const [isDeleteActivityModalOpen, setIsDeleteActivityModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isAddInvitadoModalOpen, setIsAddInvitadoModalOpen] = useState(false);
  const [isEditInvitadoModalOpen, setIsEditInvitadoModalOpen] = useState(false);
  const [isDeleteInvitadoModalOpen, setIsDeleteInvitadoModalOpen] = useState(false);
  const [selectedInvitado, setSelectedInvitado] = useState(null);
  const [isEditOrganizerModalOpen, setIsEditOrganizerModalOpen] = useState(false);
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [isDeleteOrganizerModalOpen, setIsDeleteOrganizerModalOpen] = useState(false);
  const [isEditAnfitrionModalOpen, setIsEditAnfitrionModalOpen] = useState(false);
  const [selectedAnfitrion, setSelectedAnfitrion] = useState(null);
  const [isDeleteAnfitrionModalOpen, setIsDeleteAnfitrionModalOpen] = useState(false);
  const [isEditLugarModalOpen, setIsEditLugarModalOpen] = useState(false);
  const [selectedLugar, setSelectedLugar] = useState(null);
  const [isDeleteLugarModalOpen, setIsDeleteLugarModalOpen] = useState(false);

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

  const handleEditActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsEditActivityModalOpen(true);
  };

  const handleCloseEditActivityModal = () => {
    setIsEditActivityModalOpen(false);
    setSelectedActivity(null);
  };

  const handleDeleteActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDeleteActivityModalOpen(true);
  };

  const handleCloseDeleteActivityModal = () => {
    setIsDeleteActivityModalOpen(false);
    setSelectedActivity(null);
  };

  const handleAddInvitadoClick = () => {
    setIsAddInvitadoModalOpen(true);
  };

  const handleCloseInvitadoModal = () => {
    setIsAddInvitadoModalOpen(false);
  };

  const handleEditInvitadoClick = (invitado) => {
    setSelectedInvitado(invitado);
    setIsEditInvitadoModalOpen(true);
  };

  const handleCloseEditInvitadoModal = () => {
    setIsEditInvitadoModalOpen(false);
    setSelectedInvitado(null);
  };

  const handleDeleteInvitadoClick = (invitado) => {
    setSelectedInvitado(invitado);
    setIsDeleteInvitadoModalOpen(true);
  };

  const handleCloseDeleteInvitadoModal = () => {
    setIsDeleteInvitadoModalOpen(false);
    setSelectedInvitado(null);
  };

  const handleEditOrganizerClick = (organizer) => {
    setSelectedOrganizer(organizer);
    setIsEditOrganizerModalOpen(true);
  };

  const handleDeleteOrganizerClick = (organizer) => {
    setSelectedOrganizer(organizer);
    setIsDeleteOrganizerModalOpen(true);
  };

  const handleCloseEditOrganizerModal = () => {
    setIsEditOrganizerModalOpen(false);
    setSelectedOrganizer(null);
  };

  const handleEditAnfitrionClick = (anfitrion) => {
    setSelectedAnfitrion(anfitrion);
    setIsEditAnfitrionModalOpen(true);
  };

  const handleCloseEditAnfitrionModal = () => {
    setIsEditAnfitrionModalOpen(false);
    setSelectedAnfitrion(null);
  };

  const handleDeleteAnfitrionClick = (anfitrion) => {
    setSelectedAnfitrion(anfitrion);
    setIsDeleteAnfitrionModalOpen(true);
  };

  const handleCloseDeleteAnfitrionModal = () => {
    setIsDeleteAnfitrionModalOpen(false);
    setSelectedAnfitrion(null);
  };

  const handleEditLugarClick = (lugar) => {
    setSelectedLugar(lugar);
    setIsEditLugarModalOpen(true);
  };

  const handleCloseEditLugarModal = () => {
    setIsEditLugarModalOpen(false);
    setSelectedLugar(null);
  };

  const handleDeleteLugarClick = (lugar) => {
    setSelectedLugar(lugar);
    setIsDeleteLugarModalOpen(true);
  };

  const handleCloseDeleteLugarModal = () => {
    setIsDeleteLugarModalOpen(false);
    setSelectedLugar(null);
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

  const handleSaveEditActivity = async (updatedActivity) => {
    try {
      const response = await fetch(`/api/programa/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedActivity, event_id: id })
      });

      if (!response.ok) {
        throw new Error('Error updating activity');
      }

      const updatedData = await response.json();
      console.log('Activity updated successfully:', updatedData);

      setEventDetails(prevDetails => ({
        ...prevDetails,
        program: prevDetails.program.map(activity => 
          activity.id === updatedActivity.id ? updatedActivity : activity
        )
      }));
      setIsEditActivityModalOpen(false);
      setSelectedActivity(null);
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const handleDeleteActivity = async () => {
    try {
      const response = await fetch(`/api/programa/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: selectedActivity.id })
      });

      if (!response.ok) {
        throw new Error('Error deleting activity');
      }

      const updatedData = await response.json();
      console.log('Activity deleted successfully:', updatedData);

      setEventDetails(prevDetails => ({
        ...prevDetails,
        program: prevDetails.program.filter(activity => activity.id !== selectedActivity.id)
      }));
      setIsDeleteActivityModalOpen(false);
      setSelectedActivity(null);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleSaveInvitado = async (newInvitado) => {
    try {
      const response = await fetch(`/api/invitados/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newInvitado, evento_id: id, contactado: parseInt(newInvitado.contactado, 10) })
      });
  
      if (!response.ok) {
        throw new Error('Error adding invitado');
      }
  
      const updatedData = await response.json();
      console.log('Invitado added successfully:', updatedData);
  
      setEventDetails(prevDetails => ({
        ...prevDetails,
        invited: [...prevDetails.invited, updatedData.invitado]
      }));
      setIsAddInvitadoModalOpen(false);
    } catch (error) {
      console.error('Error adding invitado:', error);
    }
  };
  

  const handleSaveEditInvitado = async (updatedInvitado) => {
    try {
      const response = await fetch(`/api/invitados/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedInvitado })
      });

      if (!response.ok) {
        throw new Error('Error updating invitado');
      }

      const updatedData = await response.json();
      console.log('Invitado updated successfully:', updatedData);

      setEventDetails(prevDetails => ({
        ...prevDetails,
        invited: prevDetails.invited.map(invite => 
          invite.id === updatedInvitado.id ? updatedInvitado : invite
        )
      }));
      setIsEditInvitadoModalOpen(false);
      setSelectedInvitado(null);
    } catch (error) {
      console.error('Error updating invitado:', error);
    }
  };

  const handleDeleteInvitado = async () => {
    try {
      const response = await fetch(`/api/invitados/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: selectedInvitado.id })
      });

      if (!response.ok) {
        throw new Error('Error deleting invitado');
      }

      const updatedData = await response.json();
      console.log('Invitado deleted successfully:', updatedData);

      setEventDetails(prevDetails => ({
        ...prevDetails,
        invited: prevDetails.invited.filter(invite => invite.id !== selectedInvitado.id)
      }));
      setIsDeleteInvitadoModalOpen(false);
      setSelectedInvitado(null);
    } catch (error) {
      console.error('Error deleting invitado:', error);
    }
  };

  const handleSaveEditOrganizer = async (updatedOrganizer) => {
    try {
      const response = await fetch(`/api/organizadores/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedOrganizer)
      });

      if (!response.ok) {
        throw new Error('Error updating organizer');
      }

      const updatedData = await response.json();
      console.log('Organizer updated successfully:', updatedData);

      setEventDetails(prevDetails => ({
        ...prevDetails,
        organizadores: prevDetails.organizadores.map(organizer =>
          organizer.id === updatedOrganizer.id ? updatedOrganizer : organizer
        )
      }));
      setIsEditOrganizerModalOpen(false);
      setSelectedOrganizer(null);
    } catch (error) {
      console.error('Error updating organizer:', error);
    }
  };

  const handleDeleteOrganizer = async () => {
    try {
      const response = await fetch(`/api/organizadores/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: selectedOrganizer.id })
      });
  
      if (!response.ok) {
        throw new Error('Error deleting organizer');
      }
  
      const updatedData = await response.json();
      console.log('Organizer deleted successfully:', updatedData);
  
      setEventDetails(prevDetails => ({
        ...prevDetails,
        organizadores: prevDetails.organizadores.filter(org => org.id !== selectedOrganizer.id)
      }));
      setIsDeleteOrganizerModalOpen(false);
      setSelectedOrganizer(null);
    } catch (error) {
      console.error('Error deleting organizer:', error);
    }
  };

  const handleSaveEditAnfitrion = async (updatedAnfitrion) => { 
    try {
      const response = await fetch(`/api/anfitriones/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedAnfitrion })
      });

      if (!response.ok) {
        throw new Error('Error updating anfitrion');
      }

      const updatedData = await response.json();
      console.log('Anfitrion updated successfully:', updatedData);

      setEventDetails(prevDetails => ({
        ...prevDetails,
        anfitriones: prevDetails.anfitriones.map(anfitrion =>
          anfitrion.id === updatedAnfitrion.id ? updatedAnfitrion : anfitrion
        )
      }));
      setIsEditAnfitrionModalOpen(false);
      setSelectedAnfitrion(null);
    } catch (error) {
      console.error('Error updating anfitrion:', error);
    }
  };

  const handleDeleteAnfitrion = async () => {
    try {
      const response = await fetch(`/api/anfitriones/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: selectedAnfitrion.id })
      });
  
      if (!response.ok) {
        throw new Error('Error deleting anfitrion');
      }
  
      const updatedData = await response.json();
      console.log('Anfitrion deleted successfully:', updatedData);
  
      setEventDetails(prevDetails => ({
        ...prevDetails,
        organizadores: prevDetails.organizadores.filter(org => org.id !== selectedAnfitrion.id)
      }));
      setIsDeleteAnfitrionModalOpen(false);
      setSelectedAnfitrion(null);
    } catch (error) {
      console.error('Error deleting anfitrion:', error);
    }
  };

  const handleSaveEditLugar = async (updatedLugar) => {
    try {
      const response = await fetch(`/api/lugares/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedLugar })
      });

      if (!response.ok) {
        throw new Error('Error updating lugar');
      }

      const updatedData = await response.json();
      console.log('Lugar updated successfully:', updatedData);

      setEventDetails(prevDetails => ({
        ...prevDetails,
        lugares: prevDetails.lugares.map(lugar =>
          lugar.id === updatedLugar.id ? updatedLugar : lugar
        )
      }));
      setIsEditLugarModalOpen(false);
      setSelectedLugar(null);
    } catch (error) {
      console.error('Error updating lugar:', error);
    }
  };

  const handleDeleteLugar = async () => {
    try {
      const response = await fetch(`/api/lugares/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: selectedLugar.id })
      });
  
      if (!response.ok) {
        throw new Error('Error deleting lugar');
      }
  
      const updatedData = await response.json();
      console.log('Lugar deleted successfully:', updatedData);
  
      setEventDetails(prevDetails => ({
        ...prevDetails,
        organizadores: prevDetails.organizadores.filter(org => org.id !== selectedLugar.id)
      }));
      setIsDeleteLugarModalOpen(false);
      setSelectedLugar(null);
    } catch (error) {
      console.error('Error deleting lugar:', error);
    }
  };

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  const { event, invited = [], program = [], organizadores = [], anfitriones = [], lugares = []} = eventDetails;

  return (
    <div className={styles.event}>
      <h1>{event.name_event}</h1>
      <div className={styles.people}>
        <div>
          <Image width={24} height={24} src="/icons/user-icon-black.png" alt="" />
          <div>
            <span>Organizador</span><span>añadir</span>
            {organizadores.length > 0 ? (
              organizadores.map((organizer, index) => (
                <span key={index}>
                  {organizer.name}
                  <Image width={24} height={24} src="/icons/edit-icon-black.png" alt="" onClick={() => handleEditOrganizerClick(organizer)}/>
                  <Image width={24} height={24} src="/icons/delete-icon-black.png" alt="" onClick={() => handleDeleteOrganizerClick(organizer)}/>
                </span>
              ))
            ) : (
              <p>No hay organizadores para este evento.</p>
            )}
          </div>
          
        </div>
        <div>
          <Image width={24} height={24} src="/icons/user-icon-black.png" alt="" />
          <div>
            <span>Anfitrión</span><span>añadir</span>
            {anfitriones.length > 0 ? (
              anfitriones.map((anfitrion, index) => (
                <span key={index}>
                  {anfitrion.name}
                  <Image width={24} height={24} src="/icons/edit-icon-black.png" alt="" onClick={() => handleEditAnfitrionClick(anfitrion)}/>
                  <Image width={24} height={24} src="/icons/delete-icon-black.png" alt="" onClick={() => handleDeleteAnfitrionClick(anfitrion)}/>
                </span>
              ))
            ) : (
              <p>No hay anfitriones para este evento.</p>
            )}
          </div>
          
        </div>
        <div>
          <Image width={24} height={24} src="/icons/user-icon-black.png" alt="" />
          <div>
            <span>Lugar</span><span>añadir</span>
            {lugares.length > 0 ? (
              lugares.map((lugar, index) => (
                <span key={index}>
                  {lugar.name}
                  <Image width={24} height={24} src="/icons/edit-icon-black.png" alt="" onClick={() => handleEditLugarClick(lugar)}/>
                  <Image width={24} height={24} src="/icons/delete-icon-black.png" alt="" onClick={() => handleDeleteLugarClick(lugar)}/>
                </span>
              ))
            ) : (
              <p>No hay lugares para este evento.</p>
            )}
          </div>
          
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
                  <span className={styles.programa__item__date}>{item.date}</span>
                  <span className={styles.programa__item__date}>{item.start_time} - {item.end_time}</span>
                  <span>{item.description}</span>
                </div>
                <div>
                  <Image width={24} height={24} src="/icons/edit-icon-black.png" alt="" onClick={() => handleEditActivityClick(item)} />
                  <Image width={24} height={24} src="/icons/delete-icon-black.png" alt="" onClick={() => handleDeleteActivityClick(item)} />
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
          <span className={styles.buttonadd} onClick={handleAddInvitadoClick}><Image width={20} height={20} src="/icons/add-icon.png" alt="" />Agregar invitado</span>
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
                  <Image width={24} height={24} src="/icons/edit-icon-black.png" alt="" onClick={() => handleEditInvitadoClick(invite)} />
                  <Image width={24} height={24} src="/icons/delete-icon-black.png" alt="" onClick={() => handleDeleteInvitadoClick(invite)} />
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

      {isEditActivityModalOpen && (
        <EditActivityForm
          activity={selectedActivity}
          onClose={handleCloseEditActivityModal}
          onSave={handleSaveEditActivity}
        />
      )}

      {isDeleteActivityModalOpen && (
        <ConfirmDeleteModal
          onClose={handleCloseDeleteActivityModal}
          onConfirm={handleDeleteActivity}
          item="actividad"
        />
      )}

      {isAddInvitadoModalOpen && (
        <AddInvitadoForm
          eventId={id}
          onClose={handleCloseInvitadoModal}
          onSave={handleSaveInvitado}
        />
      )}

      {isEditInvitadoModalOpen && (
        <EditInvitadoForm
          invitado={selectedInvitado}
          onClose={handleCloseEditInvitadoModal}
          onSave={handleSaveEditInvitado}
        />
      )}

      {isDeleteInvitadoModalOpen && (
        <ConfirmDeleteModal
          onClose={handleCloseDeleteInvitadoModal}
          onConfirm={handleDeleteInvitado}
          item="invitado"
        />
      )}

      {isEditOrganizerModalOpen && (
        <EditOrganizerForm
          organizer={selectedOrganizer}
          onClose={handleCloseEditOrganizerModal}
          onSave={handleSaveEditOrganizer}
        />
      )}

      {isDeleteOrganizerModalOpen && (
        <ConfirmDeleteModal
          onClose={() => setIsDeleteOrganizerModalOpen(false)}
          onConfirm={handleDeleteOrganizer}
          item="organizador"
        />
      )}

      {isEditAnfitrionModalOpen && (
        <EditAnfitrionForm
          anfitrion={selectedAnfitrion}
          onClose={handleCloseEditAnfitrionModal}
          onSave={handleSaveEditAnfitrion}
        />
      )}

      {isDeleteAnfitrionModalOpen && (
        <ConfirmDeleteModal
          onClose={() => setIsDeleteAnfitrionModalOpen(false)}
          onConfirm={handleDeleteAnfitrion}
          item="anfitrion"
        />
      )}

      {isEditLugarModalOpen && (
        <EditLugarForm
          lugar={selectedLugar}
          onClose={handleCloseEditLugarModal}
          onSave={handleSaveEditLugar}
        />
      )}

      {isDeleteLugarModalOpen && (
        <ConfirmDeleteModal
          onClose={() => setIsDeleteLugarModalOpen(false)}
          onConfirm={handleDeleteLugar}
          item="lugar"
        />
      )}
    </div>
  );
}

function isValidDate(dateString) {
  const dateObj = new Date(dateString);
  return !isNaN(dateObj.getTime());
}
