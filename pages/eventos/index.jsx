import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import ConfirmDeleteModal from "@/components/confirm/ConfirmDeleteModal";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

export default function EventsList() {
    const [id, setId] = useState();
    const [events, setEvents] = useState([]);
    const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/eventos");
                if (!response.ok) {
                    throw new Error("Error fetching events");
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, []);

    const handleCreateEvent = () => {
        router.push("/eventos/create");
    };

    const handleDeleteEvent = async (event_id) => {
        try {
            const response = await fetch(`/api/eventos/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: event_id }),
            });

            if (!response.ok) {
                throw new Error("Error deleting invitado");
            }

            const updatedData = await response.json();
            console.log("Invitado deleted successfully:", updatedData);

            setEvents((prevEvents) =>
                prevEvents.filter((event) => event.id !== event_id)
            );
            setIsDeleteEventModalOpen(false);
            setId(null);
        } catch (error) {
            console.error("Error deleting invitado:", error);
        }
    };

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToExcel = async (excelData) => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, `Report` + fileExtension);
    };

    const handleDownloadReport = async () => {
        try {
            const response = await fetch(`/api/eventos/report`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error creating report");
            }

            const data = await response.json();
            exportToExcel(data);
        } catch (error) {
            console.error("Error creating report:", error);
        }
    };

    return (
        <div className={styles.eventos}>
            <div className={styles.eventos__tittle}>
                <h1>Eventos</h1>
                <div className={styles.eventos__tittle__buttons}>
                    <span onClick={handleCreateEvent}>
                        <Image
                            width={20}
                            height={20}
                            src="/icons/add-icon.png"
                            alt=""
                        />
                        Nuevo evento
                    </span>
                    <span onClick={handleDownloadReport}>
                        Descargar reporte
                    </span>
                </div>
            </div>
            {events.map((event, index) => (
                <div key={index} className={styles.evento_item}>
                    <h3>{event.name_event}</h3>
                    <span>{event.description}</span>
                    <div className={styles.evento_item__details}>
                        <div>
                            <span>
                                <Image
                                    width={24}
                                    height={24}
                                    src="/icons/user-icon-gray.png"
                                    alt=""
                                />
                                {event.host_name}
                            </span>
                            <span>
                                <Image
                                    width={24}
                                    height={24}
                                    src="/icons/pin-icon-gray.png"
                                    alt=""
                                />{" "}
                                {event.location}
                            </span>
                            <span>
                                <Image
                                    width={24}
                                    height={24}
                                    src="/icons/calendar-icon-gray.png"
                                    alt=""
                                />
                                {event.start_date}
                            </span>
                        </div>
                        
                        <div>
                            <div
                                className={styles.evento_item__buttondelete}
                                onClick={() => {
                                    setId(event.id);
                                    setIsDeleteEventModalOpen(true);
                                }}
                            >
                                <Image
                                    width={24}
                                    height={24}
                                    src="/icons/delete-icon-black.png"
                                    alt=""
                                />
                            </div>
                            <Link
                                className={styles.evento_item__button}
                                href={`/eventos/${event.id}`}
                            >
                                Ver Evento
                                <Image
                                    width={24}
                                    height={24}
                                    src="/icons/chevron-right-light.png"
                                    alt=""
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {isDeleteEventModalOpen && (
                <ConfirmDeleteModal
                    onClose={() => setIsDeleteEventModalOpen(false)}
                    onConfirm={() => handleDeleteEvent(id)}
                    item="evento"
                />
            )}
        </div>
    );
}
