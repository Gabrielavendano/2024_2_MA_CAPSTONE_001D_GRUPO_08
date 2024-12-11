import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/FullScreenCalendar.css";

const FullScreenCalendar = ({ show, onClose, onSelectDate, type }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [slotsInfo, setSlotsInfo] = useState({});
    const [error, setError] = useState(null);

    // Formatea la fecha en formato "YYYY-MM-DD"
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    // Obtiene los cupos disponibles para un rango de fechas desde el backend
    useEffect(() => {
        const fetchSlotsInfo = async () => {
            try {
                const response = await fetch('http://localhost:8000/reserves/get_slots_range/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        start_date: formatDate(new Date()), // Fecha de inicio (hoy)
                        end_date: formatDate(new Date(new Date().setDate(new Date().getDate() + 30))), // Rango de 30 días
                    }),
                });
                const data = await response.json();
                setSlotsInfo(data.slots); // Se asegura de que `slots` sea un objeto
            } catch (error) {
                console.error("Error al obtener los cupos:", error);
            }
        };

        if (show) {
            fetchSlotsInfo();
        }
    }, [show]);

    // Maneja el cambio de fecha seleccionada
    const handleDateChange = (date) => {
        const formattedDate = formatDate(date);
        if (slotsInfo[formattedDate] === 0) {
            setError(`No puedes seleccionar ${date.toLocaleDateString('es-ES')}. No hay cupos disponibles.`);
        } else {
            setError(null);
            setSelectedDate(date);
        }
    };

    // Guarda la fecha seleccionada y cierra el calendario
    const handleSave = () => {
        if (selectedDate) {
            onSelectDate(selectedDate, type);
            onClose();
        } else {
            setError("Por favor selecciona una fecha válida.");
        }
    };

    if (!show) return null;

    return (
        <div className="fullscreen-calendar-overlay">
            <div className="fullscreen-calendar-container">
                <h2>Selecciona la {type === 'init' ? 'fecha de ingreso' : 'fecha de salida'}</h2>
                <DatePicker
                    inline
                    selected={selectedDate}
                    onChange={handleDateChange}
                    highlightDates={Object.keys(slotsInfo).map((date) => ({
                        date: new Date(date),
                        className: slotsInfo[date] === 0 ? 'no-slots' : 'available-slots',
                    }))}
                />
                {selectedDate && slotsInfo[formatDate(selectedDate)] !== undefined && (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>
                        Cupos disponibles para {selectedDate.toLocaleDateString('es-ES')}:{" "}
                        {slotsInfo[formatDate(selectedDate)]}
                    </p>
                )}
                {error && <p className="error-message">{error}</p>}
                <div className="calendar-actions">
                    <button className="save-button" onClick={handleSave}>Guardar</button>
                    <button className="cancel-button" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default FullScreenCalendar;
