import { useFlowState } from './hooks/useFlowState'
import { Canvas } from './components/Canvas'

function App() {
  const { nodes, selectedNode, selectNode, canvasSize } = useFlowState()

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16, fontSize: 20 }}>SupportFlow Builder</h1>
      <Canvas
        nodes={nodes}
        selectedNodeId={selectedNode?.id ?? null}
        onSelectNode={selectNode}
        canvasSize={canvasSize}
      />
    </div>
  )
}

export default App