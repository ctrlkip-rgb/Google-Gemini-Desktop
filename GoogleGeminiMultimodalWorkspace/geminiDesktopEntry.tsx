import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GeminiMultimodalDesktop from './GeminiMultimodalDesktop'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Google Gemini Desktop requires an element with id="root".')
}

createRoot(rootElement).render(
  <StrictMode>
    <GeminiMultimodalDesktop />
  </StrictMode>,
)
