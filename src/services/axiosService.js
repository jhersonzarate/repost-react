import axios from 'axios';

/**
 * Servicio de consumo de API REST usando Axios
 * Axios es una librería popular que simplifica las peticiones HTTP
 * y ofrece características adicionales como interceptores y manejo automático de JSON
 */

// Configuración base de Axios para Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

// Creamos una instancia de Axios con configuración predeterminada
const axiosInstance = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Prefer': 'return=representation'
  }
});

/**
 * Interceptor de respuestas para manejo centralizado de errores
 * Esto nos permite capturar y procesar errores de forma uniforme
 */
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en petición Axios:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Obtener todos los productos con información del proveedor
 * Axios maneja automáticamente la conversión de JSON
 */
export const obtenerProductosAxios = async () => {
  try {
    const response = await axiosInstance.get(
      '/productos?select=*,proveedores(nombre,contacto)&order=id.desc'
    );
    return response.data;
  } catch (error) {
    console.error('Error con Axios al obtener productos:', error);
    throw error;
  }
};

/**
 * Agregar un nuevo producto
 * Axios convierte automáticamente el objeto JavaScript a JSON
 */
export const agregarProductoAxios = async (producto) => {
  try {
    const response = await axiosInstance.post('/productos', producto);
    return response.data;
  } catch (error) {
    console.error('Error con Axios al agregar producto:', error);
    throw error;
  }
};

/**
 * Actualizar un producto existente
 * Usamos el método patch para actualizaciones parciales
 */
export const actualizarProductoAxios = async (id, producto) => {
  try {
    const response = await axiosInstance.patch(
      `/productos?id=eq.${id}`,
      producto
    );
    return response.data;
  } catch (error) {
    console.error('Error con Axios al actualizar producto:', error);
    throw error;
  }
};

/**
 * Eliminar un producto
 * Delete es más simple con Axios gracias a su sintaxis limpia
 */
export const eliminarProductoAxios = async (id) => {
  try {
    await axiosInstance.delete(`/productos?id=eq.${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error con Axios al eliminar producto:', error);
    throw error;
  }
};

/**
 * Obtener proveedores
 */
export const obtenerProveedoresAxios = async () => {
  try {
    const response = await axiosInstance.get('/proveedores?order=nombre.asc');
    return response.data;
  } catch (error) {
    console.error('Error con Axios al obtener proveedores:', error);
    throw error;
  }
};