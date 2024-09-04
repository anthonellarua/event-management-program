import { useState, useEffect } from "react";
import styles from "./EditAnfitrionForm.module.scss";

const AddAnfitrionForm = ({ anfitrion, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...anfitrion });
    const [event, setEvent] = useState("");
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetch("/api/eventos/lista")
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp);
                return setEventos(resp);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                    <h1>Agregar anfitrión</h1>
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
                    <div className={styles.form__doubleinput}>
                        <label className={styles.form__input}>
                            <span>Nombre</span>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </label>
                        <label className={styles.form__input}>
                            <span>Apellido</span>
                            <input
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <label className={styles.form__input}>
                        <span>Teléfono</span>
                        <input
                            name="phone"
                            value={formData.phone}
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
};

export default AddAnfitrionForm;
