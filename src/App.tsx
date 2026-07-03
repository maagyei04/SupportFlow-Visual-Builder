import { useFlowState } from './hooks/useFlowState'
import { Canvas } from './components/Canvas'
import { EditPanel } from './components/EditPanel'
import { PreviewMode } from './components/PreviewMode'

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
  } = useFlowState()

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 20 }}>SupportFlow Builder</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setMode('edit')}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: '1px solid #2a2f42',
              background: mode === 'edit' ? '#3b82f6' : 'transparent',
              color: mode === 'edit' ? 'white' : '#94a3b8',
              cursor: 'pointer',
            }}
          >
            Editor
          </button>
          <button
            onClick={() => {
              restartPreview()
              setMode('preview')
            }}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: '1px solid #2a2f42',
              background: mode === 'preview' ? '#3b82f6' : 'transparent',
              color: mode === 'preview' ? 'white' : '#94a3b8',
              cursor: 'pointer',
            }}
          >
            Preview
          </button>
        </div>
      </div>

      {mode === 'edit' ? (
        <>
          <Canvas
            nodes={nodes}
            selectedNodeId={selectedNode?.id ?? null}
            onSelectNode={selectNode}
            canvasSize={canvasSize}
          />
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
    </div>
  )
}

export default App