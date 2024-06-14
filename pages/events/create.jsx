// create.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "./create.module.css";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    name_event: '',
    description: '',
    dress_code: '',
    occasion: '',
    start_time: '',
    end_time: '',
    start_date: '',
    end_date: '',
    organizador_id: '',
    anfitrion_id: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push('/events');
      } else {
        console.error('Error creating event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className={styles.createeventsection}>
      <h1>Crear Evento</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name_event">Nombre del Evento:</label>
          <input type="text" id="name_event" name="name_event" value={formData.name_event} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="dress_code">Código de Vestimenta:</label>
          <input type="text" id="dress_code" name="dress_code" value={formData.dress_code} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="occasion">Ocasión:</label>
          <input type="text" id="occasion" name="occasion" value={formData.occasion} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="start_time">Hora de Inicio:</label>
          <input type="time" id="start_time" name="start_time" value={formData.start_time} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="end_time">Hora de Fin:</label>
          <input type="time" id="end_time" name="end_time" value={formData.end_time} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="start_date">Fecha de Inicio:</label>
          <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="end_date">Fecha de Fin:</label>
          <input type="date" id="end_date" name="end_date" value={formData.end_date} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="organizador_id">ID del Organizador:</label>
          <input type="number" id="organizador_id" name="organizador_id" value={formData.organizador_id} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="anfitrion_id">ID del Anfitrión:</label>
          <input type="number" id="anfitrion_id" name="anfitrion_id" value={formData.anfitrion_id} onChange={handleChange} required />
        </div>
        <button type="submit">Crear Evento</button>
      </form>
    </div>
  );
}
