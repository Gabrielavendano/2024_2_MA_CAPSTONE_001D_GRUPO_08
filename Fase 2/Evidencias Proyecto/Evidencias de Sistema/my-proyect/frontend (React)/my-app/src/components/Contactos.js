import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Reservas.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/contacts/get/"); // Ruta para obtener contactos
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleEdit = (contact) => {
    setEditing(contact.id);
    setEditData({...contact});
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/contacts/edit/${editing}/`, editData); // Ruta para editar contacto
      setEditing(null);
      fetchContacts();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/contacts/delete/${id}/`); // Ruta para eliminar contacto
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div>
      <h1>Contactos</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Asunto</th>
            <th>Mensaje</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              {editing === contact.id ? (
                <>
                  <td>{contact.id}</td> {/* ID no editable */}
                  <td>
                    <input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editData.mail}
                      onChange={(e) =>
                        setEditData({ ...editData, mail: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editData.subject}
                      onChange={(e) =>
                        setEditData({ ...editData, subject: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editData.message}
                      onChange={(e) =>
                        setEditData({ ...editData, message: e.target.value })
                      }
                    />
                  </td>
                  <td className="text-end">
                    <button className="btn btn-outline-success btn-sm" onClick={handleSave}>
                      <i className="bi bi-check"></i> {/* Ícono de guardar */}
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => setEditing(null)}>
                      <i className="bi bi-x"></i> {/* Ícono de cancelar */}
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.mail}</td>
                  <td>{contact.subject}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(contact)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(contact.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactsAdmin;
