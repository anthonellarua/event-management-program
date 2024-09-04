import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import Image from "next/image";
import AddActivityForm from "@/components/programa/AddActivityForm";
import EditActivityForm from "@/components/programa/EditActivityForm";
import ConfirmDeleteModal from "@/components/confirm/ConfirmDeleteModal";
import moment from "moment";
require("moment/min/locales.min");
moment.locale('es');

const ProgramasPage = () => {
    const router = useRouter();
    const [programas, setProgramas] = useState([]);
    const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);
    const [isEditActivityModalOpen, setIsEditActivityModalOpen] =
        useState(false);
    const [isDeleteActivityModalOpen, setIsDeleteActivityModalOpen] =
        useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddActivityClick = () => {
        setIsAddActivityModalOpen(true);
    };

    const handleCloseActivityModal = () => {
        setIsAddActivityModalOpen(false);
    };

    const handleEditActivityClick = (activity) => {
        setSelectedActivity(activity);
        setIsEditActivityModalOpen(true);
    };

    const handleCloseEditActivityModal = () => {
        setIsEditActivityModalOpen(false);
        setSelectedActivity(null);
    };

    const handleDeleteActivityClick = (activity) => {
        setSelectedActivity(activity);
        setIsDeleteActivityModalOpen(true);
    };

    const handleCloseDeleteActivityModal = () => {
        setIsDeleteActivityModalOpen(false);
        setSelectedActivity(null);
    };

    const fetchData = async () => {
        try {
            const response = await fetch("/api/programa");
            if (!response.ok) {
                throw new Error("Error fetching data");
            }
            const data = await response.json();
            setProgramas(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSaveActivity = async (newActivity) => {
        try {
            const response = await fetch(`/api/programa/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...newActivity }),
            });

            if (!response.ok) {
                throw new Error("Error adding activity");
            }

            const updatedData = await response.json();
            console.log("Activity added successfully:", updatedData);

            const { name_event } = newActivity;

            setProgramas((prevPrograms) => [
                ...prevPrograms,
                { ...updatedData.program, name_event },
            ]);


            setIsAddActivityModalOpen(false);
        } catch (error) {
            console.error("Error adding activity:", error);
        }
    };

    const handleSaveEditActivity = async (updatedActivity) => {
        try {
            const response = await fetch(`/api/programa/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...updatedActivity }),
            });

            if (!response.ok) {
                throw new Error("Error updating activity");
            }

            const updatedData = await response.json();
            console.log("Activity updated successfully:", updatedData);

            setProgramas((prevDetails) =>
                prevDetails.map((activity) =>
                    activity.id === updatedActivity.id
                        ? updatedActivity
                        : activity
                )
            );
            setIsEditActivityModalOpen(false);
            setSelectedActivity(null);
        } catch (error) {
            console.error("Error updating activity:", error);
        }
    };

    const handleDeleteActivity = async () => {
        try {
            const response = await fetch(`/api/programa/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: selectedActivity.id }),
            });

            if (!response.ok) {
                throw new Error("Error deleting activity");
            }

            const updatedData = await response.json();
            console.log("Activity deleted successfully:", updatedData);

            setProgramas((prevProgramas) =>
                prevProgramas.filter(
                    (activity) => activity.id !== selectedActivity.id
                )
            );
            setIsDeleteActivityModalOpen(false);
            setSelectedActivity(null);
        } catch (error) {
            console.error("Error deleting activity:", error);
        }
    };

    return (
        <div className={styles.programas}>
            <div className={styles.programas__tittle}>
                <h1>Programas</h1>
                <span onClick={handleAddActivityClick}>
                    <Image
                        width={20}
                        height={20}
                        src="/icons/add-icon.png"
                        alt=""
                    />
                    Nuevo programa
                </span>
            </div>
            {programas.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Duración</th>
                            <th>Descripción</th>
                            <th>Evento</th>
                            <th>
                                <div></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {programas.map((programa) => (
                            <tr key={programa.id}>
                                <td>{moment(programa.date).format("YYYY-MM-DD")}</td>
                                <td>
                                    {programa.start_time} - {programa.end_time}
                                </td>
                                <td>{programa.description}</td>
                                <td>{programa.name_event}</td>
                                <td>
                                    <Image
                                        width={24}
                                        height={24}
                                        src="/icons/edit-icon-black.png"
                                        alt=""
                                        onClick={() =>
                                            handleEditActivityClick(programa)
                                        }
                                    />
                                    <Image
                                        width={24}
                                        height={24}
                                        src="/icons/delete-icon-black.png"
                                        alt=""
                                        onClick={() =>
                                            handleDeleteActivityClick(programa)
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay programas en este momento.</p>
            )}

            {isAddActivityModalOpen && (
                <AddActivityForm
                    onClose={handleCloseActivityModal}
                    onSave={handleSaveActivity}
                />
            )}

            {isEditActivityModalOpen && (
                <EditActivityForm
                    activity={selectedActivity}
                    onClose={handleCloseEditActivityModal}
                    onSave={handleSaveEditActivity}
                />
            )}

            {isDeleteActivityModalOpen && (
                <ConfirmDeleteModal
                    onClose={handleCloseDeleteActivityModal}
                    onConfirm={handleDeleteActivity}
                    item="actividad"
                />
            )}
        </div>
    );
};

export default ProgramasPage;
