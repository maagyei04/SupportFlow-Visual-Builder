import type { FlowNode } from '../types/flow'

interface Props {
    nodes: FlowNode[]
}

const NODE_WIDTH = 200
const NODE_HEIGHT = 80

export function Connectors({ nodes }: Props) {
    const nodeMap = new Map(nodes.map((n) => [n.id, n]))

    const lines: { x1: number; y1: number; x2: number; y2: number; key: string }[] = []

    nodes.forEach((node) => {
        node.options.forEach((option, i) => {
            const target = nodeMap.get(option.nextId)
            if (!target) return

            // start: bottom-center of parent node
            const x1 = node.position.x + NODE_WIDTH / 2
            const y1 = node.position.y + NODE_HEIGHT

            // end: top-center of child node
            const x2 = target.position.x + NODE_WIDTH / 2
            const y2 = target.position.y

            lines.push({ x1, y1, x2, y2, key: `${node.id}-${option.nextId}-${i}` })
        })
    })

    return (
        <svg
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        >
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                >
                    <polygon points="0 0, 8 4, 0 8" fill="#64748b" />
                </marker>
            </defs>
            {lines.map((line) => (
                <line
                    key={line.key}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#64748b"
                    strokeWidth={2}
                    markerEnd="url(#arrowhead)"
                />
            ))}
        </svg>
    )
}