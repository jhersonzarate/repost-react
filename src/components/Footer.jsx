function Footer() {
  // Obtiene el año actual dinámicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Contenedor principal del footer */}
      <div className="footer-container">

        {/* Sección: descripción del sistema */}
        <div className="footer-section">
          <h3>Control de Inventario</h3>
          <p>Sistema de gestión para tiendas de dispositivos electrónicos</p>
        </div>

        {/* Sección: tecnologías usadas */}
        <div className="footer-section">
          <h4>Tecnologías</h4>
          <ul className="footer-list">
            <li>React + Vite</li>
            <li>Supabase</li>
            <li>Fetch, Axios, Alova</li>
          </ul>
        </div>

        {/* Sección: información académica */}
        <div className="footer-section">
          <h4>Proyecto Académico</h4>
          <p>Ingeniería de Sistemas - 6º Ciclo</p>
          <p>Desarrollo de Aplicaciones Web</p>
        </div>
      </div>

      {/* Línea inferior con el año actual */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} - Proyecto de Curso</p>
      </div>
    </footer>
  );
}

export default Footer;
