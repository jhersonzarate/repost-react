import { Link } from 'react-router-dom'; 

// Página principal del sistema
function Home() {
  return (
    <div className="home-page">

      {/* Sección principal tipo banner */}
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">Sistema de Control de Inventario</h1>
          <p className="hero-subtitle">Gestión integral para tiendas de dispositivos electrónicos</p>
          <p className="hero-description">
            Proyecto académico con React, Vite y Supabase. Incluye Fetch, Axios y Alova.
          </p>
        </div>
      </div>

      {/* Sección de características */}
      <div className="home-features">
        <h2 className="features-title">Características principales</h2>
        
        {/* Tarjetas de funcionalidades */}
        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Gestión de Inventario</h3>
            <p>Control de productos, stock y proveedores</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Registro de Ventas</h3>
            <p>Seguimiento de transacciones y análisis</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Movimientos</h3>
            <p>Entradas y salidas de inventario</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Múltiples APIs</h3>
            <p>Comparación entre distintos métodos HTTP</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">☁️</div>
            <h3>Base de Datos Cloud</h3>
            <p>Integración con Supabase</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Diseño Responsive</h3>
            <p>Adaptado a móviles y PCs</p>
          </div>
        </div>
      </div>

      {/* Sección de acciones principales */}
      <div className="home-cta">
        <h2>Comience a explorar</h2>
        <p>Seleccione un método de API</p>
        
        {/* Botones hacia cada método de consumo */}
        <div className="cta-buttons">
          <Link to="/fetch" className="cta-button cta-primary">🌐 Fetch API</Link>
          <Link to="/axios" className="cta-button cta-primary">⚡ Axios</Link>
          <Link to="/alova" className="cta-button cta-primary">🚀 Alova</Link>
        </div>

        {/* Enlace rápido para agregar un producto */}
        <div className="cta-secondary">
          <Link to="/add" className="cta-button cta-secondary-btn">➕ Agregar Producto</Link>
        </div>
      </div>

      {/* Información adicional del proyecto */}
      <div className="home-info">

        <div className="info-section">
          <h3>Sobre el Proyecto</h3>
          <p>
            Proyecto final del curso de Desarrollo Web.  
            Compara distintos métodos de consumo de APIs REST y aplica arquitectura.
          </p>
        </div>

        <div className="info-section">
          <h3>Tecnologías Utilizadas</h3>

          {/* Lista de tecnologías */}
          <ul className="tech-list">
            <li><strong>Frontend:</strong> React 18 + Vite</li>
            <li><strong>Backend:</strong> Supabase (PostgreSQL)</li>
            <li><strong>Routing:</strong> React Router DOM</li>
            <li><strong>HTTP Clients:</strong> Fetch API, Axios, Alova</li>
            <li><strong>Estilos:</strong> CSS3 personalizado</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Home;
