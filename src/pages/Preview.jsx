import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { validateWikipediaEntry } from '../utils/wikipediaValidator'

function Preview() {
  const location = useLocation()
  const navigate = useNavigate()
  const { formData } = location.state || {}

  if (!formData) {
    navigate('/contribute')
    return null
  }

  const { title, content, references } = formData

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden font-sans">
          {/* Wikipedia-like header */}
          <div className="border-b border-gray-300 dark:border-gray-700">
            <div className="flex justify-between">
              <div className="flex">
                <div className="px-4 py-2 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700">
                  <div className="flex space-x-4 text-sm">
                    <span className="font-bold text-gray-800 dark:text-gray-200">Article</span>
                    <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Talk</span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="px-4 py-2 bg-white dark:bg-gray-800 border-l border-gray-300 dark:border-gray-700">
                  <div className="flex space-x-4 text-sm">
                    <span className="font-bold text-gray-800 dark:text-gray-200">Read</span>
                    <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Edit</span>
                    <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View history</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article content */}
          <div className="p-6 text-[0.875rem]">
            <h1 className="text-[1.8em] font-serif mb-1 text-gray-800 dark:text-gray-200">
              {title}
            </h1>
            
            <div className="text-[0.875rem] text-gray-600 dark:text-gray-400 mb-5 italic">
              From Wikipedia, the free encyclopedia
            </div>

            <div className="wiki-content prose dark:prose-invert max-w-none leading-[1.6] text-[0.875rem]">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>

            {references && (
              <div className="mt-8">
                <h2 className="text-[1.5em] font-serif mb-2 pb-1 border-b border-gray-300 dark:border-gray-700">References</h2>
                <div className="text-[0.875rem] list-decimal pl-8">
                  <ReactMarkdown>{references}</ReactMarkdown>
                </div>
              </div>
            )}

            <div className="mt-8 pt-4 text-[0.75rem] text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
              This page was last edited on {currentDate}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
        <button
          onClick={() => {
            localStorage.setItem('contributionFormData', JSON.stringify(formData));
            navigate('/contribute');
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={async () => {
            try {
              const apiKey = process.env.OPENROUTER_API_KEY;
              if (!apiKey) {
                throw new Error('API key not configured');
              }

              const entry = {
                title,
                content,
                references
              };

              const validationResult = await validateWikipediaEntry(apiKey, entry);
              
              if (validationResult.includes('APPROVED')) {
                alert('Your contribution has been validated and is ready for submission to Wikipedia!');
                // Here you would integrate with the actual Wikipedia API
                // For now, we'll just show a success message
                navigate('/');
              } else {
                alert(`Please review and address the following feedback:\n\n${validationResult}`);
              }
            } catch (error) {
              alert(`Error during submission: ${error.message}`);
            }
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Submit to Wikipedia
        </button>
      </div>
      </div>
    </div>
  );
}

export default Preview;
