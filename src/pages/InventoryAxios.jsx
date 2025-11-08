import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ApiSelector from '../components/ApiSelector';
import { 
  obtenerProductosAxios, 
  eliminarProductoAxios 
} from '../services/axiosService';

/**
 * Página InventoryAxios
 * Gestión de inventario utilizando Axios
 * Demuestra el uso de la librería Axios para operaciones CRUD
 */
function InventoryAxios() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await obtenerProductosAxios();
      setProductos(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('No se pudieron cargar los productos. Verifique su conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) {
      return;
    }

    try {
      await eliminarProductoAxios(id);
      setProductos(productos.filter(p => p.id !== id));
      alert('Producto eliminado exitosamente');
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      alert('Error al eliminar el producto');
    }
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-page">
      <ApiSelector />

      <div className="inventory-header">
        <div className="header-content">
          <h1 className="page-title">
            Inventario con Axios
          </h1>
          <p className="page-description">
            Esta página utiliza <strong>Axios</strong>, una librería HTTP basada en promesas
            que simplifica las peticiones y ofrece características avanzadas como interceptores
            y transformación automática de datos.
          </p>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <button 
          onClick={cargarProductos} 
          className="btn-reload"
          disabled={loading}
        >
          🔄 Recargar
        </button>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando productos con Axios...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="inventory-stats">
            <div className="stat-card">
              <span className="stat-value">{productosFiltrados.length}</span>
              <span className="stat-label">Productos encontrados</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {productosFiltrados.reduce((sum, p) => sum + p.stock, 0)}
              </span>
              <span className="stat-label">Unidades en stock</span>
            </div>
          </div>

          {productosFiltrados.length === 0 ? (
            <div className="empty-state">
              <p>📦 No se encontraron productos</p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="btn-clear-search"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            <div className="products-grid">
              {productosFiltrados.map(producto => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default InventoryAxios;