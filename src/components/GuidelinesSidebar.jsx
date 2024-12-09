import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

const WikiLink = ({ text, page }) => (
  <a
    href={`https://en.wikipedia.org/wiki/${page}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 dark:text-blue-400 hover:underline"
    onClick={(e) => e.stopPropagation()}
  >
    {text}
  </a>
)

const GuidelineItem = ({ title, details, links }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4 border-b border-gray-200 pb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      <div
        className={`mt-2 pl-4 text-sm text-gray-600 dark:text-gray-400 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="list-disc space-y-1">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        {links && (
          <div className="mt-2">
            <strong>Learn more:</strong>
            <ul className="list-none space-y-1 mt-1">
              {links.map((link, index) => (
                <li key={index}>
                  <WikiLink text={link.text} page={link.page} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function GuidelinesSidebar() {
  const guidelines = [
    {
      title: "Neutral point of view",
      details: [
        "Present information without bias",
        "Include all significant viewpoints",
        "Don't state opinions as facts",
        "Use non-judgmental language",
        "Cite sources for controversial statements"
      ],
      links: [
        { text: "Neutral point of view", page: "Wikipedia:Neutral_point_of_view" },
        { text: "Verifiability", page: "Wikipedia:Verifiability" },
        { text: "No original research", page: "Wikipedia:No_original_research" }
      ]
    },
    {
      title: "Verifiable information",
      details: [
        "Include only facts that can be verified",
        "Cite reliable sources for all claims",
        "Prefer secondary sources over primary ones",
        "Avoid original research or synthesis",
        "Use inline citations (e.g., [1], [2])"
      ],
      links: [
        { text: "Citing sources", page: "Wikipedia:Citing_sources" },
        { text: "Reliable sources", page: "Wikipedia:Reliable_sources" },
        { text: "Identifying reliable sources", page: "Wikipedia:Identifying_reliable_sources" }
      ]
    },
    {
      title: "Respect copyright",
      details: [
        "Don't copy text from other sources",
        "Paraphrase information in your own words",
        "Use public domain or freely licensed images",
        "Attribute all non-original content",
        "Be aware of fair use limitations"
      ],
      links: [
        { text: "Copyright violations", page: "Wikipedia:Copyright_violations" },
        { text: "Non-free content", page: "Wikipedia:Non-free_content" },
        { text: "Plagiarism", page: "Wikipedia:Plagiarism" }
      ]
    },
    {
      title: "Use reliable sources",
      details: [
        "Prefer academic and peer-reviewed publications",
        "Use reputable news outlets and organizations",
        "Avoid self-published or promotional sources",
        "Consider the author's expertise and credibility",
        "Use multiple sources to verify information"
      ],
      links: [
        { text: "Reliable sources", page: "Wikipedia:Reliable_sources" },
        { text: "Academic publishing", page: "Academic_publishing" },
        { text: "Peer review", page: "Peer_review" }
      ]
    },
    {
      title: "Be concise and clear",
      details: [
        "Use simple, straightforward language",
        "Avoid jargon or technical terms without explanation",
        "Break long paragraphs into shorter ones",
        "Use headings and subheadings to organize content",
        "Stick to relevant information"
      ],
      links: [
        { text: "Manual of Style", page: "Wikipedia:Manual_of_Style" },
        { text: "Writing better articles", page: "Wikipedia:Writing_better_articles" },
        { text: "Be concise", page: "Wikipedia:Be_concise" }
      ]
    },
    {
      title: "Avoid original research",
      details: [
        "Don't include your own theories or analyses",
        "Stick to reporting established facts and theories",
        "Avoid synthesizing or connecting ideas in new ways",
        "Don't use Wikipedia to promote new ideas",
        "Rely on published, peer-reviewed research"
      ],
      links: [
        { text: "No original research", page: "Wikipedia:No_original_research" },
        { text: "Synthesis of published material", page: "Wikipedia:Synthesis_of_published_material" },
        { text: "Identifying and using primary sources", page: "Wikipedia:Identifying_and_using_primary_sources" }
      ]
    },
    {
      title: "Follow style guidelines",
      details: [
        "Use American English spelling and grammar",
        "Follow the Manual of Style for formatting",
        "Use proper capitalization and punctuation",
        "Format dates as: Month Day, Year (e.g., January 1, 2023)",
        "Use metric units with imperial in parentheses"
      ],
      links: [
        { text: "Manual of Style", page: "Wikipedia:Manual_of_Style" },
        { text: "Layout", page: "Wikipedia:Manual_of_Style/Layout" },
        { text: "Dates and numbers", page: "Wikipedia:Manual_of_Style/Dates_and_numbers" }
      ]
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md overflow-y-auto max-h-screen">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Contribution Guidelines</h2>
      {guidelines.map((guideline, index) => (
        <GuidelineItem key={index} title={guideline.title} details={guideline.details} links={guideline.links} />
      ))}
      <a
        href="https://en.wikipedia.org/wiki/Wikipedia:Contributing_to_Wikipedia"
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
      >
        Read full guidelines
      </a>
    </div>
  )
}

export default GuidelinesSidebar
