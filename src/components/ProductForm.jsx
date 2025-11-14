import { useState, useEffect } from 'react';
import { obtenerProveedores } from '../services/supabaseClient';

function ProductForm({ onSubmit, apiType = '' }) {

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    proveedor_id: '',
    imagen_url: '',
    descripcion: ''
  });

  // Listado de proveedores y estados auxiliares
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar proveedores al montar el componente
  useEffect(() => {
    cargarProveedores();
  }, []);

  // Obtener proveedores desde Supabase
  const cargarProveedores = async () => {
    try {
      const data = await obtenerProveedores();
      setProveedores(data);
    } catch (err) {
      console.error('Error al cargar proveedores:', err);
      setError('No se pudieron cargar los proveedores');
    }
  };

  // Actualizar campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validaciones básicas del formulario
  const validarFormulario = () => {
    if (!formData.nombre.trim()) {
      setError('El nombre del producto es obligatorio'); return false;
    }
    if (!formData.categoria.trim()) {
      setError('La categoría es obligatoria'); return false;
    }
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      setError('El precio debe ser mayor a 0'); return false;
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      setError('El stock no puede ser negativo'); return false;
    }
    if (!formData.proveedor_id) {
      setError('Debe seleccionar un proveedor'); return false;
    }
    return true;
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar antes de continuar
    if (!validarFormulario()) return;

    setLoading(true);

    try {
      // Formatear valores antes del envío
      const productoData = {
        nombre: formData.nombre.trim(),
        categoria: formData.categoria.trim(),
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        proveedor_id: parseInt(formData.proveedor_id),
        imagen_url: formData.imagen_url.trim() || null,
        descripcion: formData.descripcion.trim() || null
      };

      await onSubmit(productoData);

      // Reiniciar formulario
      setFormData({
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        proveedor_id: '',
        imagen_url: '',
        descripcion: ''
      });

      alert('Producto agregado exitosamente');
    } catch (err) {
      console.error('Error al agregar producto:', err);
      setError('Error al agregar el producto. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2 className="form-title">
        Agregar Nuevo Producto {apiType && ` - ${apiType}`}
      </h2>

      {/* Mensaje de error */}
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="product-form">

        {/* Nombre */}
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">Nombre del Producto *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-input"
            placeholder="Ej: iPhone 15 Pro Max"
            required
          />
        </div>

        {/* Categoría */}
        <div className="form-group">
          <label htmlFor="categoria" className="form-label">Categoría *</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
            <option value="Accesorio">Accesorio</option>
            <option value="Audio">Audio</option>
            <option value="Componente">Componente</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Precio y Stock */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="precio" className="form-label">Precio (S/) *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="form-input"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock" className="form-label">Stock *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="form-input"
              placeholder="0"
              min="0"
              required
            />
          </div>
        </div>

        {/* Proveedor */}
        <div className="form-group">
          <label htmlFor="proveedor_id" className="form-label">Proveedor *</label>
          <select
            id="proveedor_id"
            name="proveedor_id"
            value={formData.proveedor_id}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map(proveedor => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* URL imagen */}
        <div className="form-group">
          <label htmlFor="imagen_url" className="form-label">URL de la Imagen</label>
          <input
            type="text"
            id="imagen_url"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
            className="form-input"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="form-input form-textarea"
            placeholder="Descripción técnica del producto"
            rows="4"
          />
        </div>

        {/* Botón */}
        <div className="form-actions">
          <button 
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Guardando...' : '➕ Agregar Producto'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default ProductForm;
