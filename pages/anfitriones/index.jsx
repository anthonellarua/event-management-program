import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import Image from 'next/image';
import EditAnfitrionForm from '@/components/anfitriones/EditAnfitrionForm';
import ConfirmDeleteModal from '@/components/confirm/ConfirmDeleteModal';

const AnfitrionesPage = () => {
  const router = useRouter();
  const [anfitriones, setAnfitriones] = useState([]);
  const [isEditAnfitrionModalOpen, setIsEditAnfitrionModalOpen] = useState(false);
  const [selectedAnfitrion, setSelectedAnfitrion] = useState(null);
  const [isDeleteAnfitrionModalOpen, setIsDeleteAnfitrionModalOpen] = useState(false);

  useEffect(() => {
    fetchData(); // Función para obtener datos
  }, []);

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

  const fetchData = async () => {
    try {
      const response = await fetch('/api/anfitriones');
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setAnfitriones(data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

      setAnfitriones(prevDetails =>
        prevDetails.map(anfitrion =>
          anfitrion.id === updatedAnfitrion.id ? updatedAnfitrion : anfitrion
        )
      );
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
  
      setAnfitriones(prevAnfitriones => 
        prevAnfitriones.filter(anfitrion => anfitrion.id !== selectedAnfitrion.id)
      );
      setIsDeleteAnfitrionModalOpen(false);
      setSelectedAnfitrion(null);
    } catch (error) {
      console.error('Error deleting anfitrion:', error);
    }
  };

  return (
    <div className={styles.anfitriones}>
      <div className={styles.anfitriones__tittle}>
        <h1>Anfitriones</h1>
        <span><Image width={20} height={20} src="/icons/add-icon.png"/>Nuevo anfitrion</span>
      </div>
      {anfitriones.length > 0 ? (
        <table>
          <thead>
            <th>Anfitrión</th>
            <th>Teléfono</th>
            <th>Evento</th>
            <th><div></div></th>
          </thead>
          <tbody>
            {anfitriones.map(anfitrion => (
              <tr key={anfitrion.id}>
                <td>{anfitrion.name} {anfitrion.last_name}</td>
                <td>{anfitrion.phone}</td>
                <td>{anfitrion.event_id}</td>
                <td><Image width={24} height={24} src="/icons/edit-icon-black.png" alt="" onClick={() => handleEditAnfitrionClick(anfitrion)}/>
                <Image width={24} height={24} src="/icons/delete-icon-black.png" alt="" onClick={() => handleDeleteAnfitrionClick(anfitrion)}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay invitados en este momento.</p>
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

    </div>
  );
};

export default AnfitrionesPage;
