import React, { useEffect, useState } from 'react';
import "../styles/Reservar.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import AddServices from './AddServices';
import FullScreenCalendar from './FullScreenCalendar';

const Reservar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [price, setPrice] = useState(20000);
    const [totalReserva, setTotalReserva] = useState(0);
    const [paymentOption, setPaymentOption] = useState("totalReserva");
    const [dateInit, setDateInit] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [namePet, setNamePet] = useState('');
    const [sizePet, setSizePet] = useState('');
    const [breedPet, setBreedPet] = useState('');
    const [email, setEmail] = useState(user?.email || '');
    const [notes, setNotes] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [availability, setAvailability] = useState(null);
    const [showCalendar, setShowCalendar] = useState({ show: false, type: '' });

    const calculateCosts = async () => {
        if (!dateInit || !dateEnd) {
            console.error('Fechas no válidas para el cálculo de costos.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8000/reserves/calculate_reservation_cost/', {
                init_date: dateInit,
                end_date: dateEnd,
                services: selectedServices.map((service) => service.id),
            });
    
            const { total, total_reserva } = response.data;
            setPrice(total); // Actualiza el precio total
            setTotalReserva(total_reserva); // Actualiza el total de reserva
        } catch (error) {
            console.error('Error al calcular costos:', error.response?.data || error.message);
        }
    };
    
    // Llama a esta función cuando cambien las fechas o los servicios
    useEffect(() => {
        if (dateInit && dateEnd) {
            calculateCosts();
        }
    }, [dateInit, dateEnd, selectedServices]);
    

    useEffect(() => {
        console.log(user); // Verifica el estado del usuario cuando se actualiza
      }, [user]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/services/getall');
                setServices(response.data);
            } catch (error) {
                console.error('Error al obtener servicios:', error);
            }
        };
        fetchServices();
    }, []);


    const checkAvailability = async () => {
        if (!dateInit || !dateEnd) {
            console.error('Fechas no válidas para la verificación de disponibilidad.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/reserves/check_availability/', {
                init_date: formatDateToBackend(dateInit),
                end_date: formatDateToBackend(dateEnd),
            });
            setAvailability(response.data.available);
        } catch (error) {
            console.error('Error al verificar disponibilidad:', error.response?.data || error.message);
            setAvailability(false);
        }
    };

    const formatDateToBackend = (date) => {
        return date.split('/').reverse().join('-'); // Convertir DD/MM/YYYY a YYYY-MM-DD
    };

    const handleReserve = async () => {
        if (!user) {
            alert('Debes iniciar sesión para realizar una reserva.');
            return;
        }
    
        if (availability === false) {
            alert('Las fechas seleccionadas no están disponibles.');
            return;
        }
    
        const data = {
            services: selectedServices.map((service) => ({
                id: service.id,
                name: service.name,
                price: service.price,
            })),
            init_date: dateInit,
            end_date: dateEnd,
            pet_name: namePet,
            pet_size: sizePet,
            pet_breed: breedPet,
            payment_option: paymentOption,
            email: email,
            user: user?.id,
            notes: notes,
        };
    
        try {
            const response = await axios.post('http://localhost:8000/reserves/create/', data);
            const { total, total_reserva } = response.data;
            setPrice(total);
            setTotalReserva(total_reserva);
    
            navigate('/mis-reservas');
        } catch (error) {
            console.error('Error al crear la reserva:', error.response?.data || error.message);
            alert('Hubo un error al procesar la reserva.');
        }
    };
    
    
    

    const handleDateSelection = (date, type) => {
        const formattedDate = date.toISOString().split('T')[0]; // Asegurarse de usar formato YYYY-MM-DD
        if (type === 'init') setDateInit(formattedDate);
        if (type === 'end') setDateEnd(formattedDate);
        setShowCalendar({ show: false, type: '' });
    };
    
    // Mostrar las fechas seleccionadas en el formato adecuado
    const formatDateToDisplay = (date) => {
        if (!date) return 'YYYY-MM-DD'; // Valor por defecto si la fecha no está seleccionada
        return date;
    };
    

    return (
        <div className="reserve-form-wrapper">
            <h1 className="page-title">Reservar</h1>
            <div>
                {!user && (
                    <>
                        <h4 className="care-to-reserve">
                            Primero debes iniciar sesión para hacer una reserva!
                        </h4>
                    </>
                )}
                {user && (
                    <h4 className="welcome-message">
                        ¡Bienvenido {user.first_name}! Continúa con tu reserva.
                    </h4>
                )}
            </div>
            <div className="forms-container">
                <form className="reserve-form">
                    <div className="row">
                        <div className="col-6">
                            <h4>Fecha Ingreso</h4>
                            <input
                                type="text"
                                className="form-control"
                                value={formatDateToDisplay(dateInit)}
                                placeholder="DD/MM/YYYY"
                                readOnly
                                onClick={() => setShowCalendar({ show: true, type: 'init' })}
                            />
                        </div>
                        <div className="col-6">
                            <h4>Fecha Salida</h4>
                            <input
                                type="text"
                                className="form-control"
                                value={formatDateToDisplay(dateEnd)}
                                placeholder="DD/MM/YYYY"
                                readOnly
                                onClick={() => setShowCalendar({ show: true, type: 'end' })}
                            />
                        </div>
                    </div>
                    {showCalendar.show && (
                        <FullScreenCalendar
                            show={showCalendar.show}
                            type={showCalendar.type}
                            onSelectDate={(date) => handleDateSelection(date, showCalendar.type)}
                            onClose={() => setShowCalendar({ show: false, type: '' })}
                        />
                    )}
                    {!availability && (
                        <div className="availability-error">
                            <p>Las fechas seleccionadas no están disponibles.</p>
                        </div>
                    )}
                   <div className="payment-option">
                        <h4>Elige una opción de pago:</h4>
                        <div className="payment-row">
                            <input
                                type="radio"
                                name="paymentOption"
                                value="totalReserva"
                                checked={paymentOption === "totalReserva"}
                                onChange={() => setPaymentOption("totalReserva")}
                            />
                            <label>Pagar Total Reserva (${totalReserva.toLocaleString('de-DE')})</label>
                        </div>
                        <div className="payment-row">
                            <input
                                type="radio"
                                name="paymentOption"
                                value="total"
                                checked={paymentOption === "total"}
                                onChange={() => setPaymentOption("total")}
                            />
                            <label>Pagar Total (${price.toLocaleString('de-DE')})</label>
                        </div>
                    </div>


                </form>
                <form className="reserve-form">
                    <h3>Datos Mascota</h3>
                    <label>Nombre</label>
                    <input className="form-control" onChange={(e) => setNamePet(e.target.value)} />
                    <label>Tamaño</label>
                    <select className="form-control" onChange={(e) => setSizePet(e.target.value)}>
                        <option value="" disabled>Elige una opción...</option>
                        <option value="Pequeño">Pequeño</option>
                        <option value="Mediano">Mediano</option>
                        <option value="Grande">Grande</option>
                    </select>
                    <label>Raza</label>
                    <input className="form-control" onChange={(e) => setBreedPet(e.target.value)} />
                </form>
                <form className="reserve-form">
                    <h3>Datos Contacto</h3>
                    <label>Email</label>
                    <input
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={!!user}
                    />
                    <label>Notas Adicionales</label>
                    <textarea
                        className="form-control"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Instrucciones especiales, medicación, etc."
                    />
                </form>
                <button onClick={() => setShowModal(true)} className="add-services-button">Añadir Servicios</button>
                     
                <div className="total-wrapper">
                    <h3>Total a Pagar</h3>
                    <div>${(paymentOption === "total" ? price : totalReserva).toLocaleString('de-DE')}</div>
                </div>

                <div className="selected-services">
                    <h4>Servicios Seleccionados:</h4>
                    {selectedServices.length > 0 ? (
                        <ul>
                            {selectedServices.map((service) => (
                                <li key={service.id}>
                                    {service.name} - ${service.price.toLocaleString('de-DE')}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se han seleccionado servicios.</p>
                    )}
                </div>     

                <button className="reserve-button" onClick={handleReserve}>Confirmar Reserva</button>
            </div>
            {showModal && (
                <AddServices
                    services={services}
                    selectedServices={selectedServices}
                    setSelectedServices={setSelectedServices}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default Reservar;
