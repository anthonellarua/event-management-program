import { useState } from 'react';

export default function InvitadoCreateForm({ eventoId, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    phone: '',
    evento_id: eventoId || '',
    contactado: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/invitados/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newInvitado = await response.json();
        onSave(newInvitado);
      } else {
        console.error('Error creating invitado');
      }
    } catch (error) {
      console.error('Error creating invitado:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="last_name">Apellido:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Teléfono:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="contactado">Contactado:</label>
        <input
          type="checkbox"
          id="contactado"
          name="contactado"
          checked={formData.contactado}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Agregar Invitado</button>
    </form>
  );
}
