import axios from 'axios'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function validateWikipediaEntry(apiKey, entry) {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a Wikipedia editor assistant. Your task is to validate entries for compliance with Wikipedia guidelines and suggest improvements.'
          },
          {
            role: 'user',
            content: `Please validate the following Wikipedia entry for compliance with guidelines and suggest improvements:\n\n${JSON.stringify(entry)}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Error validating Wikipedia entry:', error)
    throw new Error('Failed to validate Wikipedia entry')
  }
}
