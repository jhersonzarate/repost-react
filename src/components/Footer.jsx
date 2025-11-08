/**
 * Componente Footer
 * Pie de página con información del proyecto y créditos
 * Diseño simple y profesional
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Control de Inventario</h3>
          <p>Sistema de gestión para tiendas de dispositivos electrónicos</p>
        </div>

        <div className="footer-section">
          <h4>Tecnologías</h4>
          <ul className="footer-list">
            <li>React + Vite</li>
            <li>Supabase</li>
            <li>Fetch, Axios, Alova</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Proyecto Académico</h4>
          <p>Ingeniería de Sistemas - 6º Ciclo</p>
          <p>Desarrollo de Aplicaciones Web</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} - Proyecto Final de Curso</p>
      </div>
    </footer>
  );
}

export default Footer;