import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg wc-navbar px-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          ⚽ ÁLBUM <span style={{ color: 'var(--wc-yellow)' }}>2026</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto gap-1">
            <li className="nav-item">
              <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/">
                <i className="fa fa-house me-1"></i> Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/coleccion">
                <i className="fa fa-star me-1"></i> Mi Colección
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/equipos">
                <i className="fa fa-shield me-1"></i> Equipos
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}