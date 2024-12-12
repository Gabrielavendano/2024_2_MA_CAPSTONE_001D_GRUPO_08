import React, { useState } from 'react';
import '../styles/AddServices.css';

const AddServices = ({ services, selectedServices, setSelectedServices, onClose }) => {
    const [localSelection, setLocalSelection] = useState(selectedServices || []);

    const toggleService = (service) => {
        if (localSelection.some((s) => s.id === service.id)) {
            setLocalSelection(localSelection.filter((s) => s.id !== service.id));
        } else {
            setLocalSelection([...localSelection, service]);
        }
    };

    const handleSave = () => {
        setSelectedServices(localSelection);
        onClose();
    };

    return (
        <div className="modal-overlay">
            
            <div className="modal-container">
                <h2 className="modal-title">Seleccionar Servicios</h2>
                <div className="modal-body">
                    <ul className="services-list">
                        {services.map((service) => (
                            <li key={service.id} className="service-item">
                                <input
                                    type="checkbox"
                                    className="service-checkbox"
                                    checked={localSelection.some((s) => s.id === service.id)}
                                    onChange={() => toggleService(service)}
                                />
                                <span className="service-label">
                                    <span className="service-name">{service.name}</span>
                                    <span className="service-price">${service.price}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="modal-actions">
                    <button onClick={handleSave} className="save-button">Guardar</button>
                    <button onClick={onClose} className="cancel-button">Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default AddServices;
