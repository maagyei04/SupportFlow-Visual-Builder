import type { FlowNode } from '../types/flow'
import { FlowNode as FlowNodeCard } from './FlowNode'
import { Connectors } from './Connectors'

interface Props {
    nodes: FlowNode[]
    selectedNodeId: string | null
    onSelectNode: (id: string) => void
    canvasSize: { w: number; h: number }
    matchedNodeIds: Set<string>
    isSearching: boolean
}

export function Canvas({ nodes, selectedNodeId, onSelectNode, canvasSize, matchedNodeIds, isSearching }: Props) {
    return (
        <div
            style={{
                flex: 1,
                position: 'relative',
                overflow: 'auto',
                backgroundImage: 'radial-gradient(circle, rgba(98,182,203,0.12) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
            }}
        >
            <div style={{ position: 'relative', width: canvasSize.w, height: canvasSize.h, margin: '44px 44px' }}>
                <Connectors nodes={nodes} />
                {nodes.map((node) => (
                    <FlowNodeCard
                        key={node.id}
                        node={node}
                        isSelected={node.id === selectedNodeId}
                        isMatched={matchedNodeIds.has(node.id)}
                        isDimmed={isSearching && !matchedNodeIds.has(node.id)}
                        onClick={onSelectNode}
                    />
                ))}
            </div>
        </div>
    )
}