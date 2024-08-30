import { useState } from 'react';
import styles from './EditEventForm.module.scss';

export default function EditEventForm({ event, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name_event: event.name_event,
    description: event.description,
    dress_code: event.dress_code,
    occasion: event.occasion,
    start_date: event.start_date,
    end_date: event.end_date,
    start_time: event.start_time,
    end_time: event.end_time 
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
        <div className={styles.modaltittle}>
          <h1>Editar datos</h1>
          <span className={styles.modaltittle__close} onClick={onClose}>&times;</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.form__input}>
            <span>Nombre del Evento</span>
            <input
              type="text"
              name="name_event"
              value={formData.name_event}
              onChange={handleChange}
            />
          </label>
          <label className={styles.form__input}>
            <span>Descripción</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label className={styles.form__input}>
            <span>Dress Code</span>
            <input
              type="text"
              name="dress_code"
              value={formData.dress_code}
              onChange={handleChange}
            />
          </label>
          <label className={styles.form__input}>
            <span>Ocasión</span>
            <input
              type="text"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
            />
          </label>
          <div className={styles.form__doubleinput}>
            <label className={styles.form__input}>
              <span>Fecha de inicio</span>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
            </label>
            <label className={styles.form__input}>
              <span>Fecha de finalización</span>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className={styles.form__doubleinput}>
            <label className={styles.form__input}>
              <span>Hora de inicio</span>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
              />
            </label>
            <label className={styles.form__input}>
              <span>Hora de finalización</span>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className={styles.form__actions}>
            <button className={styles.form__buttoncancel} onClick={onClose}>Cancelar</button>
            <button className={styles.form__buttonsubmit} type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
