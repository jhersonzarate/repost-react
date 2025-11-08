import { useState, useEffect } from 'react';
import { 
  obtenerVentas, 
  registrarVenta,
  obtenerProductos,
  obtenerUsuarios,
  actualizarProducto
} from '../services/supabaseClient';

/**
 * Página Ventas
 * Gestión y registro de ventas realizadas
 * Actualiza automáticamente el stock del producto vendido
 */
function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Estado del formulario de nueva venta
  const [formData, setFormData] = useState({
    producto_id: '',
    usuario_id: '',
    cantidad: 1
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [ventasData, productosData, usuariosData] = await Promise.all([
        obtenerVentas(),
        obtenerProductos(),
        obtenerUsuarios()
      ]);
      setVentas(ventasData);
      setProductos(productosData);
      setUsuarios(usuariosData);
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

    // Validar que se haya seleccionado un producto
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

    // Validar stock disponible
    const cantidadVenta = parseInt(formData.cantidad);
    if (cantidadVenta > producto.stock) {
      alert(`Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.`);
      return;
    }

    // Calcular total
    const total = producto.precio * cantidadVenta;

    try {
      // Registrar la venta
      const ventaData = {
        producto_id: parseInt(formData.producto_id),
        usuario_id: parseInt(formData.usuario_id),
        cantidad: cantidadVenta,
        total: total,
        fecha_venta: new Date().toISOString()
      };

      await registrarVenta(ventaData);

      // Actualizar el stock del producto
      const nuevoStock = producto.stock - cantidadVenta;
      await actualizarProducto(producto.id, { stock: nuevoStock });

      alert('Venta registrada exitosamente');
      
      // Limpiar formulario y recargar datos
      setFormData({
        producto_id: '',
        usuario_id: '',
        cantidad: 1
      });
      setShowForm(false);
      cargarDatos();
    } catch (error) {
      console.error('Error al registrar venta:', error);
      alert('Error al registrar la venta');
    }
  };

  // Formatear moneda
  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(valor);
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

  // Calcular estadísticas
  const calcularEstadisticas = () => {
    const totalVentas = ventas.reduce((sum, v) => sum + parseFloat(v.total), 0);
    const totalUnidades = ventas.reduce((sum, v) => sum + v.cantidad, 0);
    return { totalVentas, totalUnidades };
  };

  const estadisticas = calcularEstadisticas();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando ventas...</p>
      </div>
    );
  }

  return (
    <div className="ventas-page">
      <div className="page-header">
        <h1 className="page-title">💰 Registro de Ventas</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? '❌ Cancelar' : '➕ Nueva Venta'}
        </button>
      </div>

      {/* Estadísticas */}
      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-value">{ventas.length}</span>
          <span className="stat-label">Total de Ventas</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{estadisticas.totalUnidades}</span>
          <span className="stat-label">Unidades Vendidas</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{formatearMoneda(estadisticas.totalVentas)}</span>
          <span className="stat-label">Ingresos Totales</span>
        </div>
      </div>

      {/* Formulario de nueva venta */}
      {showForm && (
        <div className="form-card">
          <h2>Registrar Nueva Venta</h2>
          <form onSubmit={handleSubmit} className="venta-form">
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
                  <option 
                    key={producto.id} 
                    value={producto.id}
                    disabled={producto.stock === 0}
                  >
                    {producto.nombre} - Stock: {producto.stock} - {formatearMoneda(producto.precio)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="usuario_id">Usuario/Vendedor *</label>
              <select
                id="usuario_id"
                name="usuario_id"
                value={formData.usuario_id}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Seleccione un usuario</option>
                {usuarios.map(usuario => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre} - {usuario.rol}
                  </option>
                ))}
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

            {formData.producto_id && (
              <div className="total-preview">
                <strong>Total estimado: </strong>
                {formatearMoneda(
                  productos.find(p => p.id === parseInt(formData.producto_id))?.precio * formData.cantidad || 0
                )}
              </div>
            )}

            <button type="submit" className="btn-submit">
              💾 Registrar Venta
            </button>
          </form>
        </div>
      )}

      {/* Tabla de ventas */}
      <div className="table-container">
        <h2>Historial de Ventas</h2>
        {ventas.length === 0 ? (
          <div className="empty-state">
            <p>📋 No hay ventas registradas</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Vendedor</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(venta => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{formatearFecha(venta.fecha_venta)}</td>
                  <td>{venta.productos?.nombre || 'N/A'}</td>
                  <td>{venta.usuarios?.nombre || 'N/A'}</td>
                  <td>{venta.cantidad}</td>
                  <td className="text-success">{formatearMoneda(venta.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Ventas;