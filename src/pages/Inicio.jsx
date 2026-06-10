import { Link } from 'react-router-dom'
import { EQUIPOS } from '../data/figuritas'

export default function Inicio({ figuritas }) {
  const total     = figuritas.length
  const obtenidas = figuritas.filter(f => f.obtenida).length
  const faltantes = total - obtenidas
  const favoritas = figuritas.filter(f => f.favorita).length
  const pct       = total ? Math.round((obtenidas / total) * 100) : 0

  const equiposCompletos = EQUIPOS.filter(eq => {
    const figs = figuritas.filter(f => f.equipo === eq.id)
    return figs.length > 0 && figs.every(f => f.obtenida)
  })

  // Top 4 equipos por progreso
  const topEquipos = EQUIPOS.map(eq => {
    const figs = figuritas.filter(f => f.equipo === eq.id)
    const got  = figs.filter(f => f.obtenida).length
    const pct  = figs.length ? Math.round((got / figs.length) * 100) : 0
    return { ...eq, got, total: figs.length, pct }
  })
  .filter(e => e.total > 0)
  .sort((a, b) => b.pct - a.pct)
  .slice(0, 6)

  return (
    <>
      {/* Hero */}
      <div className="hero-banner">
        <div className="container">
          <p className="hero-subtitle mb-2">Official Sticker Collection</p>
          <h1>MI ÁLBUM<br /><span>MUNDIAL 2026</span></h1>
          <p className="mt-3" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', maxWidth: 420 }}>
            Lleva el control de tu colección de figuritas del torneo más grande del planeta.
          </p>
          <div className="d-flex gap-2 mt-4 flex-wrap">
            <Link to="/coleccion" className="btn-wc-primary">
              <i className="fa fa-star me-2"></i>Ver Colección
            </Link>
            <Link to="/equipos" className="btn-wc-secondary">
              <i className="fa fa-shield me-2"></i>Equipos
            </Link>
          </div>
        </div>
      </div>

      <div className="rainbow-stripe"></div>

      <div className="container py-4">
        {/* Stats */}
        <h2 className="section-title">RESUMEN <span>GENERAL</span></h2>

        <div className="row g-3 mb-4">
          {[
            { label: 'Total figuritas', val: total,     color: 'blue',   icon: 'fa-layer-group' },
            { label: 'Obtenidas',       val: obtenidas, color: 'green',  icon: 'fa-check-circle' },
            { label: 'Faltantes',       val: faltantes, color: 'red',    icon: 'fa-circle-xmark' },
            { label: 'Favoritas',       val: favoritas, color: 'yellow', icon: 'fa-heart' },
            { label: 'Equipos completos', val: equiposCompletos.length, color: 'purple', icon: 'fa-trophy' },
          ].map(s => (
            <div key={s.label} className="col-6 col-md-4 col-lg">
              <div className={`stat-card ${s.color}`}>
                <i className={`fa ${s.icon} mb-2`} style={{ fontSize: '1.2rem', opacity: 0.6 }}></i>
                <div className="stat-number">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Progreso general */}
        <div className="stat-card mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Progreso del álbum
            </span>
            <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: 'var(--wc-yellow)' }}>{pct}%</span>
          </div>
          <div className="wc-progress">
            <div className="wc-progress-bar" style={{ width: `${pct}%` }}></div>
          </div>
          <div className="mt-2" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
            {obtenidas} de {total} figuritas obtenidas
          </div>
        </div>

        {/* Top equipos */}
        {topEquipos.length > 0 && (
          <>
            <h2 className="section-title">TOP <span>EQUIPOS</span></h2>
            <div className="row g-3 mb-4">
              {topEquipos.map(eq => (
                <div key={eq.id} className="col-12 col-md-6">
                  <div className="stat-card">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ fontWeight: 700 }}>
                        <span className="me-2" style={{ fontSize: '1.3rem' }}>{eq.bandera}</span>
                        {eq.nombre}
                      </span>
                      <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: 'var(--wc-yellow)' }}>
                        {eq.pct}%
                      </span>
                    </div>
                    <div className="wc-progress">
                      <div className="wc-progress-bar" style={{ width: `${eq.pct}%` }}></div>
                    </div>
                    <div className="mt-1" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>
                      {eq.got}/{eq.total} figuritas
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Equipos completos */}
        {equiposCompletos.length > 0 && (
          <>
            <h2 className="section-title">COMPLETOS <span>🏆</span></h2>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {equiposCompletos.map(eq => (
                <span
                  key={eq.id}
                  style={{
                    background: 'rgba(0,165,80,0.15)',
                    border: '1px solid rgba(0,165,80,0.4)',
                    color: 'var(--wc-green)',
                    borderRadius: 99,
                    padding: '6px 16px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                  }}
                >
                  {eq.bandera} {eq.nombre}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}