"use client"

import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import ConfirmDeleteModal from '@/components/confirm/ConfirmDeleteModal';
import EditInvitadoForm from '@/components/invitados/EditInvitadoForm';
import AddInvitadoForm from '@/components/invitados/AddInvitadoForm';

export default function Invitados() {
  const [invitados, setInvitados] = useState([]);
  const [selectedInvitado, setSelectedInvitado] = useState(null);
  const [isAddInvitadoModalOpen, setIsAddInvitadoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCreateInvitado = () => {
    setIsAddInvitadoModalOpen(true);
  };

  const handleEditInvitado = (invitado) => {
    setSelectedInvitado(invitado);
    setIsEditModalOpen(true);
  };

  const handleDeleteInvitado = (invitado) => {
    setSelectedInvitado(invitado);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    fetch('/api/invitados')
      .then(response => response.json())
      .then(data => setInvitados(data))
      .catch(error => console.error('Error fetching invited:', error));
  }, []);

  const handleSaveInvitado = async (newInvitado) => {
    try {
      const response = await fetch(`/api/invitados/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newInvitado, contactado: parseInt(newInvitado.contactado, 10) })
      });
  
      if (!response.ok) {
        throw new Error('Error adding invitado');
      }
  
      const updatedData = await response.json();
      console.log('Invitado added successfully:', updatedData);
  
      console.log(newInvitado);
      setInvitados(prevInvitados => (
        [...prevInvitados, updatedData.invitado]
      ));
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
        body: JSON.stringify(updatedInvitado)
      });

      if (!response.ok) {
        throw new Error('Error updating guest');
      }

      const updatedData = await response.json();
      setInvitados(prevInvitados => 
        prevInvitados.map(invitado => 
          invitado.id === updatedInvitado.id ? updatedInvitado : invitado
        )
      );
      setIsEditModalOpen(false);
      setSelectedInvitado(null);
    } catch (error) {
      console.error('Error updating guest:', error);
    }
  };

  const handleConfirmDeleteInvitado = async () => {
    try {
      const response = await fetch(`/api/invitados/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: selectedInvitado.id })
      });

      if (!response.ok) {
        throw new Error('Error deleting guest');
      }

      setInvitados(prevInvitados => 
        prevInvitados.filter(invitado => invitado.id !== selectedInvitado.id)
      );
      setIsDeleteModalOpen(false);
      setSelectedInvitado(null);
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  return (
    <div className={styles.invitados}>
      <div className={styles.invitados__tittle}>
        <h1>Invitados</h1>
        <span onClick={handleCreateInvitado}><Image width={20} height={20} src="/icons/add-icon.png" alt=""/>Nuevo invitado</span>
      </div>
      {invitados.length > 0 ? (
        <table>
          <thead>
            <th>Invitado</th>
            <th>Teléfono</th>
            <th>Evento</th>
            <th>Contactado</th>
            <th><div></div></th>
          </thead>
          <tbody>
            {invitados.map((invitado) => (
              <tr key={invitado.id}>
                <td>{invitado.name} {invitado.last_name}</td>
                <td>{invitado.phone}</td>
                <td>{invitado.name_event}</td>
                <td>{invitado.contactado ? 'Sí' : 'No'}</td>
                <td><Image width={24} height={24} src="/icons/edit-icon-black.png" alt="" onClick={() => handleEditInvitado(invitado)}/>
                <Image width={24} height={24} src="/icons/delete-icon-black.png" alt="" onClick={() => handleDeleteInvitado(invitado)}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay invitados en este momento.</p>
      )}

      {isAddInvitadoModalOpen && (
        <AddInvitadoForm
          isOpen={isAddInvitadoModalOpen}
          onClose={() => setIsAddInvitadoModalOpen(false)}
          onSave={handleSaveInvitado}
          //   eventId={id}
        />
      )}

      {isEditModalOpen && (
        <EditInvitadoForm
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditInvitado}
          invitado={selectedInvitado}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDeleteInvitado}
        />
      )}
    </div>
  );
}
