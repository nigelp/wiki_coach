import React, { useState, useEffect } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { validateTitle, validateContent, validateReferences, validateOverall } from '../utils/validationRules'
import ReactMarkdown from 'react-markdown'

function ContributionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    references: ''
  })
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem('contributionFormData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
        validateForm(parsedData)
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    validateForm()
  }, [formData])

  const validateForm = (data = formData) => {
    const newErrors = {
      title: validateTitle(formData.title),
      content: validateContent(formData.content),
      references: validateReferences(formData.references),
      overall: validateOverall(formData.title, formData.content, formData.references),
    }

    setErrors(newErrors)
    setIsValid(Object.values(newErrors).every(error => error === null))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    localStorage.setItem('contributionFormData', JSON.stringify({...formData, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      onSubmit(formData)
    }
  }

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  const getCharCount = (text) => {
    return text.length;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-end mb-2">
        <button type="button" onClick={() => setShowPreview(!showPreview)} className="text-blue-600 hover:text-blue-800">{showPreview ? 'Hide Preview' : ''}</button>
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            errors.title ? 'border-red-500' : ''
          }`}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-1" />
            {errors.title}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="10"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            errors.content ? 'border-red-500' : ''
          }`}
        ></textarea>
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {getWordCount(formData.content)} words | {getCharCount(formData.content)} characters
        </div>
        {showPreview && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
            <ReactMarkdown>{formData.content}</ReactMarkdown>
          </div>
        )}
        {errors.content && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-1" />
            {errors.content}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="references" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          References
        </label>
        <textarea
          id="references"
          name="references"
          value={formData.references}
          onChange={handleChange}
          rows="4"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            errors.references ? 'border-red-500' : ''
          }`}
        ></textarea>
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {getWordCount(formData.references)} words | {getCharCount(formData.references)} characters
        </div>
        {errors.references && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-1" />
            {errors.references}
          </p>
        )}
      </div>
      {errors.overall && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-1" />
          {errors.overall}
        </p>
      )}
      <div>
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isValid
              ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Preview Contribution
        </button>
      </div>
    </form>
  )
}

export default ContributionForm
