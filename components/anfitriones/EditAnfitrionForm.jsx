import { useState } from 'react';
import styles from './EditAnfitrionForm.module.scss';

const EditAnfitrionForm = ({ anfitrion, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...anfitrion });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modaltittle}>
          <h1>Editar anfitrión</h1>
          <span className={styles.modaltittle__close} onClick={onClose}>&times;</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__doubleinput}>
          <label className={styles.form__input}>
            <span>Nombre</span>
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label className={styles.form__input}>
            <span>Apellido</span>
            <input name="last_name" value={formData.last_name} onChange={handleChange} />
          </label>
        </div>
          <label className={styles.form__input}>
            <span>Teléfono</span>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </label>
          <div className={styles.form__actions}>
            <button className={styles.form__buttoncancel} onClick={onClose}>Cancelar</button>
            <button className={styles.form__buttonsubmit} type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnfitrionForm;
