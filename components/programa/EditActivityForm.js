import { useState } from 'react';
import styles from './EditActivityForm.module.scss';

const EditActivityForm = ({ activity, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...activity });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modaltittle}>
          <h1>Editar actividad</h1>
          <span className={styles.modaltittle__close} onClick={onClose}>&times;</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.form__input}>
            Descripción:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label className={styles.form__input}>
            Fecha:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <div className={styles.form__doubleinput}>
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
              Hora de fin:
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
};

export default EditActivityForm;
