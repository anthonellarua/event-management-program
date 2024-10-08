import { useState, useEffect } from "react";
import styles from "./AddActivityForm.module.scss";

export default function AddActivityForm({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        date: "",
        start_time: "",
        end_time: "",
        description: "",
    });
    const [event, setEvent] = useState("");
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetch("/api/eventos/lista")
            .then((resp) => resp.json())
            .then((resp) => {
                return setEventos(resp);
            });
    }, []);

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
            evento_id: event,
            name_event: eventos.find((evento) => evento.value == event).label,
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
                    <div className={styles.form__doubleinput}>
                        <label className={styles.form__input}>
                            <span>Eventos</span>
                            <select
                                value={event}
                                onChange={(e) => setEvent(e.target.value)}
                            >
                                <option value="" disabled>
                                    Seleccionar una opción
                                </option>
                                {eventos.map((evento, index) => (
                                    <option key={index} value={evento.value}>
                                        {evento.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
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
