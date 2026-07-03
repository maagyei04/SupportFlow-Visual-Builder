import { GitBranch, Layers, MousePointer2, Play } from 'lucide-react'
import { useFlowState } from './hooks/useFlowState'
import { Canvas } from './components/Canvas'
import { EditPanel } from './components/EditPanel'
import { PreviewMode } from './components/PreviewMode'
import { SearchBar } from './components/SearchBar'

const C = {
  bg: '#0D1B2A',
  surface: '#0f2235',
  card: '#122030',
  nav: '#09161f',
  panel: '#081218',
  border: 'rgba(27,73,101,0.55)',
  border2: 'rgba(27,73,101,0.3)',
  text: '#d4e8f0',
  sub: '#7fb0c8',
  muted: '#4a7a96',
  dim: '#2a4d65',
  teal: '#62B6CB',
  orange: '#F4A261',
  iceBlue: '#BEE9E8',
  techBlue: '#1B4965',
} as const

function Mono({ children, size = 10, color = C.dim }: { children: React.ReactNode; size?: number; color?: string }) {
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: size, color, letterSpacing: '0.06em' }}>
      {children}
    </span>
  )
}

function Divider({ vertical, size = 16 }: { vertical?: boolean; size?: number }) {
  return vertical
    ? <div style={{ width: 1, height: size, background: C.border, flexShrink: 0 }} />
    : <div style={{ height: 1, background: C.border2, margin: '18px 0' }} />
}

function StatPill({ color, label, count }: { color: string; label: string; count: number }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 5,
      background: 'rgba(27,73,101,0.25)', border: `1px solid ${C.border2}`,
      borderRadius: 5, padding: '3px 9px',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <Mono size={10} color={color}>{count}</Mono>
      <span style={{ fontSize: 10.5, color: C.dim }}>{label}</span>
    </div>
  )
}

function App() {
  const {
    nodes,
    selectedNode,
    selectNode,
    updateNodeText,
    canvasSize,
    mode,
    setMode,
    previewNode,
    previewHistory,
    goToPreviewNode,
    restartPreview,
    searchQuery,
    setSearchQuery,
    matchedNodeIds,
  } = useFlowState()

  const startCount = nodes.filter((n) => n.type === 'start').length
  const questionCount = nodes.filter((n) => n.type === 'question').length
  const endCount = nodes.filter((n) => n.type === 'end').length

  const switchMode = (m: 'edit' | 'preview') => {
    setMode(m)
    selectNode(null)
    setSearchQuery('')
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif", color: C.text, overflow: 'hidden' }}>

      <header style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', borderBottom: `1px solid ${C.border}`, background: C.nav, flexShrink: 0, zIndex: 30, gap: 16 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, background: `linear-gradient(140deg, ${C.techBlue} 0%, #0f2e46 100%)`, border: `1px solid rgba(98,182,203,0.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GitBranch size={13} color={C.teal} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em', color: C.text, flexShrink: 0 }}>SupportFlow</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <StatPill color="#4ade80" label="Start" count={startCount} />
          <StatPill color={C.teal} label="Questions" count={questionCount} />
          <StatPill color={C.orange} label="Ends" count={endCount} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Layers size={11} color={C.dim} />
            <Mono size={9.5} color={C.dim}>v1.0</Mono>
          </div>
          <Divider vertical size={16} />

          <div style={{ display: 'flex', background: 'rgba(27,73,101,0.3)', border: `1px solid ${C.border}`, borderRadius: 6, padding: 3, gap: 2 }}>
            {(['edit', 'preview'] as const).map((m) => {
              const active = mode === m
              return (
                <button
                  key={m}
                  onClick={() => m === 'preview' ? (restartPreview(), switchMode(m)) : switchMode(m)}
                  style={{ padding: '4px 13px', borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500, fontFamily: "'Inter', sans-serif", transition: 'background 0.12s, color 0.12s', display: 'flex', alignItems: 'center', gap: 5, background: active ? C.techBlue : 'transparent', color: active ? C.iceBlue : C.muted }}
                >
                  {m === 'edit' ? <MousePointer2 size={11} /> : <Play size={10} />}
                  {m === 'edit' ? 'Editor' : 'Preview'}
                </button>
              )
            })}
          </div>

          <button style={{ background: C.orange, border: 'none', borderRadius: 6, padding: '5px 14px', cursor: 'pointer', color: C.bg, fontSize: 12, fontWeight: 700, fontFamily: "'Inter', sans-serif", letterSpacing: '0.01em' }}>
            Publish
          </button>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden', position: 'relative' }}>
        {mode === 'edit' ? (
          <>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative', paddingRight: selectedNode ? 320 : 0, transition: 'padding-right 0.18s ease' }}>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                resultCount={matchedNodeIds.size}
              />
              <Canvas
                nodes={nodes}
                selectedNodeId={selectedNode?.id ?? null}
                onSelectNode={selectNode}
                canvasSize={canvasSize}
                matchedNodeIds={matchedNodeIds}
                isSearching={searchQuery.trim().length > 0}
              />
            </div>
            <EditPanel
              node={selectedNode}
              onUpdateText={updateNodeText}
              onClose={() => selectNode(null)}
            />
          </>
        ) : (
          <PreviewMode
            currentNode={previewNode}
            history={previewHistory}
            allNodes={nodes}
            onSelectOption={goToPreviewNode}
            onRestart={restartPreview}
          />
        )}
      </main>

      <footer style={{ height: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderTop: `1px solid ${C.border2}`, background: '#060d12', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Mono size={9.5} color={C.dim}>{mode === 'edit' ? 'EDITOR' : 'PREVIEW'}</Mono>
          {selectedNode && mode === 'edit' && (
            <>
              <span style={{ color: C.dim, fontSize: 10 }}>·</span>
              <Mono size={9.5} color="#2a4d65">selected: {selectedNode.id}</Mono>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', opacity: 0.55 }} />
          <Mono size={9.5} color="#1e3d52">autosaved</Mono>
        </div>
      </footer>
    </div>
  )
}

export default App