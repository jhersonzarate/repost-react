import ProductCard from '../components/ProductCard';
import EditProductModal from '../components/EditProductModal';
import ApiSelector from '../components/ApiSelector';
import { 
  obtenerProductosFetch, 
  eliminarProductoFetch,
  actualizarProductoFetch
} from '../services/fetchService';

function InventoryFetch() {
  // Estados principales
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null); // Producto seleccionado para editar

  // Cargar productos al entrar en la página
  useEffect(() => {
    cargarProductos();
  }, []);

  // GET - Obtener lista desde Fetch API
  const cargarProductos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await obtenerProductosFetch();
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
      await eliminarProductoFetch(id);
      setProductos(productos.filter(p => p.id !== id)); // Actualizar lista local
      alert('Producto eliminado correctamente');
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      alert('Error al eliminar el producto');
    }
  };

  // Abrir modal con el producto actual
  const handleEdit = (producto) => {
    setEditingProduct(producto);
  };

  // PUT/PATCH - Guardar cambios
  const handleSave = async (id, data) => {
    try {
      await actualizarProductoFetch(id, data);
      await cargarProductos(); // Refrescar inventario
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      throw err; // Para mostrar error en el modal
    }
  };

  // Filtrar por nombre o categoría
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
          <h1 className="page-title">Inventario con Fetch API</h1>
          <p className="page-description">
            Esta página utiliza Fetch API, el método nativo de JavaScript para peticiones HTTP.
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

        {/* Recargar datos */}
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
          <p>Cargando productos con Fetch API...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {/* Contenido */}
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

          {/* Lista vacía */}
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
            // Renderizar productos
            <div className="products-grid">
              {productosFiltrados.map(producto => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
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

export default InventoryFetch;
