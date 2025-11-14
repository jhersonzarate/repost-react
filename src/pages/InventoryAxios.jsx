import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import EditProductModal from '../components/EditProductModal'; // Modal de edición
import ApiSelector from '../components/ApiSelector';
import { 
  obtenerProductosAxios, 
  eliminarProductoAxios,
  actualizarProductoAxios
} from '../services/axiosService';

function InventoryAxios() {
  // Estados principales
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null); // Producto a editar

  // Cargar productos al iniciar la página
  useEffect(() => {
    cargarProductos();
  }, []);

  // GET - Obtener productos desde Axios
  const cargarProductos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await obtenerProductosAxios();
      setProductos(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  // DELETE - Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) return;

    try {
      await eliminarProductoAxios(id);
      setProductos(productos.filter(p => p.id !== id)); // Actualizar lista
      alert('Producto eliminado correctamente');
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      alert('Error al eliminar el producto');
    }
  };

  // Abrir modal con el producto seleccionado
  const handleEdit = (producto) => {
    setEditingProduct(producto);
  };

  // PUT/PATCH - Guardar cambios del producto
  const handleSave = async (id, data) => {
    try {
      await actualizarProductoAxios(id, data);
      await cargarProductos(); // Refrescar inventario
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      throw err; // Para que el modal muestre error
    }
  };

  // Filtrar productos por nombre o categoría
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
          <h1 className="page-title">Inventario con Axios</h1>
          <p className="page-description">
            Página que usa Axios para realizar operaciones completas de inventario.
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Buscar productos..."
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

      {/* Loading */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando productos con Axios...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {/* Contenido cuando no hay errores */}
      {!loading && !error && (
        <>
          {/* Estadísticas */}
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

          {/* No hay productos */}
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
                  onEdit={handleEdit} // Abrir modal
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

export default InventoryAxios;
