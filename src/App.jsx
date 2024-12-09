import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Home from './pages/Home'
import Contribute from './pages/Contribute'
import Preview from './pages/Preview'

function App() {
  return (
    <ThemeProvider>
    <div className="min-h-screen dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </main>
    </div>
    </ThemeProvider>
  )
}

export default App
