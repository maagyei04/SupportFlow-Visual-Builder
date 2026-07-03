import type { FlowNode } from '../types/flow'

interface Props {
    currentNode: FlowNode | null
    history: string[]
    allNodes: FlowNode[]
    onSelectOption: (nextId: string) => void
    onRestart: () => void
}

export function PreviewMode({ currentNode, history, allNodes, onSelectOption, onRestart }: Props) {
    if (!currentNode) return <div>Node not found</div>

    const historyNodes = history
        .map((id) => allNodes.find((n) => n.id === id))
        .filter(Boolean) as FlowNode[]

    return (
        <div
            style={{
                maxWidth: 480,
                margin: '40px auto',
                background: '#1a1d29',
                borderRadius: 12,
                padding: 24,
                border: '1px solid #2a2f42',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontSize: 16 }}>Bot Preview</h2>
                <button
                    onClick={onRestart}
                    style={{
                        background: 'none',
                        border: '1px solid #2a2f42',
                        borderRadius: 6,
                        color: '#94a3b8',
                        padding: '4px 10px',
                        fontSize: 12,
                        cursor: 'pointer',
                    }}
                >
                    Restart
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {historyNodes.map((node, i) => (
                    <div
                        key={`${node.id}-${i}`}
                        style={{
                            background: '#0f1117',
                            padding: '10px 14px',
                            borderRadius: 8,
                            fontSize: 14,
                            alignSelf: 'flex-start',
                            maxWidth: '85%',
                        }}
                    >
                        {node.text}
                    </div>
                ))}
            </div>

            {currentNode.options.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {currentNode.options.map((option, i) => (
                        <button
                            key={i}
                            onClick={() => onSelectOption(option.nextId)}
                            style={{
                                background: '#3b82f6',
                                border: 'none',
                                borderRadius: 6,
                                color: 'white',
                                padding: '10px 16px',
                                fontSize: 14,
                                cursor: 'pointer',
                                textAlign: 'left',
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            ) : (
                <div style={{ fontSize: 13, color: '#22c55e' }}>✓ Conversation ended</div>
            )}
        </div>
    )
}