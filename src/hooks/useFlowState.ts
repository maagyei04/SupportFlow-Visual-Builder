import { useState } from 'react'
import type { FlowNode, FlowData } from '../types/flow'
import flowData from '../data/flow_data.json'

export type Mode = 'edit' | 'preview'

export function useFlowState() {
    const [nodes, setNodes] = useState<FlowNode[]>(
        (flowData as FlowData).nodes
    )
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
    const [mode, setMode] = useState<Mode>('edit')

    const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null

    function updateNodeText(id: string, newText: string) {
        setNodes((prev) =>
            prev.map((n) => (n.id === id ? { ...n, text: newText } : n))
        )
    }

    function selectNode(id: string | null) {
        setSelectedNodeId(id)
    }

    return {
        nodes,
        selectedNode,
        selectNode,
        updateNodeText,
        mode,
        setMode,
        canvasSize: (flowData as FlowData).meta.canvas_size,
    }
}