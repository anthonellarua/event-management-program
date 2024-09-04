import { useState, useEffect } from "react";
import styles from "./AddInvitadoForm.module.scss";

const AddInvitadoInEventsForm = ({ id, onClose, onSave }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [contactado, setContactado] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return; // Evitar envíos múltiples

        setIsSubmitting(true);
        const newInvitado = {
            name: name,
            last_name: lastName,
            phone: phone,
            evento_id: id,
            contactado: parseInt(contactado, 10),
        };

        onSave(newInvitado);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modaltittle}>
                    <h1>Agregar invitado</h1>
                    <span
                        className={styles.modaltittle__close}
                        onClick={onClose}
                    >
                        &times;
                    </span>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.form__doubleinput}>
                        <label className={styles.form__input}>
                            <span>Nombre</span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <label className={styles.form__input}>
                            <span>Apellido</span>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <div className={styles.form__doubleinput}>
                        <label className={styles.form__input}>
                            <span>Teléfono</span>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </label>
                        <label className={styles.form__input}>
                            <span>Contactado</span>
                            <select
                                value={contactado}
                                onChange={(e) =>
                                    setContactado(parseInt(e.target.value, 10))
                                }
                            >
                                <option value={0}>No</option>
                                <option value={1}>Sí</option>
                            </select>
                        </label>
                    </div>

                    <div className={styles.form__actions}>
                        <button
                            className={styles.form__buttoncancel}
                            onClick={onClose}
                            disabled={isSubmitting} // Deshabilitar si ya se está enviando
                        >
                            Cancelar
                        </button>
                        <button
                            className={styles.form__buttonsubmit}
                            type="submit"
                            disabled={isSubmitting} // Deshabilitar si ya se está enviando
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInvitadoInEventsForm;
