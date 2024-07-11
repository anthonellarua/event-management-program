import { useState } from 'react';
import styles from './EditEventForm.module.scss';

export default function EditEventForm({ event, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name_event: event.name_event,
    description: event.description,
    dress_code: event.dress_code,
    occasion: event.occasion,
    start_date: event.start_date,  // Asumiendo que start_date ya está en el formato YYYY-MM-DD
    end_date: event.end_date,  // Asumiendo que end_date ya está en el formato YYYY-MM-DD
    start_time: event.start_time,  // Asumiendo que start_time ya está en el formato HH:MM
    end_time: event.end_time  // Asumiendo que end_time ya está en el formato HH:MM
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2>Editar datos del evento</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.form__input}>
            Nombre del Evento:
            <input
              type="text"
              name="name_event"
              value={formData.name_event}
              onChange={handleChange}
            />
          </label>
          <label className={styles.form__input}>
            Descripción:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label className={styles.form__input}>
            Dress Code:
            <input
              type="text"
              name="dress_code"
              value={formData.dress_code}
              onChange={handleChange}
            />
          </label>
          <label className={styles.form__input}>
            Ocasión:
            <input
              type="text"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
            />
          </label>
          <label className={styles.form__input}>
            Fecha de inicio:
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </label>
          <label className={styles.form__input}>
            Fecha de finalización:
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
          </label>
          <label className={styles.form__input}>
            Hora de inicio:
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
            />
          </label>
          <label className={styles.form__input}>
            Hora de finalización:
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
            />
          </label>
          <button className={styles.form__button} type="submit">Guardar cambios</button>
        </form>
      </div>
    </div>
  );
}
