import { Link, useLocation } from 'react-router-dom';

/**
 * Selector de método de consumo de API.
 * Muestra y resalta la opción activa según la ruta.
 */
function ApiSelector() {
  const location = useLocation();

  /**
   * Retorna el método activo según la ruta actual.
   */
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
        {/* Título del selector */}
        <h3 className="api-selector-title">
          Seleccione el método de consumo de API:
        </h3>

        {/* Opciones de APIs */}
        <div className="api-buttons">
          {/* Opción Fetch */}
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

          {/* Opción Axios */}
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

          {/* Opción Alova */}
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

        {/* Información contextual según método seleccionado */}
        {activeApi && (
          <div className="api-info-box">
            {activeApi === 'fetch' && (
              <>
                <h4>Fetch API</h4>
                <p>API nativa del navegador para solicitudes HTTP.</p>
                <ul>
                  <li>✅ Nativo del navegador</li>
                  <li>✅ Basado en Promesas</li>
                  <li>⚠️ Requiere más configuración manual</li>
                </ul>
              </>
            )}

            {activeApi === 'axios' && (
              <>
                <h4>Axios</h4>
                <p>Librería HTTP con sintaxis simple e interceptores.</p>
                <ul>
                  <li>✅ Sintaxis clara</li>
                  <li>✅ Interceptores integrados</li>
                  <li>✅ Manejo automático de JSON</li>
                  <li>✅ Gestión de errores más robusta</li>
                </ul>
              </>
            )}

            {activeApi === 'alova' && (
              <>
                <h4>Alova</h4>
                <p>Librería optimizada con caché y estados de carga.</p>
                <ul>
                  <li>✅ Caché automático</li>
                  <li>✅ Estados integrados</li>
                  <li>✅ Optimización de peticiones</li>
                  <li>✅ Ligera y moderna</li>
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
