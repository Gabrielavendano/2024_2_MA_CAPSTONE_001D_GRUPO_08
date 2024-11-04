import React, { useEffect, useState } from 'react';
import "../styles/Reservar.css";
import axios from 'axios';
import { useAuth } from '../AuthContext';


const Reservar = () => {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [prices, setPrices] = useState({});
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
        <div className="form-check">
            <input className="form-check-input" type="checkbox" name="service" onChange={listServiceChange} value={service.id} id={"service_" + service.id}/>
            <label className="form-check-label mx-2" for="flexCheckDefault">
                {service.name} (${service.price})
            </label>
        </div>
    ))


    const [listService, setListService] = useState([]);
    const [price, setPrice] = useState(20000);
    const [dateInit, setDateInit] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [namePet, setNamePet] = useState('');
    const [typePet, setTypePet] = useState('Perro');
    const [breedPet, setBreedPet] = useState('');
    async function reserve() {
        let serviceJson = {};
        listService.forEach((service)=>{
            serviceJson[service.id] = {service};
        })
        const data = {
            user_id: user.id,
            services: serviceJson,
            init_date:dateInit,
            end_date: dateEnd,
            pet_name: namePet,
            pet_type: typePet,
            pet_breed: breedPet,
            total: price
        }
        try {
            const response = await axios.post('http://localhost:8000/reserves/create/', data);
            console.log(response)
        } catch (error) {
            console.error('Error al obtener servicios:', error);// Muestra el mensaje de error del backend
        }
        
    }

    function listServiceChange(){
        const radio_services = document.getElementsByName("service");
        const list_services = [];
        let service_price = 0;
        radio_services.forEach((element) => {
            if(element.checked){
                let id = parseInt(element.id.split("_")[1]);
                let service_data = services.find(item => item.id === id);
                list_services.push(service_data);
                service_price += parseInt(prices[id]);
            }
        })
        setListService(list_services);
        setPrice(20000 + service_price)
    }

    return(
    <>
        <h1>Reservar</h1>
        <div className='reserve-form-wrapper'>

            <form className= 'reserve-form' id='form'>
                <h3>Servicios</h3>
                <div class="form-group">
                    {serv}
                </div>
                <div className='row justify-content-between my-3'>
                    <div className='col-5'>
                        <h3>Fecha Ingreso</h3>
                        <input type='date' className="form-control" onChange={(e) => setDateInit(e.target.value)} placeholder='Fecha de entrada'/>
                    </div>
                    <div className='col-5'>
                        <h3>Fecha Salida</h3>
                        <input type='date' className="form-control" onChange={(e) => setDateEnd(e.target.value)} placeholder='Fecha de salida'/>
                    </div>
                </div>
                <h3>Datos Mascota</h3>
                <label>Nombre</label>
                <input type='text' className="form-control" onChange={(e) => setNamePet(e.target.value)} placeholder='Ingrese un nombre'/>
                <label>Tipo</label>
                <select type='text' className="form-control" onChange={(e) => setTypePet(e.target.value)}  placeholder='Ingrese un tipo'>
                    <option>Perro</option>
                    <option>Gato</option>
                    <option>Otros</option>
                </select>
                <label>Raza</label>
                <input  className="form-control " onChange={(e) => setBreedPet(e.target.value)} placeholder='Ingrese una raza'/>
                <h3>Total</h3>
                <div>$ {price}</div>
                <button type="button" class="btn btn-success my-2" onClick={reserve}>Reservar</button>
            </form>
        </div>
    </>
    )
}

export default Reservar