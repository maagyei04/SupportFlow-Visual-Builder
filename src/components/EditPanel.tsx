import type { FlowNode } from '../types/flow'

interface Props {
    node: FlowNode | null
    onUpdateText: (id: string, text: string) => void
    onClose: () => void
}

export function EditPanel({ node, onUpdateText, onClose }: Props) {
    if (!node) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: 320,
                height: '100vh',
                background: '#1a1d29',
                borderLeft: '1px solid #2a2f42',
                padding: 24,
                boxShadow: '-4px 0 20px rgba(0,0,0,0.3)',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: 16 }}>Edit Node</h2>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        fontSize: 18,
                    }}
                >
                    ✕
                </button>
            </div>

            <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 8 }}>
                Node Type
            </label>
            <div style={{ marginBottom: 20, fontSize: 14, textTransform: 'capitalize' }}>
                {node.type}
            </div>

            <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 8 }}>
                Text
            </label>
            <textarea
                value={node.text}
                onChange={(e) => onUpdateText(node.id, e.target.value)}
                style={{
                    width: '100%',
                    minHeight: 100,
                    background: '#0f1117',
                    border: '1px solid #2a2f42',
                    borderRadius: 6,
                    padding: 12,
                    color: '#e2e8f0',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    resize: 'vertical',
                }}
            />

            {node.options.length > 0 && (
                <>
                    <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginTop: 20, marginBottom: 8 }}>
                        Options
                    </label>
                    {node.options.map((opt, i) => (
                        <div
                            key={i}
                            style={{
                                fontSize: 13,
                                padding: '8px 12px',
                                background: '#0f1117',
                                borderRadius: 6,
                                marginBottom: 6,
                            }}
                        >
                            {opt.label} → #{opt.nextId}
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}