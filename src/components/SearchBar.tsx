import { Search, X, Plus } from 'lucide-react'

interface Props {
    value: string
    onChange: (value: string) => void
    resultCount: number
}

const C = {
  border:  'rgba(27,73,101,0.55)',
  border2: 'rgba(27,73,101,0.3)',
  text:    '#d4e8f0',
  sub:     '#7fb0c8',
  muted:   '#4a7a96',
  dim:     '#2a4d65',
  teal:    '#62B6CB',
} as const

export function SearchBar({ value, onChange, resultCount }: Props) {
    return (
        <div style={{ height: 46, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderBottom: `1px solid ${C.border2}`, flexShrink: 0, gap: 12 }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(27,73,101,0.2)', border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 11px', width: 230 }}>
                <Search size={12} color={C.muted} />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Find node…"
                    style={{ background: 'none', border: 'none', outline: 'none', fontSize: 12.5, color: C.text, flex: 1, fontFamily: "'Inter', sans-serif" }}
                />
                {value.trim().length > 0 && (
                    <button
                        onClick={() => onChange('')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: C.muted }}
                    >
                        <X size={11} />
                    </button>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {value.trim().length > 0 && (
                    <span style={{ fontSize: 11, color: C.muted }}>
                        {resultCount} match{resultCount !== 1 ? 'es' : ''}
                    </span>
                )}
                <button disabled style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(27,73,101,0.1)', border: `1px solid rgba(27,73,101,0.25)`, borderRadius: 6, padding: '5px 11px', cursor: 'not-allowed', color: C.dim, fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 500, opacity: 0.5 }}>
                    <Plus size={12} /> Add Node
                </button>
            </div>
        </div>
    )
}