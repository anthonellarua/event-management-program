// create.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "./create.module.scss";

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
      const response = await fetch('/api/eventos/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push('/eventos');
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
      <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.form__input} htmlFor="name_event">
            <span>Nombre del Evento</span>
            <input type="text" id="name_event" name="name_event" value={formData.name_event} onChange={handleChange} required />
          </label>

          <label className={styles.form__input} htmlFor="description">
            <span>Descripción</span>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
          </label>
          <div className={styles.form__doubleinput}>
            <label className={styles.form__input} htmlFor="dress_code">
              <span>Código de Vestimenta</span>
              <input type="text" id="dress_code" name="dress_code" value={formData.dress_code} onChange={handleChange} required />
            </label>

            <label className={styles.form__input} htmlFor="occasion">
              <span>Ocasión</span>
              <input type="text" id="occasion" name="occasion" value={formData.occasion} onChange={handleChange} required />
            </label>
          </div>
          <div className={styles.form__doubleinput}>
            <label className={styles.form__input} htmlFor="start_time">
              <span>Hora de Inicio</span>
              <input type="time" id="start_time" name="start_time" value={formData.start_time} onChange={handleChange} required />
            </label>

            <label className={styles.form__input} htmlFor="end_time">
              <span>Hora de Fin</span>
              <input type="time" id="end_time" name="end_time" value={formData.end_time} onChange={handleChange} required />
            </label>
          </div>
          <div className={styles.form__doubleinput}>
            <label className={styles.form__input} htmlFor="start_date">
              <span>Fecha de Inicio</span>
              <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} required />
            </label>

            <label className={styles.form__input} htmlFor="end_date">
              <span>Fecha de Fin</span>
              <input type="date" id="end_date" name="end_date" value={formData.end_date} onChange={handleChange} required />
            </label>
          </div>
          <div className={styles.form__actions}>
            <button className={styles.form__buttonsubmit} type="submit">Guardar</button>
          </div>
      </form>
    </div>
  );
}
