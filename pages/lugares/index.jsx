import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import Image from 'next/image';
import EditLugarForm from '@/components/lugares/EditLugarForm';
import AddLugarForm from '@/components/lugares/AddLugarForm';
import ConfirmDeleteModal from '@/components/confirm/ConfirmDeleteModal';

const LugaresPage = () => {
  const router = useRouter();
  const [lugares, setLugares] = useState([]);
  const [isAddLugarModalOpen, setIsAddLugarModalOpen] = useState(false);
  const [isEditLugarModalOpen, setIsEditLugarModalOpen] = useState(false);
  const [selectedLugar, setSelectedLugar] = useState(null);
  const [isDeleteLugarModalOpen, setIsDeleteLugarModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateLugar = () => {
    setIsAddLugarModalOpen(true);
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

  const fetchData = async () => {
    try {
      const response = await fetch('/api/lugares');
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setLugares(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSaveLugar = async (updatedLugar) => {
    try {
      const response = await fetch(`/api/lugares/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedLugar })
      });
  
      if (!response.ok) {
        throw new Error('Error adding lugar');
      }
  
      const updatedData = await response.json();
      console.log('Lugar added successfully:', updatedData);
  
      const {name_event} = updatedLugar

      setLugares(prevLugar => (
        [...prevLugar, {...updatedData.lugar, name_event}]
      ));
      setIsAddLugarModalOpen(false);
    } catch (error) {
      console.error('Error adding lugar:', error);
    }
  };

  const handleSaveEditLugar = async (updatedLugar) => {
    console.log(updatedLugar);
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

      setLugares(prevDetails =>
        prevDetails.map(lugar =>
          lugar.id === updatedLugar.id ? updatedLugar : lugar
        )
      );
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
  
      setLugares(prevLugares => 
        prevLugares.filter(org => org.id !== selectedLugar.id)
      );
      setIsDeleteLugarModalOpen(false);
      setSelectedLugar(null);
    } catch (error) {
      console.error('Error deleting lugar:', error);
    }
  };

  return (
    <div className={styles.lugares}>
      <div className={styles.lugares__tittle}>
        <h1>Lugares</h1>
        <span onClick={handleCreateLugar}><Image width={20} height={20} src="/icons/add-icon.png" alt=""/>Nuevo lugar</span>
      </div>
      {lugares.length > 0 ? (
        <table>
          <thead>
            <th>Lugar</th>
            <th>Dirección</th>
            <th>Referencia</th>
            <th>Evento</th>
            <th><div></div></th>
          </thead>
          <tbody>
            {lugares.map(lugar => (
              <tr key={lugar.id}>
                <td>{lugar.name}</td>
                <td>{lugar.address}</td>
                <td>{lugar.reference}</td>
                <td>{lugar.name_event}</td>
                <td><Image width={24} height={24} src="/icons/edit-icon-black.png" alt="" onClick={() => handleEditLugarClick(lugar)}/>
                <Image width={24} height={24} src="/icons/delete-icon-black.png" alt="" onClick={() => handleDeleteLugarClick(lugar)}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay programas en este momento.</p>
      )}

      {isAddLugarModalOpen && (
        <AddLugarForm
          isOpen={isAddLugarModalOpen}
          onClose={() => setIsAddLugarModalOpen(false)}
          onSave={handleSaveLugar}
          //   eventId={id}
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
};

export default LugaresPage;
