import { useState } from 'react'
import { EQUIPOS } from '../data/figuritas'
import FiguritaCard from '../components/FiguritaCard'

export default function Equipos({ figuritas, onToggleEstado, onToggleFav }) {
  const [selectedTeam, setSelectedTeam] = useState(null)
  

  // Calcular progreso por equipo
  const teamsWithProgress = EQUIPOS.map(team => {
    const teamFigs = figuritas.filter(f => f.equipo === team.id)
    const total = teamFigs.length
    const obtenidas = teamFigs.filter(f => f.obtenida).length
    const porcentaje = total ? Math.round((obtenidas / total) * 100) : 0
    
    return {
      ...team,
      total,
      obtenidas,
      porcentaje,
      completado: total > 0 && obtenidas === total
    }
  }).filter(t => t.total > 0) // Solo equipos con figuritas

  const selectedTeamData = selectedTeam && teamsWithProgress.find(t => t.id === selectedTeam)
  const selectedTeamFigs = selectedTeam ? figuritas.filter(f => f.equipo === selectedTeam) : []

  return (
    <div className="container py-4">
      <h1 className="section-title">SELECCIONES <span>PARTICIPANTES</span></h1>

      <div className="row g-4">
        {/* Lista de equipos */}
        <div className={`${selectedTeam ? 'col-md-5' : 'col-12'}`}>
          <div className="row g-3">
            {teamsWithProgress.map(team => (
              <div key={team.id} className="col-6 col-sm-4 col-md-6">
                <div 
                  className={`team-card ${selectedTeam === team.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                >
                  <div className="team-flag">{team.bandera}</div>
                  <div className="team-name-label">{team.nombre}</div>
                  <div className="team-mini-progress">
                    <div className="wc-progress" style={{ height: '6px' }}>
                      <div className="wc-progress-bar" style={{ width: `${team.porcentaje}%` }}></div>
                    </div>
                    <div style={{ fontSize: '0.7rem', marginTop: 4, color: 'rgba(255,255,255,0.4)' }}>
                      {team.obtenidas}/{team.total}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detalle del equipo seleccionado */}
        {selectedTeam && selectedTeamData && (
          <div className="col-md-7">
            <div className="team-detail-panel">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                <h2 style={{ marginBottom: 0 }}>
                  {selectedTeamData.bandera} {selectedTeamData.nombre}
                </h2>
                <div className="mt-2 mt-sm-0">
                  <span className="badge" style={{ 
                    background: selectedTeamData.completado ? 'var(--wc-green)' : 'rgba(255,255,255,0.1)',
                    color: selectedTeamData.completado ? '#fff' : 'rgba(255,255,255,0.6)',
                    padding: '6px 12px'
                  }}>
                    {selectedTeamData.completado ? '✅ COMPLETADO' : `${selectedTeamData.porcentaje}% COMPLETADO`}
                  </span>
                </div>
              </div>

              <div className="wc-progress mb-4" style={{ height: '10px' }}>
                <div className="wc-progress-bar" style={{ width: `${selectedTeamData.porcentaje}%` }}></div>
              </div>

              <div className="row g-3">
                {selectedTeamFigs.map(fig => (
                  <div key={fig.id} className="col-6 col-sm-4">
                    <FiguritaCard 
                      fig={fig}
                      onToggleEstado={onToggleEstado}
                      onToggleFav={onToggleFav}
                    />
                  </div>
                ))}
              </div>

              <button 
                className="btn-wc-secondary mt-4 w-100"
                onClick={() => setSelectedTeam(null)}
              >
                <i className="fa fa-arrow-left me-2"></i>Ver todos los equipos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}