import React, { useState, useEffect } from "react";
import styles from "./EditOrganizerForm.module.scss";

export default function AddOrganizerForm({ organizer, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        phone: "",
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
        setFormData({
            ...formData,
            [name]: value,
        });
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
                    <h1>Editar organizador</h1>
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
                                <option value="" selected disabled>
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
                        <span>Nombre</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className={styles.form__input}>
                        <span>Apellidos</span>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className={styles.form__input}>
                        <span>Teléfono</span>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
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
