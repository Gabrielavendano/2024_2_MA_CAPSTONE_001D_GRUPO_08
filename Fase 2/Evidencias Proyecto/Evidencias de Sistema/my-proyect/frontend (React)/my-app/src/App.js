import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';  
import Store from './components/Store';  
import Contact from './components/Contact';  
import Navbar from './components/Navbar';  
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />  {/* Colocamos la barra de navegación fuera de Routes para que aparezca en todas las vistas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />  {<Footer />}
    </Router>
  );
}

export default App;




