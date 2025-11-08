/**
 * Servicio de consumo de API REST usando Fetch API nativo
 * Este archivo implementa las operaciones CRUD utilizando fetch()
 * que es el método estándar de JavaScript para realizar peticiones HTTP
 */

// Configuración base de la API REST de Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const BASE_URL = `${SUPABASE_URL}/rest/v1`;

// Headers requeridos por Supabase para autenticación
const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation' // Retorna los datos insertados/actualizados
};

/**
 * Obtener todos los productos con información del proveedor
 * Usamos el parámetro 'select' para hacer un JOIN con la tabla proveedores
 */
export const obtenerProductosFetch = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/productos?select=*,proveedores(nombre,contacto)&order=id.desc`,
      { 
        method: 'GET',
        headers 
      }
    );

    // Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error con Fetch API al obtener productos:', error);
    throw error;
  }
};

/**
 * Agregar un nuevo producto
 * El método POST envía los datos en el cuerpo de la petición
 */
export const agregarProductoFetch = async (producto) => {
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
    console.error('Error con Fetch API al agregar producto:', error);
    throw error;
  }
};

/**
 * Actualizar un producto existente
 * Usamos PATCH para actualización parcial y filtramos por ID
 */
export const actualizarProductoFetch = async (id, producto) => {
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
    console.error('Error con Fetch API al actualizar producto:', error);
    throw error;
  }
};

/**
 * Eliminar un producto
 * DELETE requiere especificar el ID en la URL con el formato eq.{id}
 */
export const eliminarProductoFetch = async (id) => {
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
    console.error('Error con Fetch API al eliminar producto:', error);
    throw error;
  }
};

/**
 * Obtener proveedores
 */
export const obtenerProveedoresFetch = async () => {
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
    console.error('Error con Fetch API al obtener proveedores:', error);
    throw error;
  }
};