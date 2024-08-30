import { useState } from 'react';
import styles from './EditLugarForm.module.scss';

const EditLugarForm = ({ lugar, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...lugar });

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
          <h1>Editar lugar</h1>
          <span className={styles.modaltittle__close} onClick={onClose}>&times;</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.form__input}>
            <span>Nombre</span>
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label className={styles.form__input}>
            <span>Dirección</span>
            <input name="address" value={formData.address} onChange={handleChange} />
          </label>
          <label className={styles.form__input}>
            <span>Referencia</span>
            <input name="reference" value={formData.reference} onChange={handleChange} />
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

export default EditLugarForm;
