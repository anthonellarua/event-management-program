import { useState } from 'react';
import styles from './EditInvitadoForm.module.scss';

export default function EditInvitadoForm({ invitado, onClose, onSave }) {
  const [name, setName] = useState(invitado.name);
  const [lastName, setLastName] = useState(invitado.last_name);
  const [phone, setPhone] = useState(invitado.phone);
  const [contactado, setContactado] = useState(invitado.contactado.toString());

  const handleSave = () => {
    onSave({ ...invitado, name, last_name: lastName, phone, contactado: parseInt(contactado, 10) });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modaltittle}>
          <h1>Editar invitado</h1>
          <span className={styles.modaltittle__close} onClick={onClose}>&times;</span>
        </div>
        <form className={styles.form} onSubmit={handleSave}>
          <div className={styles.form__doubleinput}>
            <label className={styles.form__input}>
              <span>Nombre</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className={styles.form__input}>
              <span>Apellido</span>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
          </div>
          <div className={styles.form__doubleinput}>
            <label className={styles.form__input}>
              <span>Teléfono</span>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label className={styles.form__input}>
              <span>Contactado</span>
              <select value={contactado} onChange={(e) => setContactado(e.target.value)}>
                <option value="0">No</option>
                <option value="1">Sí</option>
              </select>
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
