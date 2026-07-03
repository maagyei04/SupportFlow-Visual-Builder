import type { FlowNode as FlowNodeType } from '../types/flow'
import { FlowNode } from './FlowNode'
import { Connectors } from './Connectors'

interface Props {
    nodes: FlowNodeType[]
    selectedNodeId: string | null
    onSelectNode: (id: string) => void
    canvasSize: { w: number; h: number }
}

export function Canvas({ nodes, selectedNodeId, onSelectNode, canvasSize }: Props) {
    return (
        <div
            style={{
                position: 'relative',
                width: canvasSize.w,
                height: canvasSize.h,
                background: '#0f1117',
                backgroundImage:
                    'radial-gradient(circle, #1f2333 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                overflow: 'auto',
            }}
        >
            <Connectors nodes={nodes} />
            {nodes.map((node) => (
                <FlowNode
                    key={node.id}
                    node={node}
                    isSelected={node.id === selectedNodeId}
                    onClick={onSelectNode}
                />
            ))}
        </div>
    )
}