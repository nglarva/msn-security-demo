import { useState } from 'react'
import Dashboard from './components/layout/Dashboard'
import { ThemeProvider } from './context/ThemeContext'
import './styles/index.css'

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}

export default App