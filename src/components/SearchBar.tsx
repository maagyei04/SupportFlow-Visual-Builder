interface Props {
    value: string
    onChange: (value: string) => void
    resultCount: number
}

export function SearchBar({ value, onChange, resultCount }: Props) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ position: 'relative', width: 280 }}>
                <span
                    style={{
                        position: 'absolute',
                        left: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#64748b',
                        fontSize: 14,
                    }}
                >
                    🔍
                </span>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search nodes..."
                    style={{
                        width: '100%',
                        padding: '8px 12px 8px 34px',
                        background: '#1a1d29',
                        border: '1px solid #2a2f42',
                        borderRadius: 6,
                        color: '#e2e8f0',
                        fontSize: 13,
                    }}
                />
            </div>
            {value.trim().length > 0 && (
                <span style={{ fontSize: 12, color: '#94a3b8' }}>
                    {resultCount} match{resultCount !== 1 ? 'es' : ''}
                </span>
            )}
        </div>
    )
}