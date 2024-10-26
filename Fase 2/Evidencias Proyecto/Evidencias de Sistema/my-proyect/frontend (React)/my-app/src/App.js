import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';  
import About from './components/About';  
import Services from './components/Services';  
import Gallery from './components/Gallery';  
import Contact from './components/Contact';  
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Reservas from './components/Reservas'; // Importa el componente de Reservas
import Contactos from './components/Contactos'; // Importa el componente de Contactos
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider> {/* AuthProvider ahora está dentro del Router */}
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reservas" element={<Reservas />} /> {/* Ruta para Reservas */}
            <Route path="/contactos" element={<Contactos />} /> {/* Ruta para Contactos */}
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
