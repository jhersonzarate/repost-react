import { useState, useEffect } from 'react';
import { obtenerProveedores } from '../services/supabaseClient';

function EditProductModal({ producto, onClose, onSave }) {
  // Estado local del formulario, inicializado con los valores del producto
  const [formData, setFormData] = useState({
    nombre: producto.nombre || '',
    categoria: producto.categoria || '',
    precio: producto.precio || '',
    stock: producto.stock || '',
    proveedor_id: producto.proveedor_id || '',
    imagen_url: producto.imagen_url || '',
    descripcion: producto.descripcion || ''
  });

  // Listado de proveedores cargados desde Supabase
  const [proveedores, setProveedores] = useState([]);

  // Estados de control
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar proveedores al montar el componente
  useEffect(() => {
    cargarProveedores();
  }, []);

  // Consulta de proveedores desde Supabase
  const cargarProveedores = async () => {
    try {
      const data = await obtenerProveedores();
      setProveedores(data);
    } catch (err) {
      console.error('Error al cargar proveedores:', err);
      setError('No se pudieron cargar los proveedores');
    }
  };

  // Manejo de cambios en cualquier input del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validaciones básicas antes de enviar los datos
  const validarFormulario = () => {
    if (!formData.nombre.trim()) {
      setError('El nombre del producto es obligatorio');
      return false;
    }
    if (!formData.categoria.trim()) {
      setError('La categoría es obligatoria');
      return false;
    }
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      setError('El precio debe ser mayor a 0');
      return false;
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      setError('El stock no puede ser negativo');
      return false;
    }
    if (!formData.proveedor_id) {
      setError('Debe seleccionar un proveedor');
      return false;
    }
    return true;
  };

  // Envío del formulario y llamado al callback de guardado
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación previa
    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      // Preparar datos limpios para la actualización
      const productoData = {
        nombre: formData.nombre.trim(),
        categoria: formData.categoria.trim(),
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        proveedor_id: parseInt(formData.proveedor_id),
        imagen_url: formData.imagen_url.trim() || null,
        descripcion: formData.descripcion.trim() || null
      };

      // Llamada al método externo de actualización
      await onSave(producto.id, productoData);
      
      alert('✅ Producto actualizado exitosamente');
      onClose();
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      setError('Error al actualizar el producto. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="modal-content">
        {/* Encabezado del modal */}
        <div className="modal-header">
          <h2>✏️ Editar Producto</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✖️
          </button>
        </div>

        {/* Mensaje de validación o error */}
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {/* Formulario principal */}
        <div className="modal-body">
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="edit-nombre" className="form-label">
              Nombre del Producto *
            </label>
            <input
              type="text"
              id="edit-nombre"
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
            <label htmlFor="edit-categoria" className="form-label">
              Categoría *
            </label>
            <select
              id="edit-categoria"
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

          {/* Precio + Stock */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-precio" className="form-label">
                Precio (S/) *
              </label>
              <input
                type="number"
                id="edit-precio"
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
              <label htmlFor="edit-stock" className="form-label">
                Stock *
              </label>
              <input
                type="number"
                id="edit-stock"
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
            <label htmlFor="edit-proveedor" className="form-label">
              Proveedor *
            </label>
            <select
              id="edit-proveedor"
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

          {/* URL de imagen */}
          <div className="form-group">
            <label htmlFor="edit-imagen" className="form-label">
              URL de la Imagen
            </label>
            <input
              type="text"
              id="edit-imagen"
              name="imagen_url"
              value={formData.imagen_url}
              onChange={handleChange}
              className="form-input"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label htmlFor="edit-descripcion" className="form-label">
              Descripción
            </label>
            <textarea
              id="edit-descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="form-input form-textarea"
              placeholder="Descripción técnica del producto"
              rows="3"
            />
          </div>
        </div>

        {/* Acciones del modal */}
        <div className="modal-footer">
          <button 
            type="button"
            className="btn-secondary" 
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            type="button"
            className="btn-submit" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '⏳ Guardando...' : '💾 Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
