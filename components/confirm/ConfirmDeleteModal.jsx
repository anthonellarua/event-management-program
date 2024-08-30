import styles from './ConfirmDeleteModal.module.scss';

const ConfirmDeleteModal = ({ onClose, onConfirm, item }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modaltittle}>
          <h1>Eliminar {item}</h1>
          <span className={styles.modaltittle__close} onClick={onClose}>&times;</span>
        </div>
        <p>¿Estás seguro que deseas eliminar este item?</p>
        <div className={styles.form__actions}>
          <button className={styles.form__buttoncancel} onClick={onClose}>Cancelar</button>
          <button className={styles.form__buttonsubmit} type="submit">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
