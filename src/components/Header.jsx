import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useLocation } from 'react-router-dom'

function Header() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <header className="bg-blue-600 dark:bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Wiki Coach</Link>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li>
              <button
                onClick={() => {
                  const data = localStorage.getItem('contributionFormData')
                  if (data) {
                    const blob = new Blob([data], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'wiki-content.json'
                    a.click()
                  }
                }}
                className="hover:underline">Save</button>
            </li>
            <li><Link to="/contribute" className="hover:underline">Contribute</Link></li>
          </ul>
          <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-blue-500 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-gray-600">
            {darkMode ? '🌞' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
