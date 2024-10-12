import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';  // Importa tu vista de inicio
import Store from './components/Store';  // Importa tu vista de tienda
import Contact from './components/Contact';  // Importa tu vista de contacto
import Navbar from './components/Navbar';  // Importa tu barra de navegación

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />  {/* Colocamos la barra de navegación fuera de Routes para que aparezca en todas las vistas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



