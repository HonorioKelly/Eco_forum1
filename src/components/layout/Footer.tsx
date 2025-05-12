import { Link } from "react-router-dom";
import { AirVent } from "lucide-react";
import "./Footer.css"; // importando o CSS externo

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <AirVent className="footer-icon" />
          <p className="footer-text">
            &copy; {new Date().getFullYear()} EcoConnect. Todos os direitos reservados.
          </p>
        </div>
        <div className="footer-links">
          <Link to="/about" className="footer-link">Sobre nós</Link>
          <Link to="/privacy" className="footer-link">Privacidade</Link>
          <Link to="/terms" className="footer-link">Termos</Link>
        </div>
      </div>
    </footer>
  );
}
