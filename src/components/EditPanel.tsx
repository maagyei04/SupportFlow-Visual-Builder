import { X, ChevronRight } from 'lucide-react'
import type { FlowNode } from '../types/flow'

interface Props {
    node: FlowNode | null
    onUpdateText: (id: string, text: string) => void
    onClose: () => void
}

const C = {
  panel:   '#081218',
  border:  'rgba(27,73,101,0.55)',
  border2: 'rgba(27,73,101,0.3)',
  text:    '#d4e8f0',
  sub:     '#7fb0c8',
  muted:   '#4a7a96',
  dim:     '#2a4d65',
} as const

const NODE_STYLES: Record<string, { border: string; badge: string; label: string }> = {
  start:    { border: '#4ade80', badge: 'rgba(74,222,128,0.13)',  label: '#4ade80' },
  question: { border: '#62B6CB', badge: 'rgba(98,182,203,0.15)',  label: '#62B6CB' },
  end:      { border: '#F4A261', badge: 'rgba(244,162,97,0.15)',  label: '#F4A261' },
}

const TYPE_LABEL: Record<string, string> = { start: 'START', question: 'QUESTION', end: 'END' }

const inputBase: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(27,73,101,0.2)',
  border: `1px solid rgba(27,73,101,0.55)`,
  borderRadius: 6, color: C.text, fontSize: 12.5,
  padding: '9px 11px', fontFamily: "'Inter', sans-serif",
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.09em', color: C.muted, marginBottom: 7 }}>
      {children}
    </label>
  )
}

export function EditPanel({ node, onUpdateText, onClose }: Props) {
    if (!node) return null

    const col = NODE_STYLES[node.type] ?? NODE_STYLES.question

    return (
        <div style={{ position: 'fixed', top: 48, right: 0, bottom: 24, width: 320, zIndex: 40, background: C.panel, borderLeft: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'panelIn 0.18s ease' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 18px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 3, height: 18, borderRadius: 2, background: col.border }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.text, letterSpacing: '0.01em' }}>Edit Node</span>
                </div>
                <button
                    onClick={onClose}
                    style={{ background: 'rgba(27,73,101,0.3)', border: `1px solid ${C.border}`, borderRadius: 5, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, color: C.muted }}
                >
                    <X size={13} />
                </button>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '20px 18px 28px' }}>

                <div style={{ marginBottom: 20 }}>
                    <FieldLabel>NODE TYPE</FieldLabel>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11.5, fontWeight: 500, color: col.label, background: col.badge, border: `1px solid ${col.border}35`, borderRadius: 5, padding: '5px 11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.07em' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: col.border, flexShrink: 0 }} />
                        {TYPE_LABEL[node.type] ?? node.type.toUpperCase()}
                    </span>
                </div>

                <div style={{ marginBottom: 20 }}>
                    <FieldLabel>MESSAGE TEXT</FieldLabel>
                    <textarea
                        value={node.text}
                        onChange={(e) => onUpdateText(node.id, e.target.value)}
                        rows={5}
                        style={{ ...inputBase, resize: 'vertical', lineHeight: 1.62 }}
                    />
                </div>

                {(node.options || []).length > 0 && (
                    <div style={{ marginBottom: 20 }}>
                        <FieldLabel>OPTIONS · {(node.options || []).length}</FieldLabel>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            {(node.options || []).map((opt, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(27,73,101,0.18)', border: `1px solid ${C.border2}`, borderRadius: 6, padding: '8px 10px' }}>
                                    <span style={{ fontSize: 12, color: C.sub, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {opt.label}
                                    </span>
                                    <ChevronRight size={11} color={C.dim} strokeWidth={2.5} />
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: C.muted, background: 'rgba(27,73,101,0.35)', border: `1px solid ${C.border2}`, borderRadius: 3, padding: '2px 6px', flexShrink: 0 }}>
                                        {opt.nextId}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ height: 1, background: C.border2, margin: '18px 0' }} />

                <FieldLabel>METADATA</FieldLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {[['id', node.id], ['type', node.type], ['outputs', String((node.options || []).length)]].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.dim, width: 54, flexShrink: 0 }}>{k}</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#3d6a82' }}>{v}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}