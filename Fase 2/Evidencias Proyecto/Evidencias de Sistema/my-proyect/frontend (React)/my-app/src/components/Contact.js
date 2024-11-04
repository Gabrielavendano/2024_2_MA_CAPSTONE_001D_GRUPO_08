import React, { useState } from 'react';
import "../styles/Contact.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', asunto: '', message: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpia el error al escribir en el campo
  };

  const handleSubmit = async () => {
    // Inicializa un objeto de errores
    const newErrors = {};
    if (!formData.name) newErrors.name = 'No se ha rellenado el nombre';
    if (!formData.email) newErrors.email = 'No se ha rellenado el correo electrónico';
    if (!formData.asunto) newErrors.asunto = 'No se ha rellenado el asunto';
    if (!formData.message) newErrors.message = 'No se ha rellenado el mensaje';

    // Verifica si hay errores
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Muestra los mensajes de error
      return;
    }

    const data = {
      name: formData.name,
      mail: formData.email,
      subject: formData.asunto,
      message: formData.message,
    };

    try {
      const response = await axios.post('http://localhost:8000/contacts/create/', data);
      console.log(response);
      alert('Enviado con éxito!');
      navigate('/');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div>
      <h1>Formulario de Contacto</h1>
      <div className='form-wrapper'>
        <form className='contact-form'>
          <label>Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: 'red', fontSize: '0.9em' }}>{errors.name}</p>}

          <label>Correo Electrónico:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.9em' }}>{errors.email}</p>}

          <label>Asunto:</label>
          <input
            type="text"
            className="form-control"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
          />
          {errors.asunto && <p style={{ color: 'red', fontSize: '0.9em' }}>{errors.asunto}</p>}

          <label>Mensaje:</label>
          <textarea
            className="form-control"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p style={{ color: 'red', fontSize: '0.9em' }}>{errors.message}</p>}

          <br />
          <button type="button" onClick={handleSubmit}>Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
