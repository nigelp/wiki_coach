import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const handleNewContribution = () => {
    localStorage.removeItem('contributionFormData')
    navigate('/contribute')
  }

  const handleEditExisting = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const content = e.target.result
            const parsedContent = JSON.parse(content)
            localStorage.setItem('contributionFormData', JSON.stringify(parsedContent))
            navigate('/contribute')
          } catch (error) {
            alert('Invalid JSON file format')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <div className="text-center dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-4 dark:text-white">Welcome to Wiki Coach</h1>
      <p className="mb-8 dark:text-gray-300">Easily contribute to Wikipedia with our guided process.</p>
      <div className="space-x-4">
      <button
        onClick={handleNewContribution}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-2">
        New Entry
      </button>
      <button
        onClick={handleEditExisting}
        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors mb-2">
        Upload Saved Entry
      </button>
      </div>
      <p className="mt-4 text-sm italic text-gray-600 dark:text-gray-400">To alter an ongoing edit, click the Contribute button in the top menu</p>
    </div>
  )
}

export default Home
