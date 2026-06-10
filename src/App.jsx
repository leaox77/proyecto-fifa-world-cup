import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Coleccion from './pages/Coleccion'
import Equipos from './pages/Equipos'
import { fetchFiguritas, updateFigurita, addFigurita } from './services/figuritasService'

function App() {
  const [figuritas, setFiguritas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadFiguritas()
  }, [])

  const loadFiguritas = async () => {
    try {
      setLoading(true)
      const data = await fetchFiguritas()
      setFiguritas(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error("error al cargar figuritas", err)
      setError('no se pudieron cargar las figuritas')
      setFiguritas([])
    } finally {
      setLoading(false)
    }
  }

  const toggleObtenida = async (id) => {
    const fig = figuritas.find(f => f.id === id)
    if (!fig) return

    try {
      const actualizado = await updateFigurita(id, { obtenida: !fig.obtenida })
      setFiguritas(prev => prev.map(f => f.id === id ? actualizado : f))
    } catch (err) {
      console.error('error actualizando', err)
    }
  }

  const toggleFavorita = async (id) => {
    const fig = figuritas.find(f => f.id === id)
    if (!fig) return

    try {
      const actualizado = await updateFigurita(id, { favorita: !fig.favorita })
      setFiguritas(prev => prev.map(f => f.id === id ? actualizado : f))
    } catch (err) {
      console.error('error actualizando', err)
    }
  }

  const addNewFigurita = async (nuevaFig, imagenF) => {
    try {
      const agregada = await addFigurita(nuevaFig, imagenF)
      setFiguritas(prev => [...prev, agregada])
      return agregada
    } catch (err) {
      console.error('error agregando', err)
      throw err
    }
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">
          WC<span>2026</span>
        </div>
        <div className="loading-bar-track">
          <div className="loading-bar-fill"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <i className="fa fa-exclamation-triangle" style={{ fontSize: '3rem', color: 'var(--c-red)' }}></i>
        <h2 className="mt-3">Error</h2>
        <p>{error}</p>
        <button className="btn-wc-primary" onClick={loadFiguritas}>
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio figuritas={figuritas} />} />
        <Route path="/coleccion" element={
          <Coleccion 
            figuritas={figuritas}
            onToggleEstado={toggleObtenida}
            onToggleFav={toggleFavorita}
            onAddFigurita={addNewFigurita}
          />
        } />
        <Route path="/equipos" element={
          <Equipos 
            figuritas={figuritas}
            onToggleEstado={toggleObtenida}
            onToggleFav={toggleFavorita}
          />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App