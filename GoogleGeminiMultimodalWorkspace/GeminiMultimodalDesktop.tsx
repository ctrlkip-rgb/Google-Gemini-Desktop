import { useMemo, useState } from 'react'

type GeminiMode = 'multimodal' | 'code' | 'research' | 'creative'

interface ModeOption {
  id: GeminiMode
  label: string
  eyebrow: string
  guidance: string
}

const MODES: ModeOption[] = [
  {
    id: 'multimodal',
    label: 'Image & File Analysis',
    eyebrow: 'MULTIMODAL',
    guidance: 'Describe what to inspect and ask the model to separate visible evidence from inference.',
  },
  {
    id: 'code',
    label: 'Gemini Coding Assistant',
    eyebrow: 'DEVELOPMENT',
    guidance: 'Include the runtime, expected behavior, relevant code, and a reproducible error.',
  },
  {
    id: 'research',
    label: 'Research Workspace',
    eyebrow: 'ANALYSIS',
    guidance: 'Compare supplied sources, identify disagreements, and list questions that remain open.',
  },
  {
    id: 'creative',
    label: 'Creative Studio',
    eyebrow: 'IDEATION',
    guidance: 'Define the audience, tone, format, constraints, and what a successful draft must achieve.',
  },
]

const colors = {
  blue: '#1a73e8',
  red: '#d93025',
  yellow: '#f9ab00',
  green: '#188038',
  ink: '#202124',
  muted: '#5f6368',
  line: '#dadce0',
  canvas: '#f8fafd',
  white: '#ffffff',
}

/** Self-contained Google Gemini Desktop multimodal workspace preview. */
export default function GeminiMultimodalDesktop() {
  const [selectedMode, setSelectedMode] = useState<GeminiMode>('multimodal')
  const [selectedModel, setSelectedModel] = useState('Gemini Pro')
  const [prompt, setPrompt] = useState('')
  const [attachments, setAttachments] = useState<string[]>([])

  const activeMode = useMemo(
    () => MODES.find((mode) => mode.id === selectedMode) ?? MODES[0],
    [selectedMode],
  )

  const addDemoAttachment = () => {
    const nextNumber = attachments.length + 1
    setAttachments((current) => [...current, `workspace-file-${nextNumber}.png`])
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '28px',
        color: colors.ink,
        background: `linear-gradient(145deg, #eef5ff 0%, ${colors.canvas} 44%, #fff8e7 100%)`,
        fontFamily: 'Google Sans, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '26px' }}>
          <div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }} aria-hidden="true">
              {[colors.blue, colors.red, colors.yellow, colors.green].map((color) => (
                <span key={color} style={{ width: '22px', height: '5px', borderRadius: '999px', background: color }} />
              ))}
            </div>
            <h1 style={{ margin: 0, fontSize: 'clamp(28px, 5vw, 46px)', letterSpacing: '-0.035em' }}>
              Google Gemini Desktop
            </h1>
            <p style={{ margin: '8px 0 0', color: colors.muted }}>
              A multimodal workspace for text, code, images, files, and research.
            </p>
          </div>

          <label style={{ display: 'grid', gap: '6px', color: colors.muted, fontSize: '12px' }}>
            Model from configured service
            <select
              value={selectedModel}
              onChange={(event) => setSelectedModel(event.target.value)}
              style={{ border: `1px solid ${colors.line}`, borderRadius: '10px', background: colors.white, padding: '10px 34px 10px 12px' }}
            >
              <option>Gemini Pro</option>
              <option>Gemini Flash</option>
              <option>Gemini Vision</option>
            </select>
          </label>
        </header>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(230px, 0.75fr) minmax(0, 1.75fr)',
            gap: '18px',
          }}
        >
          <nav
            aria-label="Gemini workspace modes"
            style={{ background: 'rgba(255,255,255,0.82)', border: `1px solid ${colors.line}`, borderRadius: '22px', padding: '12px', backdropFilter: 'blur(14px)' }}
          >
            {MODES.map((mode) => {
              const active = mode.id === selectedMode
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSelectedMode(mode.id)}
                  style={{
                    width: '100%',
                    border: active ? `1px solid ${colors.blue}` : '1px solid transparent',
                    borderRadius: '14px',
                    padding: '14px',
                    marginBottom: '8px',
                    textAlign: 'left',
                    background: active ? '#e8f0fe' : 'transparent',
                    color: colors.ink,
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ display: 'block', color: active ? colors.blue : colors.muted, fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em' }}>
                    {mode.eyebrow}
                  </span>
                  <strong style={{ display: 'block', marginTop: '4px' }}>{mode.label}</strong>
                </button>
              )
            })}
          </nav>

          <div
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: `1px solid ${colors.line}`,
              borderRadius: '22px',
              padding: '24px',
              boxShadow: '0 18px 50px rgba(60, 64, 67, 0.12)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
              <div>
                <span style={{ color: colors.blue, fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em' }}>{activeMode.eyebrow}</span>
                <h2 style={{ margin: '5px 0 0' }}>{activeMode.label}</h2>
              </div>
              <span style={{ color: colors.muted, fontSize: '12px' }}>{selectedModel}</span>
            </div>

            <p style={{ color: colors.muted, lineHeight: 1.6 }}>{activeMode.guidance}</p>

            <div
              style={{
                border: `1px dashed ${colors.line}`,
                borderRadius: '14px',
                padding: '14px',
                margin: '20px 0',
                background: colors.canvas,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <div>
                  <strong style={{ fontSize: '13px' }}>Context files</strong>
                  <div style={{ color: colors.muted, fontSize: '12px', marginTop: '3px' }}>
                    Demo attachment names only; connect a trusted upload handler in production.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addDemoAttachment}
                  style={{ border: `1px solid ${colors.line}`, borderRadius: '10px', padding: '9px 12px', background: colors.white, cursor: 'pointer' }}
                >
                  + Add file
                </button>
              </div>
              {attachments.length > 0 && (
                <ul style={{ margin: '12px 0 0', paddingLeft: '20px', color: colors.muted, fontSize: '12px' }}>
                  {attachments.map((file) => <li key={file}>{file}</li>)}
                </ul>
              )}
            </div>

            <label htmlFor="gemini-prompt" style={{ display: 'block', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
              Multimodal prompt
            </label>
            <textarea
              id="gemini-prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={8}
              placeholder="Describe the outcome, relevant context, constraints, and the exact response format you need."
              style={{
                width: '100%',
                boxSizing: 'border-box',
                resize: 'vertical',
                border: `1px solid ${colors.line}`,
                borderRadius: '14px',
                padding: '14px',
                font: 'inherit',
                lineHeight: 1.55,
                color: colors.ink,
                outlineColor: colors.blue,
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginTop: '14px' }}>
              <span style={{ color: colors.muted, fontSize: '12px' }}>{prompt.length} characters · {attachments.length} files</span>
              <button
                type="button"
                disabled={!prompt.trim()}
                style={{
                  border: 0,
                  borderRadius: '12px',
                  padding: '11px 18px',
                  color: colors.white,
                  background: prompt.trim() ? colors.blue : '#bdc1c6',
                  fontWeight: 800,
                  cursor: prompt.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Start Gemini session
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
