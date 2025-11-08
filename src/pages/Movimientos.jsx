import { useState, useEffect } from 'react';
import { 
  obtenerMovimientos, 
  registrarMovimiento,
  obtenerProductos,
  actualizarProducto
} from '../services/supabaseClient';

/**
 * Página Movimientos
 * Gestión de movimientos de inventario (entradas y salidas)
 * Permite registrar ajustes de stock con observaciones
 */
function Movimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState('Todos');

  // Estado del formulario
  const [formData, setFormData] = useState({
    producto_id: '',
    tipo: 'Entrada',
    cantidad: 1,
    observacion: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [movimientosData, productosData] = await Promise.all([
        obtenerMovimientos(),
        obtenerProductos()
      ]);
      setMovimientos(movimientosData);
      setProductos(productosData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.producto_id) {
      alert('Debe seleccionar un producto');
      return;
    }

    // Obtener el producto seleccionado
    const producto = productos.find(p => p.id === parseInt(formData.producto_id));
    
    if (!producto) {
      alert('Producto no encontrado');
      return;
    }

    const cantidad = parseInt(formData.cantidad);

    // Validar para salidas que no exceda el stock
    if (formData.tipo === 'Salida' && cantidad > producto.stock) {
      alert(`Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.`);
      return;
    }

    try {
      // Registrar el movimiento
      const movimientoData = {
        producto_id: parseInt(formData.producto_id),
        tipo: formData.tipo,
        cantidad: cantidad,
        observacion: formData.observacion.trim() || null,
        fecha_movimiento: new Date().toISOString()
      };

      await registrarMovimiento(movimientoData);

      // Actualizar el stock según el tipo de movimiento
      let nuevoStock;
      if (formData.tipo === 'Entrada') {
        nuevoStock = producto.stock + cantidad;
      } else {
        nuevoStock = producto.stock - cantidad;
      }

      await actualizarProducto(producto.id, { stock: nuevoStock });

      alert('Movimiento registrado exitosamente');
      
      // Limpiar formulario y recargar datos
      setFormData({
        producto_id: '',
        tipo: 'Entrada',
        cantidad: 1,
        observacion: ''
      });
      setShowForm(false);
      cargarDatos();
    } catch (error) {
      console.error('Error al registrar movimiento:', error);
      alert('Error al registrar el movimiento');
    }
  };

  // Formatear fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filtrar movimientos por tipo
  const movimientosFiltrados = filtroTipo === 'Todos' 
    ? movimientos 
    : movimientos.filter(m => m.tipo === filtroTipo);

  // Calcular estadísticas
  const calcularEstadisticas = () => {
    const totalEntradas = movimientos
      .filter(m => m.tipo === 'Entrada')
      .reduce((sum, m) => sum + m.cantidad, 0);
    
    const totalSalidas = movimientos
      .filter(m => m.tipo === 'Salida')
      .reduce((sum, m) => sum + m.cantidad, 0);

    return { totalEntradas, totalSalidas };
  };

  const estadisticas = calcularEstadisticas();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando movimientos...</p>
      </div>
    );
  }

  return (
    <div className="movimientos-page">
      <div className="page-header">
        <h1 className="page-title">📊 Movimientos de Inventario</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? '❌ Cancelar' : '➕ Nuevo Movimiento'}
        </button>
      </div>

      {/* Estadísticas */}
      <div className="stats-container">
        <div className="stat-card stat-entrada">
          <span className="stat-value">{estadisticas.totalEntradas}</span>
          <span className="stat-label">⬆️ Total Entradas</span>
        </div>
        <div className="stat-card stat-salida">
          <span className="stat-value">{estadisticas.totalSalidas}</span>
          <span className="stat-label">⬇️ Total Salidas</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{movimientos.length}</span>
          <span className="stat-label">Total Movimientos</span>
        </div>
      </div>

      {/* Formulario de nuevo movimiento */}
      {showForm && (
        <div className="form-card">
          <h2>Registrar Nuevo Movimiento</h2>
          <form onSubmit={handleSubmit} className="movimiento-form">
            <div className="form-group">
              <label htmlFor="producto_id">Producto *</label>
              <select
                id="producto_id"
                name="producto_id"
                value={formData.producto_id}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Seleccione un producto</option>
                {productos.map(producto => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre} - Stock actual: {producto.stock}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tipo">Tipo de Movimiento *</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="Entrada">⬆️ Entrada</option>
                  <option value="Salida">⬇️ Salida</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cantidad">Cantidad *</label>
                <input
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="observacion">Observación</label>
              <textarea
                id="observacion"
                name="observacion"
                value={formData.observacion}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Motivo del movimiento (opcional)"
                rows="3"
              />
            </div>

            <button type="submit" className="btn-submit">
              💾 Registrar Movimiento
            </button>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div className="filter-container">
        <label>Filtrar por tipo:</label>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filtroTipo === 'Todos' ? 'active' : ''}`}
            onClick={() => setFiltroTipo('Todos')}
          >
            Todos
          </button>
          <button
            className={`filter-btn ${filtroTipo === 'Entrada' ? 'active' : ''}`}
            onClick={() => setFiltroTipo('Entrada')}
          >
            ⬆️ Entradas
          </button>
          <button
            className={`filter-btn ${filtroTipo === 'Salida' ? 'active' : ''}`}
            onClick={() => setFiltroTipo('Salida')}
          >
            ⬇️ Salidas
          </button>
        </div>
      </div>

      {/* Tabla de movimientos */}
      <div className="table-container">
        <h2>Historial de Movimientos</h2>
        {movimientosFiltrados.length === 0 ? (
          <div className="empty-state">
            <p>📋 No hay movimientos registrados</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {movimientosFiltrados.map(movimiento => (
                <tr key={movimiento.id}>
                  <td>{movimiento.id}</td>
                  <td>{formatearFecha(movimiento.fecha_movimiento)}</td>
                  <td>{movimiento.productos?.nombre || 'N/A'}</td>
                  <td>
                    <span className={`badge badge-${movimiento.tipo.toLowerCase()}`}>
                      {movimiento.tipo === 'Entrada' ? '⬆️' : '⬇️'} {movimiento.tipo}
                    </span>
                  </td>
                  <td>{movimiento.cantidad}</td>
                  <td>{movimiento.observacion || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Movimientos;