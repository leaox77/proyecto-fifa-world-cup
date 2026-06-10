import { EQUIPOS } from '../data/figuritas'
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

export default function FiguritaCard({ fig, onToggleEstado, onToggleFav }) {
  const equipo = EQUIPOS.find(e => e.id === fig.equipo)
  const [imagenUrl, setImagenUrl] = useState(null)
  const [cargandoImg, setCargandoImg] = useState(true)

  useEffect(()=>{
    const cargarImg = async ()=> {
      if (!fig.imagen){
        setCargandoImg(false)
        return
      }

      if (fig.imagen.startsWith('http')){
        setImagenUrl(fig.imagen)
        setCargandoImg(false)
        return
      }

      try {
        const { data } = supabase.storage
          .from('figuritas')
          .getPublicUrl(fig.imagen)

        setImagenUrl(data.publicUrl)
      } catch (err){
        console.error('error cargando imagne', err)
      } finally {
        setCargandoImg(false)
      }
      
    }
    cargarImg()
  }, [fig.imagen])

  return (
    <div className={`figurita-card ${fig.obtenida ? 'obtenida' : 'faltante'}`}>
      <div className="figurita-img-wrap">
        {!cargandoImg && imagenUrl? (
        <img
          src={imagenUrl}
          alt={fig.jugador}
          onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
        />

        ):null}
        <div className="figurita-img-placeholder" style={{ display: 'none' }}>
          <i className="fa fa-user-tie"></i>
          <span style={{ fontSize: '0.65rem', marginTop: 6, letterSpacing: '0.08em' }}>SIN FOTO</span>
        </div>

        <span className="figurita-badge-num">#{fig.numero}</span>

        <button
          className={`figurita-fav-btn ${fig.favorita ? 'active' : ''}`}
          onClick={e => { e.stopPropagation(); onToggleFav(fig.id) }}
          title={fig.favorita ? 'Quitar favorito' : 'Marcar favorito'}
        >
          <i className={`fa${fig.favorita ? 's' : 'r'} fa-heart`}></i>
        </button>

        <span className={`figurita-status-badge ${fig.obtenida ? 'obtenida' : 'faltante'}`}>
          {fig.obtenida ? '✓ Tengo' : '✗ Falta'}
        </span>
      </div>

      <div className="figurita-info">
        <div className="player-name">{fig.jugador}</div>
        <div className="team-name">
          {equipo?.bandera} {equipo?.nombre ?? fig.equipo.toUpperCase()}
        </div>
      </div>

      <button
        className={`btn-toggle-state ${fig.obtenida ? 'quitar' : 'marcar'}`}
        onClick={() => onToggleEstado(fig.id)}
      >
        {fig.obtenida
          ? <><i className="fa fa-xmark me-1"></i>Quitar</>
          : <><i className="fa fa-check me-1"></i>Obtener</>
        }
      </button>
    </div>
  )
}