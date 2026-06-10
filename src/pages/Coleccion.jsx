import { useState } from 'react'
import FiguritaCard from '../components/FiguritaCard'
import AddFiguritaModal from '../components/AddFiguritaModal'
import { EQUIPOS } from '../data/figuritas'

export default function Coleccion({ figuritas, onToggleEstado, onToggleFav, onAddFigurita }) {
  const [search, setSearch] = useState('')
  const [filterEquipo, setFilterEquipo] = useState('todos')
  const [filterEstado, setFilterEstado] = useState('todas')
  const [showAddModal, setShowAddModal] = useState(false)

  // Filtrar figuritas
  
  const filtered = figuritas.filter(fig => {
    const matchSearch = fig.jugador.toLowerCase().includes(search.toLowerCase()) ||
                        fig.numero.toLowerCase().includes(search.toLowerCase())
    const matchEquipo = filterEquipo === 'todos' || fig.equipo === filterEquipo
    const matchEstado = filterEstado === 'todas' || 
                        (filterEstado === 'obtenidas' && fig.obtenida) ||
                        (filterEstado === 'faltantes' && !fig.obtenida) ||
                        (filterEstado === 'favoritas' && fig.favorita)
    return matchSearch && matchEquipo && matchEstado
  })

  const stats = {
    total: figuritas.length,
    obtenidas: figuritas.filter(f => f.obtenida).length,
    faltantes: figuritas.filter(f => !f.obtenida).length,
    favoritas: figuritas.filter(f => f.favorita).length
  }

  const handleAddFigurita = async (nuevaFig, imagenF)=>{
    try {
        await onAddFigurita(nuevaFig, imagenF)
    } catch (err) {
        console.error('error', err)
    }
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <h1 className="section-title" style={{ borderBottom: 'none', marginBottom: 0 }}>
            MI <span>COLECCIÓN</span>
          </h1>
          <p className="mt-2" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }}>
            {stats.obtenidas} de {stats.total} figuritas • {stats.favoritas} favoritas
          </p>
        </div>
        <button 
          className="btn-wc-primary"
          onClick={() => setShowAddModal(true)}
        >
          <i className="fa fa-plus me-2"></i>Agregar manual
        </button>
      </div>

      {/* Stats rápidas */}
      <div className="row g-2 mb-4">
        <div className="col-3">
          <div className="stat-card text-center" style={{ padding: '12px' }}>
            <div className="stat-number" style={{ fontSize: '1.5rem' }}>{stats.total}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>
        <div className="col-3">
          <div className="stat-card text-center" style={{ padding: '12px' }}>
            <div className="stat-number" style={{ fontSize: '1.5rem', color: 'var(--wc-green)' }}>{stats.obtenidas}</div>
            <div className="stat-label">Tengo</div>
          </div>
        </div>
        <div className="col-3">
          <div className="stat-card text-center" style={{ padding: '12px' }}>
            <div className="stat-number" style={{ fontSize: '1.5rem', color: 'var(--wc-red)' }}>{stats.faltantes}</div>
            <div className="stat-label">Faltan</div>
          </div>
        </div>
        <div className="col-3">
          <div className="stat-card text-center" style={{ padding: '12px' }}>
            <div className="stat-number" style={{ fontSize: '1.5rem', color: 'var(--wc-pink)' }}>{stats.favoritas}</div>
            <div className="stat-label">Favs</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <div className="wc-search-wrap">
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control wc-search"
              placeholder="Buscar jugador o número..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select 
            className="form-select wc-select"
            value={filterEquipo}
            onChange={e => setFilterEquipo(e.target.value)}
          >
            <option value="todos">🌍 Todos los equipos</option>
            {EQUIPOS.map(eq => (
              <option key={eq.id} value={eq.id}>
                {eq.bandera} {eq.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <div className="filter-chips">
            <button 
              className={`chip ${filterEstado === 'todas' ? 'active' : ''}`}
              onClick={() => setFilterEstado('todas')}
            >
              Todas
            </button>
            <button 
              className={`chip ${filterEstado === 'obtenidas' ? 'active' : ''}`}
              onClick={() => setFilterEstado('obtenidas')}
            >
              Obtenidas
            </button>
            <button 
              className={`chip ${filterEstado === 'faltantes' ? 'active' : ''}`}
              onClick={() => setFilterEstado('faltantes')}
            >
              Faltantes
            </button>
            <button 
              className={`chip ${filterEstado === 'favoritas' ? 'active' : ''}`}
              onClick={() => setFilterEstado('favoritas')}
            >
              Favoritas
            </button>
          </div>
        </div>
      </div>

      {/* Grid de figuritas */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <i className="fa fa-sticker"></i>
          <p>No se encontraron figuritas</p>
          <button className="btn-wc-secondary" onClick={() => setShowAddModal(true)}>
            Agregar primera figurita
          </button>
        </div>
      ) : (
        <div className="row g-3">
          {filtered.map(fig => (
            <div key={fig.id} className="col-6 col-md-4 col-lg-3">
              <FiguritaCard 
                fig={fig}
                onToggleEstado={onToggleEstado}
                onToggleFav={onToggleFav}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showAddModal && (
        <AddFiguritaModal 
          onAdd={handleAddFigurita}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}