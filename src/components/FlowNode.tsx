import type { FlowNode as FlowNodeType } from '../types/flow'

interface Props {
    node: FlowNodeType
    isSelected: boolean
    onClick: (id: string) => void
}

const typeColors: Record<string, string> = {
    start: '#22c55e',
    question: '#3b82f6',
    end: '#ef4444',
}

export function FlowNode({ node, isSelected, onClick }: Props) {
    return (
        <div
            onClick={() => onClick(node.id)}
            style={{
                position: 'absolute',
                left: node.position.x,
                top: node.position.y,
                width: 200,
                padding: '12px 16px',
                borderRadius: 8,
                background: '#1a1d29',
                border: `2px solid ${isSelected ? '#f59e0b' : typeColors[node.type]}`,
                cursor: 'pointer',
                boxShadow: isSelected ? '0 0 0 3px rgba(245,158,11,0.2)' : 'none',
            }}
        >
            <div
                style={{
                    fontSize: 11,
                    textTransform: 'uppercase',
                    color: typeColors[node.type],
                    marginBottom: 4,
                    fontWeight: 600,
                }}
            >
                {node.type}
            </div>
            <div style={{ fontSize: 14 }}>{node.text}</div>
        </div>
    )
}