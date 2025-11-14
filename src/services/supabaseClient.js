import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Validación de variables de entorno
if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_KEY no están configuradas');
}

// Creación del cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * FUNCIONES CRUD PARA PRODUCTOS
 */

// Obtener todos los productos con información del proveedor
export const obtenerProductos = async () => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*, proveedores(nombre, contacto)')
      .order('id', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    throw error;
  }
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (id) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*, proveedores(nombre, contacto)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener producto:', error.message);
    throw error;
  }
};

// Agregar un nuevo producto
export const agregarProducto = async (producto) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .insert([producto])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al agregar producto:', error.message);
    throw error;
  }
};

// Actualizar un producto existente
export const actualizarProducto = async (id, producto) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .update(producto)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al actualizar producto:', error.message);
    throw error;
  }
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
  try {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    throw error;
  }
};

/**
 * FUNCIONES PARA PROVEEDORES
 */
export const obtenerProveedores = async () => {
  try {
    const { data, error } = await supabase
      .from('proveedores')
      .select('*')
      .order('nombre', { ascending: true });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener proveedores:', error.message);
    throw error;
  }
};

/**
 * FUNCIONES PARA VENTAS
 */
export const obtenerVentas = async () => {
  try {
    const { data, error } = await supabase
      .from('ventas')
      .select('*, productos(nombre, precio), usuarios(nombre)')
      .order('fecha_venta', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener ventas:', error.message);
    throw error;
  }
};

export const registrarVenta = async (venta) => {
  try {
    const { data, error } = await supabase
      .from('ventas')
      .insert([venta])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al registrar venta:', error.message);
    throw error;
  }
};

/**
 * FUNCIONES PARA MOVIMIENTOS DE INVENTARIO
 */
export const obtenerMovimientos = async () => {
  try {
    const { data, error } = await supabase
      .from('movimientos_inventario')
      .select('*, productos(nombre)')
      .order('fecha_movimiento', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener movimientos:', error.message);
    throw error;
  }
};

export const registrarMovimiento = async (movimiento) => {
  try {
    const { data, error } = await supabase
      .from('movimientos_inventario')
      .insert([movimiento])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al registrar movimiento:', error.message);
    throw error;
  }
};

/**
 * FUNCIONES PARA USUARIOS
 */
export const obtenerUsuarios = async () => {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('nombre', { ascending: true });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    throw error;
  }
};
