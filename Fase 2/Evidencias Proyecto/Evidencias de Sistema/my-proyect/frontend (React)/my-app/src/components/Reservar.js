import React, { useEffect, useState } from 'react';
import "../styles/Reservar.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Reservar = () => {
    const [services, setServices] = useState([]);
    const { user } = useAuth();
    const [prices, setPrices] = useState({});
    const navigate = useNavigate();
    useEffect(() =>  {
        const data = async () => {
            try {
            const response = await axios.get('http://localhost:8000/services/getall');
            setServices(Object.values(response.data))
            let prices = {};
            response.data.forEach((service) => {
                prices[service.id] = service.price
            })
            setPrices(prices)
            } catch (error) {
            console.error('Error al obtener servicios:', error);// Muestra el mensaje de error del backend
            }
        }
        data(); 
    
    }, [])

    const serv = services.map((service) => (
        <div className="form-check service-item" key={service.id}>
            <input
                className="form-check-input"
                type="checkbox"
                name="service"
                onChange={listServiceChange}
                value={service.id}
                id={`service_${service.id}`}
            />
            <label className="form-check-label service-label" htmlFor={`service_${service.id}`}>
                <span className="service-name">{service.name}</span>
                <span className="service-price">${numberFormat(service.price)}</span>
            </label>
        </div>
    ));
    


    const [listService, setListService] = useState([]);
    const [price, setPrice] = useState(20000);
    const [dateInit, setDateInit] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [namePet, setNamePet] = useState('');
    const [typePet, setTypePet] = useState('Perro');
    const [breedPet, setBreedPet] = useState('');

    async function reserve() {
        let serviceJson = listService.map((service) => service.id); // Cambio aquí, solo el id

        let data = {
            services: serviceJson,
            init_date: dateInit,
            end_date: dateEnd,
            pet_name: namePet,
            pet_type: typePet,
            pet_breed: breedPet,
            total: price
        };

        if (user) {
            data = {
                services: serviceJson,
                init_date: dateInit,
                user: user.id,  // Enviar el objeto 'user' con id
                end_date: dateEnd,
                pet_name: namePet,
                pet_type: typePet,
                pet_breed: breedPet,
                total: price
            };
        }

        try {
            const response = await axios.post('http://localhost:8000/reserves/create/', data);
            console.log(response);
            alert('Reserva creada con éxito');
            navigate('/');
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            alert('Hubo un error al crear la reserva');
        }
    }


    function listServiceChange(){
        const radio_services = document.getElementsByName("service");
        const list_services = [];
        let service_price = 0;
        const fecha1 = new Date(dateInit);
        const fecha2 = new Date(dateEnd);
        let fechaDif = (fecha2 - fecha1)/ (1000 * 60 * 60 * 24) ;
        if(!fechaDif){
            fechaDif = 1;
        }
        radio_services.forEach((element) => {
            if(element.checked){
                let id = parseInt(element.id.split("_")[1]);
                let service_data = services.find(item => item.id === id);
                list_services.push(service_data);
                service_price += parseInt(prices[id]);
            }
        })
        setListService(list_services);
        setPrice(20000* fechaDif + service_price );
    }

    function numberFormat(number){
        const formattedNumber = number.toLocaleString('de-DE');
        return formattedNumber;
    }

    useEffect(() => {
        listServiceChange();
    }, [dateEnd, dateInit]); //

    return (
        <>
            <h1 className="page-title">Reservar</h1>
            <div className="reserve-form-wrapper">
                <div className="forms-container">
                    <form className="reserve-form">
                        <h3>Servicios</h3>
                        <div className="form-group service-list">
                            {serv}
                        </div>
                        <div className="row justify-content-between my-3">
                            <div className="col-5">
                                <h4>Fecha Ingreso</h4>
                                <input type="date" className="form-control" onChange={(e) => setDateInit(e.target.value)} placeholder="Fecha de entrada" />
                            </div>
                            <div className="col-5">
                                <h4>Fecha Salida</h4>
                                <input type="date" className="form-control" onChange={(e) => setDateEnd(e.target.value)} placeholder="Fecha de salida" />
                            </div>
                        </div>
                    </form>
                    <form className="reserve-form">
                        <h3>Datos Mascota</h3>
                        <label>Nombre</label>
                        <input className="form-control" onChange={(e) => setNamePet(e.target.value)} placeholder="Ingrese un nombre" />
                        <label>Tipo</label>
                        <select className="form-control" onChange={(e) => setTypePet(e.target.value)}>
                            <option>Perro</option>
                            <option>Gato</option>
                            <option>Otros</option>
                        </select>
                        <label>Raza</label>
                        <input className="form-control" onChange={(e) => setBreedPet(e.target.value)} placeholder="Ingrese una raza" />
                    </form>
                    
                </div>
                

                <div className="total-wrapper">
                    <h3>Total</h3>
                    <div>$ {numberFormat(price)}</div>
                </div>
                <button className="reserve-button" onClick={reserve}>Reservar</button>
            </div>
        </>
    );
};

export default Reservar;
