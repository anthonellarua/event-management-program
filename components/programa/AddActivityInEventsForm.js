import { useState, useEffect } from "react";
import styles from "./AddActivityForm.module.scss";

export default function AddActivityInEventsForm({ id, onClose, onSave }) {
    const [formData, setFormData] = useState({
        date: "",
        start_time: "",
        end_time: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            evento_id: id,
        });
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modaltittle}>
                    <h1>Agregar actividad</h1>
                    <span
                        className={styles.modaltittle__close}
                        onClick={onClose}
                    >
                        &times;
                    </span>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.form__input}>
                        <span>Fecha</span>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </label>
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

                    <label className={styles.form__input}>
                        <span>Descripción</span>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                    <div className={styles.form__actions}>
                        <button
                            className={styles.form__buttoncancel}
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            className={styles.form__buttonsubmit}
                            type="submit"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
