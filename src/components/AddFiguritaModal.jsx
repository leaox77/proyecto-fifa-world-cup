import { useState, useRef } from 'react'
import { EQUIPOS } from '../data/figuritas'

const EMPTY = { jugador: '', equipo: 'arg', numero: '', imagen: '', obtenida: false, favorita: false }

export default function AddFiguritaModal({ onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [imagenF, setImagenF] = useState(null)
  const [imagenPreview, setImagenPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleImageChange = (e)=>{
    const file = e.target.files[0]
    if(file){
      setImagenF(file)
      const lector = new FileReader()
      lector.onloadend = ()=>{
        setImagenPreview(lector.result)
      }
      lector.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!form.jugador.trim() || !form.numero.trim()) {
      setError('completa los campos obligatorios')
      return
    }

    setLoading(true)
    setError(null)

    try{
      await onAdd(form, imagenF)
      onClose()
    } catch (err){
      setError('error al guardar la figurita')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="wc-modal-overlay" onClick={onClose}>
      <div className="wc-modal" onClick={e => e.stopPropagation()}>
        <h3>
          <i className="fa fa-plus-circle me-2" style={{ color: 'var(--wc-yellow)' }}></i>
          Nueva Figurita
        </h3>

        <div className="mb-3">
          <div className="label-form">Jugador *</div>
          <input
            className="form-control wc-input"
            placeholder="Nombre del jugador"
            value={form.jugador}
            onChange={e => set('jugador', e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <div className="label-form">Número *</div>
          <input
            className="form-control wc-input"
            placeholder="ej: ARG-05"
            value={form.numero}
            onChange={e => set('numero', e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <div className="label-form">Selección</div>
          <select
            className="form-select wc-select"
            value={form.equipo}
            onChange={e => set('equipo', e.target.value)}
            disabled={loading}
          >
            {EQUIPOS.map(eq => (
              <option key={eq.id} value={eq.id}>
                {eq.bandera} {eq.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <div className="label-form">Imagen</div>
          <input
          type="file"
          ref={fileInputRef}
            className="form-control wc-input"
            accept='image/*'
            onChange={handleImageChange}
            disabled={loading}
            style={{padding:'6px'}}
          />
          {imagenPreview && (
            <div className='mt-2' style={{textAlign: 'center'}}>
              <img src={imagenPreview} alt="preview" style={{maxWidth:'120px', borderRadius: '8px', border: '1px solid #e0e0e0'}} />
              <button 
              type='button' 
              className='btn btn-sm' 
              onClick={()=>{ 
                setImagenF(null) 
                setImagenPreview(null)
                if(fileInputRef.current) fileInputRef.current.value = ''}}
                style={{display:'block', marginTop:'8px', background: 'none', border: 'none', color: 'red', fontSize:'0.7rem'}}
                >
                  <i className='fa fa-trash me-1'></i>Quitar imagen
                </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.obtenida}
              onChange={e => set('obtenida', e.target.checked)}
              style={{ width: 16, height: 16, accentColor: 'var(--wc-green)' }}
            />
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
              Ya la tengo
            </span>
          </label>
        </div>

        <div className="d-flex gap-2">
          <button className="btn-wc-primary flex-fill" onClick={handleSubmit}>
            <i className="fa fa-plus me-2"></i>Agregar
          </button>
          <button className="btn-wc-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}