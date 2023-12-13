import { useEffect, useState } from 'react'

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  
  // pointer move
  useEffect(() => {
    console.log('effect', {enabled})

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove', {clientX, clientY})
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      // Detecto cada movimiento del puntero del mouse y obtengo sus 
      // coordenadas cada vez (handleMove).
      window.addEventListener('pointermove', handleMove)
    }

    // cleanup method
    // Ver hook useEffect en las notas.
    return () => {
      console.log('cleanup')
      // Asi limpio la accion del evento addEventListener para que no se ejecute (cleanup).
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // change body className
  useEffect (() => {
    // Cuando enabled es true el body adquiere la clase no-cursor y desaparece el cursor (CSS). En
    // caso contrario se ve el cursor nuevamente.
    document.body.classList.toggle('no-cursor', enabled)

    // cleanup method
    // Ver hook useEffect en las notas.
    return () => {
      // Rompe la accion de document.body.classList.toggle('no-cursor', enabled), entonces
      // el cursor se ve normalmente.
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }} />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} follow pointer
      </button>
    </>
  )
}

export default App
