import { Link, useLocation } from 'react-router-dom';

/**
 * Componente ApiSelector
 * Permite cambiar entre las diferentes implementaciones de API
 * (Fetch, Axios, Alova) para comparar su funcionamiento
 */
function ApiSelector() {
  const location = useLocation();

  // Determinar qué API está activa según la ruta
  const getActiveApi = () => {
    if (location.pathname.includes('fetch')) return 'fetch';
    if (location.pathname.includes('axios')) return 'axios';
    if (location.pathname.includes('alova')) return 'alova';
    return null;
  };

  const activeApi = getActiveApi();

  return (
    <div className="api-selector">
      <div className="api-selector-container">
        <h3 className="api-selector-title">
          Seleccione el método de consumo de API:
        </h3>

        <div className="api-buttons">
          <Link 
            to="/fetch" 
            className={`api-button ${activeApi === 'fetch' ? 'active' : ''}`}
          >
            <span className="api-icon">🌐</span>
            <div className="api-info">
              <span className="api-name">Fetch API</span>
              <span className="api-description">Nativo de JavaScript</span>
            </div>
          </Link>

          <Link 
            to="/axios" 
            className={`api-button ${activeApi === 'axios' ? 'active' : ''}`}
          >
            <span className="api-icon">⚡</span>
            <div className="api-info">
              <span className="api-name">Axios</span>
              <span className="api-description">Librería popular</span>
            </div>
          </Link>

          <Link 
            to="/alova" 
            className={`api-button ${activeApi === 'alova' ? 'active' : ''}`}
          >
            <span className="api-icon">🚀</span>
            <div className="api-info">
              <span className="api-name">Alova</span>
              <span className="api-description">Moderna y optimizada</span>
            </div>
          </Link>
        </div>

        {activeApi && (
          <div className="api-info-box">
            {activeApi === 'fetch' && (
              <>
                <h4>Fetch API</h4>
                <p>API nativa de JavaScript para realizar peticiones HTTP. No requiere instalación de dependencias adicionales.</p>
                <ul>
                  <li>✅ Nativo del navegador</li>
                  <li>✅ Basado en Promesas</li>
                  <li>⚠️ Requiere más código para configuración</li>
                </ul>
              </>
            )}
            {activeApi === 'axios' && (
              <>
                <h4>Axios</h4>
                <p>Librería HTTP basada en promesas. Ofrece una sintaxis más simple y características adicionales como interceptores.</p>
                <ul>
                  <li>✅ Sintaxis simplificada</li>
                  <li>✅ Interceptores de peticiones/respuestas</li>
                  <li>✅ Transformación automática de JSON</li>
                  <li>✅ Manejo de errores mejorado</li>
                </ul>
              </>
            )}
            {activeApi === 'alova' && (
              <>
                <h4>Alova</h4>
                <p>Librería moderna de gestión de estado para peticiones HTTP con caché automático y optimizaciones.</p>
                <ul>
                  <li>✅ Caché automático</li>
                  <li>✅ Estados de carga integrados</li>
                  <li>✅ Optimización de peticiones</li>
                  <li>✅ Menor tamaño de bundle</li>
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiSelector;