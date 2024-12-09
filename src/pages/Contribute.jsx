import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContributionForm from '../components/ContributionForm'
import GuidelinesSidebar from '../components/GuidelinesSidebar'

function Contribute() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    references: '',
  })
  const navigate = useNavigate()

  const handleSubmit = (data) => {
    setFormData(data)
    navigate('/preview', { state: { formData: data } })
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Contribute to Wikipedia</h1>
        <ContributionForm onSubmit={handleSubmit} />
      </div>
      <div className="lg:w-1/3 dark:text-white">
        <GuidelinesSidebar />
      </div>
    </div>
  )
}

export default Contribute
