import React, { useState } from 'react';
import "../styles/Contact.css";
import axios from 'axios';


function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', asunto: '' , message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async () =>  {

    const data = {
      name: formData.name,
      mail: formData.email,
      subject: formData.asunto,
      message: formData.message
    }
    try {
      const response = await axios.post('http://localhost:8000/contacts/create/', data);
      console.log(response)
    } catch (error) {
        console.error('Error al obtener servicios:', error);// Muestra el mensaje de error del backend
    }
    console.log('Formulario enviado:', formData);
    // Aquí podrías hacer una petición HTTP para enviar el formulario a tu servidor
  };

  return (
    <div>
      <h1>Formulario de Contacto</h1>
      <div className='form-wrapper'>
        <form className='contact-form'>
          <label>
            Nombre:
          </label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
          <label>
            Correo Electrónico:
          </label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
          <label>
            Asunto:
          </label>
          <input type = "text" className="form-control" name="asunto" value={formData.asunto} onChange={handleChange} />
          <label>
            Mensaje:
          </label>
          <textarea type = "text" className="form-control" name="message" value={formData.message} onChange={handleChange}></textarea>
          <br />
          <button type="button" onClick={handleSubmit}>Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
