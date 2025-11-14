// Página de inventario con Alova
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import EditProductModal from '../components/EditProductModal'; // Modal de edición
import ApiSelector from '../components/ApiSelector';
import { 
  obtenerProductosAlova, 
  eliminarProductoAlova,
  actualizarProductoAlova
} from '../services/alovaService';

// Página InventoryAlova (CRUD completo con Alova)
function InventoryAlova() {
  const [productos, setProductos] = useState([]);      // Lista de productos
  const [loading, setLoading] = useState(true);        // Estado de carga
  const [error, setError] = useState('');              // Mensaje de error
  const [searchTerm, setSearchTerm] = useState('');    // Búsqueda
  const [editingProduct, setEditingProduct] = useState(null); // Producto a editar

  useEffect(() => {
    cargarProductos(); // Cargar al inicio
  }, []);

  // GET - Cargar productos desde Alova
  const cargarProductos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await obtenerProductosAlova();
      setProductos(data);
    } catch (err) {
      setError('No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  // DELETE - Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar producto?')) return;

    try {
      await eliminarProductoAlova(id);
      setProductos(productos.filter(p => p.id !== id));
      alert('Producto eliminado');
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  // Abrir modal de edición
  const handleEdit = (producto) => {
    setEditingProduct(producto);
  };

  // PUT/PATCH - Guardar cambios
  const handleSave = async (id, data) => {
    try {
      await actualizarProductoAlova(id, data);
      await cargarProductos(); // Recargar inventario
    } catch (err) {
      throw err;
    }
  };

  // Filtrar por texto
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-page">
      <ApiSelector />

      {/* Encabezado */}
      <div className="inventory-header">
        <div className="header-content">
          <h1 className="page-title">Inventario con Alova</h1>
          <p className="page-description">
            Ejemplo de CRUD usando Alova con caché y optimización.
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Botón recargar */}
        <button 
          onClick={cargarProductos} 
          className="btn-reload"
          disabled={loading}
        >
          🔄 Recargar
        </button>
      </div>

      {/* Estado cargando */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      )}

      {/* Estado error */}
      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {/* Listado de productos */}
      {!loading && !error && (
        <>
          {/* Estadísticas */}
          <div className="inventory-stats">
            <div className="stat-card">
              <span className="stat-value">{productosFiltrados.length}</span>
              <span className="stat-label">Productos</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {productosFiltrados.reduce((sum, p) => sum + p.stock, 0)}
              </span>
              <span className="stat-label">Stock total</span>
            </div>
          </div>

          {/* Vacío o listado */}
          {productosFiltrados.length === 0 ? (
            <div className="empty-state">
              <p>📦 No hay productos</p>
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
                  onEdit={handleEdit} // Pasar acción de editar
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal de edición */}
      {editingProduct && (
        <EditProductModal
          producto={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default InventoryAlova;
