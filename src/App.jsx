import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import InventoryFetch from './pages/InventoryFetch';
import InventoryAxios from './pages/InventoryAxios';
import InventoryAlova from './pages/InventoryAlova';
import AddProduct from './pages/AddProduct';
import Ventas from './pages/Ventas';
import Movimientos from './pages/Movimientos';

/**
 * Componente principal de la aplicación
 * Configura el enrutamiento y la estructura general
 * 
 * Rutas disponibles:
 * - / : Página de inicio
 * - /fetch : Inventario con Fetch API
 * - /axios : Inventario con Axios
 * - /alova : Inventario con Alova
 * - /add : Agregar nuevo producto
 * - /ventas : Gestión de ventas
 * - /movimientos : Movimientos de inventario
 */
function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fetch" element={<InventoryFetch />} />
          <Route path="/axios" element={<InventoryAxios />} />
          <Route path="/alova" element={<InventoryAlova />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/movimientos" element={<Movimientos />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;