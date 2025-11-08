import { Link } from 'react-router-dom';

/**
 * Componente Navbar
 * Barra de navegación principal con enlaces a las diferentes secciones
 * Implementa un diseño responsive y moderno
 */
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo y título de la aplicación */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📱</span>
          <span className="logo-text">Inventario Tech</span>
        </Link>

        {/* Menú de navegación */}
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">Inicio</Link>
          </li>
          <li>
            <Link to="/fetch" className="navbar-link">Fetch API</Link>
          </li>
          <li>
            <Link to="/axios" className="navbar-link">Axios</Link>
          </li>
          <li>
            <Link to="/alova" className="navbar-link">Alova</Link>
          </li>
          <li>
            <Link to="/add" className="navbar-link navbar-link-primary">
              Agregar Producto
            </Link>
          </li>
          <li>
            <Link to="/ventas" className="navbar-link">Ventas</Link>
          </li>
          <li>
            <Link to="/movimientos" className="navbar-link">Movimientos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;