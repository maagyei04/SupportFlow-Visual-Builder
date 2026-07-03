import type { FlowNode } from '../types/flow'

interface Props {
    nodes: FlowNode[]
}

const NODE_WIDTH  = 244
const NODE_HEIGHT = 134

export function Connectors({ nodes }: Props) {
    const nodeMap = new Map(nodes.map((n) => [n.id, n]))

    const arrows: { d: string; key: string }[] = []

    nodes.forEach((node) => {
        const total = (node.options || []).length
        ;(node.options || []).forEach((option, idx) => {
            const target = nodeMap.get(option.nextId)
            if (!target) return

            const spread  = NODE_WIDTH * 0.52
            const offset  = total <= 1 ? 0 : ((idx / (total - 1)) - 0.5) * spread
            const x1 = node.position.x   + NODE_WIDTH  / 2 + offset
            const y1 = node.position.y   + NODE_HEIGHT
            const x2 = target.position.x + NODE_WIDTH  / 2
            const y2 = target.position.y
            const cy1 = y1 + (y2 - y1) * 0.42
            const cy2 = y2 - (y2 - y1) * 0.42

            arrows.push({
                d: `M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`,
                key: `${node.id}-${option.nextId}-${idx}`,
            })
        })
    })

    return (
        <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }} width="100%" height="100%">
            <defs>
                <marker id="arrowhead" markerWidth="7" markerHeight="5" refX="5.5" refY="2.5" orient="auto">
                    <polygon points="0 0, 7 2.5, 0 5" fill="#4a7a96" />
                </marker>
            </defs>
            {arrows.map(({ d, key }) => (
                <path
                    key={key}
                    d={d}
                    stroke="#2a4d65"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    opacity="0.75"
                />
            ))}
        </svg>
    )
}