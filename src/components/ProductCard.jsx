function ProductCard({ producto, onDelete, onEdit }) {
  // Formatear el precio en formato de moneda
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(precio);
  };

  // Determinar el estado del stock
  const obtenerEstadoStock = (stock) => {
    if (stock === 0) return { texto: 'Agotado', clase: 'stock-agotado' };
    if (stock < 10) return { texto: 'Stock Bajo', clase: 'stock-bajo' };
    return { texto: 'Disponible', clase: 'stock-disponible' };
  };

  const estadoStock = obtenerEstadoStock(producto.stock);

  return (
    <div className="product-card">
      {/* Imagen del producto */}
      <div className="product-image">
        {producto.imagen_url ? (
          <img 
            src={producto.imagen_url} 
            alt={producto.nombre}
            onError={(e) => {
              // Imagen por defecto si falla la carga
              e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
            }}
          />
        ) : (
          <div className="product-image-placeholder">
            <span>📱</span>
            <p>Sin imagen</p>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="product-info">
        <div className="product-header">
          <h3 className="product-name">{producto.nombre}</h3>
          <span className={`product-stock-badge ${estadoStock.clase}`}>
            {estadoStock.texto}
          </span>
        </div>

        <p className="product-category">{producto.categoria}</p>
        
        {producto.descripcion && (
          <p className="product-description">{producto.descripcion}</p>
        )}

        {/* Información del proveedor */}
        {producto.proveedores && (
          <div className="product-supplier">
            <span className="supplier-label">Proveedor:</span>
            <span className="supplier-name">{producto.proveedores.nombre}</span>
          </div>
        )}

        {/* Precio y stock */}
        <div className="product-details">
          <div className="product-price">
            <span className="price-label">Precio:</span>
            <span className="price-value">{formatearPrecio(producto.precio)}</span>
          </div>
          <div className="product-stock">
            <span className="stock-label">Stock:</span>
            <span className="stock-value">{producto.stock} unidades</span>
          </div>
        </div>

        {/* Botones de acción - ACTUALIZADOS CON EDITAR */}
        <div className="product-actions">
          {/* ✅ NUEVO: Botón de editar */}
          <button 
            className="btn-edit"
            onClick={() => onEdit(producto)}
            aria-label="Editar producto"
          >
            ✏️ Editar
          </button>

          {/* Botón de eliminar existente */}
          <button 
            className="btn-delete"
            onClick={() => onDelete(producto.id)}
            aria-label="Eliminar producto"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;