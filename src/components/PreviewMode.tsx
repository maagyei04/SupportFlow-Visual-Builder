import { useState, useCallback, useRef, useEffect } from 'react'
import { MessageSquare, Zap, CheckCircle, RotateCcw } from 'lucide-react'
import type { FlowNode } from '../types/flow'

interface Props {
    currentNode: FlowNode | null
    history: string[]
    allNodes: FlowNode[]
    onSelectOption: (nextId: string) => void
    onRestart: () => void
}

const C = {
  card:    '#122030',
  panel:   '#081218',
  border:  'rgba(27,73,101,0.55)',
  border2: 'rgba(27,73,101,0.3)',
  text:    '#d4e8f0',
  sub:     '#7fb0c8',
  muted:   '#4a7a96',
  dim:     '#2a4d65',
  teal:    '#62B6CB',
  iceBlue: '#BEE9E8',
} as const

interface ChatMsg { role: 'bot' | 'user'; text: string }

function OptionBtn({ label, onClick }: { label: string; onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? 'rgba(98,182,203,0.18)' : 'rgba(98,182,203,0.09)', border: `1px solid ${hov ? 'rgba(98,182,203,0.45)' : 'rgba(98,182,203,0.22)'}`, borderRadius: 7, padding: '10px 14px', cursor: 'pointer', color: C.teal, fontSize: 12.5, fontWeight: 500, fontFamily: "'Inter', sans-serif", textAlign: 'left', transition: 'background 0.1s, border-color 0.1s', lineHeight: 1.4 }}
    >
      {label}
    </button>
  )
}

export function PreviewMode({ currentNode, history, allNodes, onSelectOption, onRestart }: Props) {
    if (!currentNode) return <div style={{ color: C.muted, padding: 24 }}>Node not found</div>

    const nodeMap      = new Map(allNodes.map((n) => [n.id, n]))
    const bottomRef    = useRef<HTMLDivElement>(null)

    const buildLog = useCallback((): ChatMsg[] => {
        const msgs: ChatMsg[] = []
        for (let i = 0; i < history.length; i++) {
            const n = nodeMap.get(history[i])
            if (!n) continue
            if (i === 0) {
                msgs.push({ role: 'bot', text: n.text })
            } else {
                const prev = nodeMap.get(history[i - 1])
                const chosenOpt = prev?.options.find((o) => o.nextId === history[i])
                if (chosenOpt) msgs.push({ role: 'user', text: chosenOpt.label })
                msgs.push({ role: 'bot', text: n.text })
            }
        }
        return msgs
    }, [history, nodeMap])

    const log   = buildLog()
    const ended = currentNode.type === 'end'
    const step  = Math.max(1, Math.ceil(log.filter((m) => m.role === 'bot').length))

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [log.length, ended])

    return (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '36px 20px', backgroundImage: 'radial-gradient(circle, rgba(98,182,203,0.1) 1px, transparent 1px)', backgroundSize: '22px 22px' }}>
            <div style={{ width: '100%', maxWidth: 480, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 136px)', overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,0.55)' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderBottom: `1px solid ${C.border}`, background: C.panel, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 30, height: 30, borderRadius: 7, flexShrink: 0, background: 'rgba(98,182,203,0.12)', border: '1px solid rgba(98,182,203,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MessageSquare size={13} color={C.teal} />
                        </div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.25 }}>Bot Preview</div>
                            <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.25 }}>
                                {ended ? 'conversation ended' : `step ${step}`}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onRestart}
                        style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(27,73,101,0.35)', border: `1px solid ${C.border}`, borderRadius: 5, padding: '5px 10px', cursor: 'pointer', color: C.sub, fontSize: 11.5, fontFamily: "'Inter', sans-serif" }}
                    >
                        <RotateCcw size={11} /> Restart
                    </button>
                </div>

                <div style={{ flex: 1, overflow: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {log.map((msg, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-start', gap: 8 }}>
                            {msg.role === 'bot' && (
                                <div style={{ width: 22, height: 22, borderRadius: 5, flexShrink: 0, marginTop: 1, background: 'rgba(98,182,203,0.14)', border: '1px solid rgba(98,182,203,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Zap size={10} color={C.teal} />
                                </div>
                            )}
                            <div style={{ maxWidth: '75%', background: msg.role === 'bot' ? '#0f2233' : '#0e2b42', border: `1px solid ${msg.role === 'bot' ? 'rgba(27,73,101,0.55)' : 'rgba(98,182,203,0.28)'}`, borderRadius: msg.role === 'bot' ? '5px 10px 10px 2px' : '10px 5px 2px 10px', padding: '9px 13px', fontSize: 13, lineHeight: 1.58, color: msg.role === 'bot' ? C.sub : C.iceBlue }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {ended && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 6, padding: '10px 14px', background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 7 }}>
                            <CheckCircle size={13} color="#4ade80" />
                            <span style={{ fontSize: 12, color: '#4ade80', fontWeight: 500 }}>Conversation ended</span>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {!ended && currentNode.options.length > 0 && (
                    <div style={{ padding: '10px 14px 14px', borderTop: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: C.dim, letterSpacing: '0.06em' }}>CHOOSE A REPLY</span>
                        <div style={{ height: 6 }} />
                        {currentNode.options.map((opt, i) => (
                            <OptionBtn key={i} label={opt.label} onClick={() => onSelectOption(opt.nextId)} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}