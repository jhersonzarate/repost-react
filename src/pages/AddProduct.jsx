import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { agregarProducto } from '../services/supabaseClient';

function AddProduct() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  /**
   * Envía los datos del producto a Supabase.
   * Muestra un indicador de carga y redirige tras guardar.
   */
  const handleSubmit = async (productoData) => {
    setSubmitting(true);
    try {
      await agregarProducto(productoData);

      // Redirigir al inventario tras registrar el producto
      setTimeout(() => {
        navigate('/fetch');
      }, 1500);
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-product-page">

      {/* Encabezado de la página */}
      <div className="page-header">
        <h1 className="page-title">Agregar Nuevo Producto</h1>
        <p className="page-description">
          Complete el formulario para registrar un nuevo producto en el inventario.
          Los campos marcados con * son obligatorios.
        </p>
      </div>

      {/* Formulario principal */}
      <div className="form-container">
        <ProductForm 
          onSubmit={handleSubmit}
          apiType="Supabase Client"
        />
      </div>

      {/* Modal de carga mientras se envían los datos */}
      {submitting && (
        <div className="overlay">
          <div className="loading-modal">
            <div className="spinner"></div>
            <p>Guardando producto...</p>
          </div>
        </div>
      )}

      {/* Recomendaciones para el usuario */}
      <div className="info-box">
        <h3>📌 Instrucciones</h3>
        <ul>
          <li>Asegúrese de seleccionar un proveedor existente</li>
          <li>La URL de la imagen debe ser válida y accesible</li>
          <li>El precio debe ser mayor a 0</li>
          <li>El stock no puede ser negativo</li>
        </ul>
      </div>

    </div>
  );
}

export default AddProduct;
