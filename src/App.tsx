import { useFlowState } from './hooks/useFlowState'
import { Canvas } from './components/Canvas'
import { EditPanel } from './components/EditPanel'

function App() {
  const { nodes, selectedNode, selectNode, canvasSize, updateNodeText } = useFlowState()

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16, fontSize: 20 }}>SupportFlow Builder</h1>
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
    </div>
  )
}

export default App