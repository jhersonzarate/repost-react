import { Link } from 'react-router-dom';

/**
 * Página Home
 * Página de inicio con presentación del proyecto y enlaces principales
 */
function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Sistema de Control de Inventario
          </h1>
          <p className="hero-subtitle">
            Gestión integral para tiendas de dispositivos electrónicos
          </p>
          <p className="hero-description">
            Proyecto académico desarrollado con React, Vite y Supabase.
            Implementa tres métodos diferentes de consumo de API REST:
            Fetch API, Axios y Alova.
          </p>
        </div>
      </div>

      <div className="home-features">
        <h2 className="features-title">Características principales</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Gestión de Inventario</h3>
            <p>Control completo de productos, stock y proveedores</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Registro de Ventas</h3>
            <p>Seguimiento de transacciones y análisis de ventas</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Movimientos</h3>
            <p>Historial de entradas y salidas de inventario</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Múltiples APIs</h3>
            <p>Comparación entre Fetch, Axios y Alova</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">☁️</div>
            <h3>Base de Datos Cloud</h3>
            <p>Integración con Supabase en tiempo real</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Diseño Responsive</h3>
            <p>Interfaz adaptable a cualquier dispositivo</p>
          </div>
        </div>
      </div>

      <div className="home-cta">
        <h2>Comience a explorar</h2>
        <p>Seleccione un método de API para gestionar el inventario</p>
        
        <div className="cta-buttons">
          <Link to="/fetch" className="cta-button cta-primary">
            🌐 Fetch API
          </Link>
          <Link to="/axios" className="cta-button cta-primary">
            ⚡ Axios
          </Link>
          <Link to="/alova" className="cta-button cta-primary">
            🚀 Alova
          </Link>
        </div>

        <div className="cta-secondary">
          <Link to="/add" className="cta-button cta-secondary-btn">
            ➕ Agregar Producto
          </Link>
        </div>
      </div>

      <div className="home-info">
        <div className="info-section">
          <h3>Sobre el Proyecto</h3>
          <p>
            Este sistema fue desarrollado como proyecto final para el curso de
            Desarrollo de Aplicaciones Web del 6º ciclo de Ingeniería de Sistemas.
            El objetivo principal es comparar diferentes métodos de consumo de APIs
            REST en React y aplicar conceptos de arquitectura de software.
          </p>
        </div>

        <div className="info-section">
          <h3>Tecnologías Utilizadas</h3>
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