import { useState } from 'react'
import type { FlowNode as FlowNodeType } from '../types/flow'

interface Props {
    node: FlowNodeType
    isSelected: boolean
    isMatched: boolean
    isDimmed: boolean
    onClick: (id: string) => void
}

const C = {
  card:    '#122030',
  border:  'rgba(27,73,101,0.55)',
  border2: 'rgba(27,73,101,0.3)',
  text:    '#d4e8f0',
  sub:     '#7fb0c8',
  muted:   '#4a7a96',
  dim:     '#2a4d65',
  techBlue:'#1B4965',
} as const

const NODE_STYLES: Record<string, { border: string; glow: string; badge: string; label: string }> = {
  start:    { border: '#4ade80', glow: 'rgba(74,222,128,0.09)',  badge: 'rgba(74,222,128,0.13)', label: '#4ade80' },
  question: { border: '#62B6CB', glow: 'rgba(98,182,203,0.1)',  badge: 'rgba(98,182,203,0.15)', label: '#62B6CB' },
  end:      { border: '#F4A261', glow: 'rgba(244,162,97,0.09)', badge: 'rgba(244,162,97,0.15)', label: '#F4A261' },
}

const TYPE_LABEL: Record<string, string> = { start: 'START', question: 'QUESTION', end: 'END' }

const NODE_W = 244
const NODE_H = 134

export function FlowNode({ node, isSelected, isMatched, isDimmed, onClick }: Props) {
    const col = NODE_STYLES[node.type] ?? NODE_STYLES.question
    const [hov, setHov] = useState(false)

    return (
        <div
            onClick={() => onClick(node.id)}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                position: 'absolute',
                left: node.position.x,
                top: node.position.y,
                width: NODE_W,
                minHeight: NODE_H,
                boxSizing: 'border-box',
                borderRadius: 8,
                background: isSelected ? col.glow : hov ? 'rgba(27,73,101,0.22)' : C.card,
                borderTop: `1px solid ${isSelected ? col.border : hov ? C.techBlue : 'rgba(27,73,101,0.45)'}`,
                borderRight: `1px solid ${isSelected ? col.border : hov ? C.techBlue : 'rgba(27,73,101,0.45)'}`,
                borderBottom: `1px solid ${isSelected ? col.border : hov ? C.techBlue : 'rgba(27,73,101,0.45)'}`,
                borderLeft: `3px solid ${col.border}`,
                cursor: 'pointer',
                padding: '13px 15px 12px',
                opacity: isDimmed ? 0.18 : 1,
                transition: 'opacity 0.18s, border-color 0.12s, background 0.12s, box-shadow 0.12s',
                boxShadow: isSelected
                    ? `0 0 0 3px ${col.border}25, 0 4px 28px rgba(0,0,0,0.5)`
                    : isMatched
                        ? `0 0 0 3px ${col.border}40, 0 0 24px ${col.glow}`
                        : hov ? '0 2px 16px rgba(0,0,0,0.4)' : '0 1px 6px rgba(0,0,0,0.3)',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 6 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 500, letterSpacing: '0.09em', color: col.label, background: col.badge, borderRadius: 3, padding: '2px 6px', flexShrink: 0 }}>
                    {TYPE_LABEL[node.type] ?? node.type.toUpperCase()}
                </span>
            </div>

            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.58, color: '#8aafc4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {node.text}
            </p>

            {node.options.length > 0 && (
                <div style={{ marginTop: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {node.options.map((opt, i) => (
                        <span key={i} style={{ fontSize: 10, color: C.muted, background: 'rgba(27,73,101,0.3)', border: `1px solid ${C.border2}`, borderRadius: 3, padding: '1.5px 6px' }}>
                            {opt.label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}