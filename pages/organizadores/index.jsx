import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import Image from 'next/image';
import EditOrganizerForm from '@/components/organizadores/EditOrganizerForm';
import ConfirmDeleteModal from '@/components/confirm/ConfirmDeleteModal';

const OrganizadoresPage = () => {
  const router = useRouter();
  const [organizadores, setOrganizadores] = useState([]);
  const [isEditOrganizerModalOpen, setIsEditOrganizerModalOpen] = useState(false);
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [isDeleteOrganizerModalOpen, setIsDeleteOrganizerModalOpen] = useState(false);

  useEffect(() => {
    fetchData(); // Función para obtener datos
  }, []);

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

  const fetchData = async () => {
    try {
      const response = await fetch('/api/organizadores');
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setOrganizadores(data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

      setOrganizadores(prevDetails =>
        prevDetails.map(organizer =>
          organizer.id === updatedOrganizer.id ? updatedOrganizer : organizer
        )
      );
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
  
      setOrganizadores(prevOrganizadores =>
        prevOrganizadores.filter(org => org.id !== selectedOrganizer.id)
      );
      setIsDeleteOrganizerModalOpen(false);
      setSelectedOrganizer(null);
    } catch (error) {
      console.error('Error deleting organizer:', error);
    }
  };

  return (
    <div className={styles.organizadores}>
      <div className={styles.organizadores__tittle}>
        <h1>Organizadores</h1>
        <span><Image width={20} height={20} src="/icons/add-icon.png" alt=""/>Nuevo organizador</span>
      </div>
      {organizadores.length > 0 ? (
        <table>
          <thead>
            <th>Organizador</th>
            <th>Teléfono</th>
            <th>Evento</th>
            <th><div></div></th>
          </thead>
        <tbody>
          {organizadores.map(organizador => (
            <tr key={organizador.id}>
              <td>{organizador.name} {organizador.last_name}</td>
              <td>{organizador.phone}</td>
              <td>{organizador.name_event}</td>
              <td><Image width={24} height={24} src="/icons/edit-icon-black.png" alt="" onClick={() => handleEditOrganizerClick(organizador)}/>
              <Image width={24} height={24} src="/icons/delete-icon-black.png" alt="" onClick={() => handleDeleteOrganizerClick(organizador)}/></td>
            </tr>
          ))}
        </tbody>
        </table>
      ) : (
        <p>No hay programas en este momento.</p>
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
    </div>
  );
};

export default OrganizadoresPage;
