import { useState } from 'react';
import styles from './AddActivityForm.module.scss';

export default function AddActivityForm({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    end_time: '',
    description: ''
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
        <h2>Agregar Actividad</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.form__input}>
            Fecha:
            <input
              type="date"
              name="date"
              value={formData.date}
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
          <label className={styles.form__input}>
            Descripción:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <button className={styles.form__button} type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
}
