/**
 * Servicio de consumo de API REST usando Alova
 * NOTA: Para este proyecto usaremos fetch nativo encapsulado
 * debido a incompatibilidades con versiones de Alova
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const BASE_URL = `${SUPABASE_URL}/rest/v1`;

// Headers requeridos por Supabase
const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation'
};

/**
 * Obtener todos los productos con información del proveedor
 */
export const obtenerProductosAlova = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/productos?select=*,proveedores(nombre,contacto)&order=id.desc`,
      { 
        method: 'GET',
        headers 
      }
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error con Alova al obtener productos:', error);
    throw error;
  }
};

/**
 * Agregar un nuevo producto
 */
export const agregarProductoAlova = async (producto) => {
  try {
    const response = await fetch(`${BASE_URL}/productos`, {
      method: 'POST',
      headers,
      body: JSON.stringify(producto)
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error con Alova al agregar producto:', error);
    throw error;
  }
};

/**
 * Actualizar un producto existente
 */
export const actualizarProductoAlova = async (id, producto) => {
  try {
    const response = await fetch(`${BASE_URL}/productos?id=eq.${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(producto)
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error con Alova al actualizar producto:', error);
    throw error;
  }
};

/**
 * Eliminar un producto
 */
export const eliminarProductoAlova = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/productos?id=eq.${id}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error con Alova al eliminar producto:', error);
    throw error;
  }
};

/**
 * Obtener proveedores
 */
export const obtenerProveedoresAlova = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/proveedores?order=nombre.asc`,
      { 
        method: 'GET',
        headers 
      }
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error con Alova al obtener proveedores:', error);
    throw error;
  }
};