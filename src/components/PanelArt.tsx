import { useId, type ReactNode } from 'react'
import type { PanelVariant } from '../data/services'

/**
 * On-brand SVG illustrations of electrical panels and site work.
 * Lightweight (no image downloads) and crisp at any size. Replace with real
 * photography by setting `image` on a service or project entry.
 */

type ArtVariant = PanelVariant | 'hero'

const GREY = '#dfe4ea'
const GREY_DARK = '#c3cad4'
const EDGE = '#8d99a8'

function Lamp({ x, y, color, r = 4.5 }: { x: number; y: number; color: string; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r + 2} fill="#2b3442" />
      <circle cx={x} cy={y} r={r} fill={color} />
      <circle cx={x - r / 3} cy={y - r / 3} r={r / 3} fill="#fff" opacity={0.6} />
    </g>
  )
}

function AnalogMeter({ x, y, s = 30 }: { x: number; y: number; s?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={2} fill="#2b3442" />
      <rect x={x + 2} y={y + 2} width={s - 4} height={s - 4} rx={1} fill="#f8fafc" />
      <path d={`M${x + 6} ${y + s - 9} A ${s / 2 - 5} ${s / 2 - 5} 0 0 1 ${x + s - 6} ${y + s - 9}`} stroke="#334155" strokeWidth={1.2} fill="none" />
      <line x1={x + s / 2} y1={y + s - 8} x2={x + s - 10} y2={y + 10} stroke="#dc2626" strokeWidth={1.4} />
    </g>
  )
}

function Digital({ x, y, w = 40, h = 22, text = '415.2', color = '#7cf0a8' }: { x: number; y: number; w?: number; h?: number; text?: string; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill="#1e2633" />
      <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx={1} fill="#0b1220" />
      <text x={x + w / 2} y={y + h / 2 + 3.5} textAnchor="middle" fontFamily="monospace" fontSize={h * 0.42} fill={color}>
        {text}
      </text>
    </g>
  )
}

function Handle({ x, y, h = 26 }: { x: number; y: number; h?: number }) {
  return <rect x={x} y={y} width={5} height={h} rx={2.5} fill="#3b4656" />
}

function Rotary({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={7} fill="#2b3442" />
      <rect x={x - 1.8} y={y - 6} width={3.6} height={12} rx={1.5} fill="#f7ad1f" transform={`rotate(35 ${x} ${y})`} />
    </g>
  )
}

function Louvers({ x, y, w, n = 4 }: { x: number; y: number; w: number; n?: number }) {
  return (
    <g stroke={EDGE} strokeWidth={1.4} strokeLinecap="round">
      {Array.from({ length: n }, (_, i) => (
        <line key={i} x1={x} y1={y + i * 5} x2={x + w} y2={y + i * 5} />
      ))}
    </g>
  )
}

function Cabinet({ x, w, top = 90, base = 340, gid, children }: { x: number; w: number; top?: number; base?: number; gid: string; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={top - 10} width={w} height={10} fill={GREY_DARK} />
      <rect x={x} y={top} width={w} height={base - top} fill={`url(#${gid}-body)`} stroke={EDGE} strokeWidth={1} />
      <rect x={x + 4} y={top + 4} width={w - 8} height={base - top - 8} fill="none" stroke={EDGE} strokeWidth={0.8} opacity={0.7} />
      <rect x={x} y={base} width={w} height={12} fill="#1f2937" />
      {children}
    </g>
  )
}

/** A stack of withdrawable-style feeder modules (MCC/PCC outgoing feeders). */
function FeederStack({ x, w, top, rows, lamps = true }: { x: number; w: number; top: number; rows: number; lamps?: boolean }) {
  const h = 46
  return (
    <g>
      {Array.from({ length: rows }, (_, i) => {
        const y = top + i * (h + 4)
        return (
          <g key={i}>
            <rect x={x + 8} y={y} width={w - 16} height={h} rx={1.5} fill="#e9edf2" stroke={EDGE} strokeWidth={0.8} />
            <Rotary x={x + 24} y={y + h / 2} />
            {lamps && <Lamp x={x + w - 34} y={y + 14} color={i % 3 === 1 ? '#ef4444' : '#22c55e'} r={3.4} />}
            {lamps && <Lamp x={x + w - 22} y={y + 14} color="#f7ad1f" r={3.4} />}
            <rect x={x + w - 38} y={y + 28} width={22} height={6} rx={1} fill="#94a3b8" />
          </g>
        )
      })}
    </g>
  )
}

function Defs({ gid }: { gid: string }) {
  return (
    <defs>
      <linearGradient id={`${gid}-body`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#eef1f5" />
        <stop offset="0.5" stopColor={GREY} />
        <stop offset="1" stopColor="#cfd6df" />
      </linearGradient>
      <linearGradient id={`${gid}-screen`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#173a6b" />
        <stop offset="1" stopColor="#0b1f3f" />
      </linearGradient>
      <radialGradient id={`${gid}-glow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#4aa3ea" stopOpacity="0.45" />
        <stop offset="1" stopColor="#4aa3ea" stopOpacity="0" />
      </radialGradient>
    </defs>
  )
}

function Floor({ gid, cx = 300, rx = 270 }: { gid: string; cx?: number; rx?: number }) {
  return (
    <>
      <ellipse cx={cx} cy={200} rx={rx} ry={170} fill={`url(#${gid}-glow)`} />
      <ellipse cx={cx} cy={356} rx={rx} ry={10} fill="#000" opacity={0.28} />
    </>
  )
}

function ACBSection({ x, w, gid, label = 'INCOMER' }: { x: number; w: number; gid: string; label?: string }) {
  return (
    <Cabinet x={x} w={w} gid={gid}>
      <rect x={x + 10} y={100} width={w - 20} height={18} rx={2} fill="#102a52" />
      <text x={x + w / 2} y={112.5} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize={8} fontWeight={700} fill="#fff" letterSpacing={1}>
        {label}
      </text>
      <AnalogMeter x={x + 12} y={128} />
      <Digital x={x + w - 54} y={132} w={42} />
      <Lamp x={x + 18} y={176} color="#ef4444" />
      <Lamp x={x + 34} y={176} color="#f7ad1f" />
      <Lamp x={x + 50} y={176} color="#3b82f6" />
      <rect x={x + 12} y={196} width={w - 24} height={64} rx={2} fill="#2b3442" />
      <rect x={x + 18} y={202} width={w - 36} height={52} rx={1} fill="#475569" />
      <rect x={x + w / 2 - 12} y={214} width={24} height={10} rx={1} fill="#f7ad1f" />
      <rect x={x + w / 2 - 8} y={232} width={16} height={14} rx={1} fill="#1e2633" />
      <Handle x={x + w - 14} y={272} />
      <Louvers x={x + 14} y={306} w={w - 28} />
    </Cabinet>
  )
}

function HMISection({ x, w, gid }: { x: number; w: number; gid: string }) {
  return (
    <Cabinet x={x} w={w} gid={gid}>
      <rect x={x + 14} y={104} width={w - 28} height={74} rx={4} fill="#1e2633" />
      <rect x={x + 19} y={109} width={w - 38} height={64} rx={2} fill={`url(#${gid}-screen)`} />
      <polyline
        points={`${x + 24},${160} ${x + 38},${148} ${x + 50},${154} ${x + 64},${132} ${x + 78},${140} ${x + w - 26},${122}`}
        fill="none"
        stroke="#4aa3ea"
        strokeWidth={2}
      />
      <rect x={x + 24} y={114} width={26} height={5} rx={1} fill="#f7ad1f" />
      <rect x={x + w - 46} y={114} width={20} height={5} rx={1} fill="#22c55e" />
      {[0, 1, 2, 3].map((i) => (
        <Lamp key={i} x={x + 24 + i * ((w - 48) / 3)} y={196} color={['#22c55e', '#ef4444', '#f7ad1f', '#3b82f6'][i]} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={x + 28 + i * ((w - 56) / 2)} cy={222} r={8} fill="#2b3442" />
          <circle cx={x + 28 + i * ((w - 56) / 2)} cy={222} r={5.5} fill={['#16a34a', '#dc2626', '#f7ad1f'][i]} />
        </g>
      ))}
      <Rotary x={x + 30} y={250} />
      <Rotary x={x + w - 30} y={250} />
      <Handle x={x + w - 14} y={272} />
      <Louvers x={x + 14} y={306} w={w - 28} />
    </Cabinet>
  )
}

function ControllerSection({ x, w, gid, reading, steps = 0, title }: { x: number; w: number; gid: string; reading: string; steps?: number; title: string }) {
  return (
    <Cabinet x={x} w={w} gid={gid}>
      <rect x={x + 10} y={100} width={w - 20} height={18} rx={2} fill="#102a52" />
      <text x={x + w / 2} y={112.5} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize={8} fontWeight={700} fill="#fff" letterSpacing={1}>
        {title}
      </text>
      <rect x={x + 16} y={128} width={w - 32} height={56} rx={3} fill="#e9edf2" stroke={EDGE} />
      <Digital x={x + 24} y={136} w={w - 48} h={26} text={reading} color="#7cc0f2" />
      {Array.from({ length: Math.max(steps, 3) }, (_, i) => (
        <rect key={i} x={x + 24 + i * ((w - 48) / Math.max(steps, 3))} y={168} width={(w - 48) / Math.max(steps, 3) - 3} height={8} rx={1} fill={i < steps - 1 ? '#22c55e' : '#94a3b8'} />
      ))}
      <AnalogMeter x={x + 16} y={196} />
      <AnalogMeter x={x + w - 46} y={196} />
      <Lamp x={x + w / 2 - 16} y={244} color="#ef4444" />
      <Lamp x={x + w / 2} y={244} color="#f7ad1f" />
      <Lamp x={x + w / 2 + 16} y={244} color="#3b82f6" />
      <Handle x={x + w - 14} y={268} />
      <Louvers x={x + 14} y={306} w={w - 28} />
    </Cabinet>
  )
}

function OpenPanel({ x, w, gid }: { x: number; w: number; gid: string }) {
  const rails = [116, 176, 236]
  return (
    <Cabinet x={x} w={w} gid={gid}>
      <rect x={x + 8} y={98} width={w - 16} height={234} fill="#f1f4f8" stroke={EDGE} />
      <rect x={x + 12} y={102} width={w - 24} height={8} fill="#94a3b8" opacity={0.5} />
      {rails.map((ry, r) => (
        <g key={ry}>
          <rect x={x + 14} y={ry + 14} width={w - 28} height={4} fill="#9aa5b4" />
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <rect x={x + 18 + i * ((w - 36) / 6)} y={ry} width={(w - 36) / 6 - 4} height={32} rx={1.5} fill={r === 1 && i > 3 ? '#1f4d8a' : '#fafafa'} stroke="#64748b" strokeWidth={0.8} />
              <rect x={x + 21 + i * ((w - 36) / 6)} y={ry + 12} width={(w - 36) / 6 - 10} height={6} fill={r === 0 ? '#f7ad1f' : '#334155'} />
            </g>
          ))}
          <rect x={x + 14} y={ry + 38} width={w - 28} height={12} fill="#cbd5e1" stroke="#94a3b8" strokeWidth={0.6} />
        </g>
      ))}
      <rect x={x + 14} y={296} width={w - 28} height={30} fill="#cbd5e1" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={x + 20 + i * ((w - 40) / 7)} y1={296} x2={x + 20 + i * ((w - 40) / 7)} y2={326} stroke={['#dc2626', '#f7ad1f', '#2563eb', '#111827'][i % 4]} strokeWidth={2.2} />
      ))}
    </Cabinet>
  )
}

function Door({ x, gid }: { x: number; gid: string }) {
  // Opened door seen in perspective.
  return (
    <g>
      <polygon points={`${x},80 ${x + 46},96 ${x + 46},336 ${x},352`} fill={`url(#${gid}-body)`} stroke={EDGE} />
      <polygon points={`${x + 6},96 ${x + 40},106 ${x + 40},326 ${x + 6},336`} fill="none" stroke={EDGE} strokeWidth={0.8} />
    </g>
  )
}

function Clipboard({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={92} height={118} rx={6} fill="#102a52" />
      <rect x={x + 7} y={y + 12} width={78} height={98} rx={3} fill="#fff" />
      <rect x={x + 30} y={y - 5} width={32} height={14} rx={4} fill="#f7ad1f" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={x + 14} y={y + 24 + i * 20} width={10} height={10} rx={2} fill="none" stroke="#1f6fd1" strokeWidth={1.6} />
          {i < 3 && <path d={`M${x + 16} ${y + 29 + i * 20} l3 3 l5 -6`} stroke="#16a34a" strokeWidth={2} fill="none" />}
          <rect x={x + 30} y={y + 27 + i * 20} width={44 - (i % 2) * 12} height={4} rx={2} fill="#cbd5e1" />
        </g>
      ))}
    </g>
  )
}

function CableScene({ gid }: { gid: string }) {
  const colors = ['#111827', '#1f2937', '#334155', '#7c2d12', '#1e3a8a', '#111827']
  return (
    <g>
      <Floor gid={gid} />
      {/* Cable tray in perspective */}
      <polygon points="40,250 560,150 580,170 60,276" fill="#9aa5b4" />
      <polygon points="40,250 560,150 560,140 40,238" fill="#c3cad4" />
      <polygon points="60,276 580,170 580,182 60,288" fill="#7b8796" />
      {Array.from({ length: 14 }, (_, i) => {
        const t = i / 13
        const x1 = 50 + t * 510
        const y1 = 248 - t * 98
        return <line key={i} x1={x1} y1={y1 + 2} x2={x1 + 20} y2={y1 + 24} stroke="#7b8796" strokeWidth={3} />
      })}
      {colors.map((c, i) => (
        <path key={i} d={`M${46 + i * 3} ${246 + i * 4.2} L${566 + i * 2} ${148 + i * 3.4}`} stroke={c} strokeWidth={7} strokeLinecap="round" />
      ))}
      {/* Drop to panel */}
      <path d="M520 160 C 520 210, 500 230, 500 280" stroke="#111827" strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d="M534 158 C 534 210, 514 236, 514 280" stroke="#1e3a8a" strokeWidth={7} fill="none" strokeLinecap="round" />
      <Cabinet x={470} w={80} top={280} base={340} gid={gid}>
        <rect x={486} y={276} width={46} height={6} fill="#475569" />
        <Lamp x={490} y={304} color="#22c55e" />
        <Lamp x={506} y={304} color="#f7ad1f" />
        <Handle x={536} y={296} h={20} />
      </Cabinet>
      {/* Hanging cable label tags */}
      {[140, 260, 380].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={232 - i * 23} x2={x} y2={250 - i * 23} stroke="#f7ad1f" strokeWidth={1.4} />
          <rect x={x - 14} y={250 - i * 23} width={28} height={12} rx={2} fill="#f7ad1f" />
        </g>
      ))}
      {/* Cable drum */}
      <g>
        <circle cx={130} cy={318} r={36} fill="#7c4a1e" />
        <circle cx={130} cy={318} r={28} fill="#111827" />
        <circle cx={130} cy={318} r={10} fill="#a16207" />
        <circle cx={130} cy={318} r={4} fill="#3b2410" />
      </g>
    </g>
  )
}

function Transformer({ x, gid }: { x: number; gid: string }) {
  return (
    <g>
      <rect x={x} y={200} width={100} height={140} rx={4} fill={`url(#${gid}-body)`} stroke={EDGE} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={x + 8 + i * 11.5} y={214} width={6} height={112} rx={2} fill={GREY_DARK} stroke={EDGE} strokeWidth={0.6} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x + 22 + i * 26} y={176} width={8} height={24} fill="#a16207" />
          <circle cx={x + 26 + i * 26} cy={174} r={6} fill="#c2410c" />
        </g>
      ))}
      <rect x={x} y={340} width={100} height={12} fill="#1f2937" />
    </g>
  )
}

function Generator({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y={210} width={220} height={130} rx={6} fill="#173a6b" />
      <rect x={x + 6} y={216} width={208} height={118} rx={4} fill="none" stroke="#4aa3ea" strokeOpacity={0.5} />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={x + 20} y={232 + i * 10} width={70} height={4} rx={2} fill="#0b1f3f" />
      ))}
      <rect x={x + 110} y={236} width={90} height={60} rx={3} fill="#0b1f3f" />
      <Digital x={x + 120} y={244} w={70} h={24} text="50.0Hz" color="#7cc0f2" />
      <Lamp x={x + 128} y={282} color="#22c55e" />
      <Lamp x={x + 144} y={282} color="#f7ad1f" />
      <rect x={x + 172} y={276} width={20} height={12} rx={2} fill="#dc2626" />
      <rect x={x + 30} y={190} width={18} height={22} fill="#334155" />
      <rect x={x + 26} y={186} width={26} height={6} rx={2} fill="#1f2937" />
      <rect x={x + 160} y={302} width={44} height={20} rx={2} fill="#f7ad1f" />
      <text x={x + 182} y={316} textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize={8} fontWeight={800} fill="#102a52">
        DG SET
      </text>
      <rect x={x - 4} y={340} width={228} height={12} fill="#1f2937" />
    </g>
  )
}

function Scene({ variant, gid }: { variant: ArtVariant; gid: string }) {
  switch (variant) {
    case 'hero':
      return (
        <g>
          <Floor gid={gid} cx={300} rx={300} />
          <ACBSection x={20} w={104} gid={gid} />
          <ACBSection x={124} w={104} gid={gid} label="B/C" />
          <Cabinet x={228} w={96} gid={gid}>
            <FeederStack x={228} w={96} top={98} rows={4} />
            <Louvers x={242} y={306} w={68} />
          </Cabinet>
          <Cabinet x={324} w={96} gid={gid}>
            <FeederStack x={324} w={96} top={98} rows={4} />
            <Louvers x={338} y={306} w={68} />
          </Cabinet>
          <HMISection x={420} w={120} gid={gid} />
          <Cabinet x={540} w={44} gid={gid}>
            <Louvers x={550} y={120} w={24} n={6} />
            <Louvers x={550} y={290} w={24} n={6} />
          </Cabinet>
        </g>
      )
    case 'pcc':
      return (
        <g>
          <Floor gid={gid} />
          <ACBSection x={70} w={116} gid={gid} />
          <ACBSection x={186} w={116} gid={gid} label="INCOMER 2" />
          <Cabinet x={302} w={110} gid={gid}>
            <FeederStack x={302} w={110} top={98} rows={4} />
            <Louvers x={318} y={306} w={78} />
          </Cabinet>
          <Cabinet x={412} w={110} gid={gid}>
            <FeederStack x={412} w={110} top={98} rows={4} />
            <Louvers x={428} y={306} w={78} />
          </Cabinet>
        </g>
      )
    case 'mcc':
      return (
        <g>
          <Floor gid={gid} />
          {[60, 156, 252, 348, 444].map((x) => (
            <Cabinet key={x} x={x} w={96} gid={gid}>
              <FeederStack x={x} w={96} top={98} rows={4} />
              <Louvers x={x + 14} y={306} w={68} />
            </Cabinet>
          ))}
        </g>
      )
    case 'plc':
      return (
        <g>
          <Floor gid={gid} />
          <HMISection x={150} w={150} gid={gid} />
          <OpenPanel x={300} w={150} gid={gid} />
          <Door x={450} gid={gid} />
        </g>
      )
    case 'apfc':
      return (
        <g>
          <Floor gid={gid} />
          <ControllerSection x={130} w={130} gid={gid} reading="PF 0.99" steps={6} title="APFC" />
          <Cabinet x={260} w={210} gid={gid}>
            {Array.from({ length: 6 }, (_, i) => (
              <g key={i}>
                <rect x={276 + (i % 3) * 62} y={110 + Math.floor(i / 3) * 90} width={52} height={78} rx={8} fill="#94a3b8" />
                <rect x={282 + (i % 3) * 62} y={104 + Math.floor(i / 3) * 90} width={40} height={8} rx={2} fill="#475569" />
                <circle cx={293 + (i % 3) * 62} cy={102 + Math.floor(i / 3) * 90} r={3} fill="#f7ad1f" />
                <circle cx={311 + (i % 3) * 62} cy={102 + Math.floor(i / 3) * 90} r={3} fill="#f7ad1f" />
              </g>
            ))}
            <Louvers x={276} y={292} w={178} n={7} />
          </Cabinet>
        </g>
      )
    case 'amf':
      return (
        <g>
          <Floor gid={gid} />
          <ControllerSection x={110} w={130} gid={gid} reading="MAINS OK" title="AMF" />
          <ACBSection x={240} w={120} gid={gid} label="MAINS" />
          <ACBSection x={360} w={120} gid={gid} label="DG" />
        </g>
      )
    case 'dg':
      return (
        <g>
          <Floor gid={gid} />
          <Generator x={70} />
          <ControllerSection x={330} w={130} gid={gid} reading="415V" title="DG CONTROL" />
          <Cabinet x={460} w={80} gid={gid}>
            <FeederStack x={460} w={80} top={98} rows={4} lamps={false} />
          </Cabinet>
        </g>
      )
    case 'amc':
      return (
        <g>
          <Floor gid={gid} />
          <OpenPanel x={110} w={170} gid={gid} />
          <Door x={280} gid={gid} />
          <Clipboard x={380} y={180} />
          {/* Multimeter */}
          <g>
            <rect x={486} y={232} width={56} height={92} rx={8} fill="#f7ad1f" />
            <rect x={494} y={240} width={40} height={24} rx={2} fill="#0b1220" />
            <text x={514} y={256} textAnchor="middle" fontFamily="monospace" fontSize={10} fill="#7cf0a8">
              230.4
            </text>
            <circle cx={514} cy={292} r={13} fill="#1f2937" />
            <rect x={512} y={281} width={4} height={10} fill="#e5e7eb" />
            <path d="M500 324 C 490 345, 440 340, 420 330" stroke="#dc2626" strokeWidth={3} fill="none" />
            <path d="M528 324 C 530 350, 470 352, 450 345" stroke="#111827" strokeWidth={3} fill="none" />
          </g>
        </g>
      )
    case 'cable':
      return <CableScene gid={gid} />
    case 'turnkey':
      return (
        <g>
          <Floor gid={gid} cx={300} rx={290} />
          {/* Overhead tray */}
          <rect x={150} y={52} width={420} height={10} fill="#9aa5b4" />
          {['#111827', '#1e3a8a', '#334155', '#111827'].map((c, i) => (
            <line key={i} x1={160 + i * 6} y1={53 + i * 2} x2={560} y2={53 + i * 2} stroke={c} strokeWidth={3} />
          ))}
          <path d="M140 220 C 140 120, 170 60, 200 58" stroke="#111827" strokeWidth={6} fill="none" />
          <Transformer x={40} gid={gid} />
          <ACBSection x={170} w={110} gid={gid} />
          <Cabinet x={280} w={100} gid={gid}>
            <FeederStack x={280} w={100} top={98} rows={4} />
            <Louvers x={294} y={306} w={72} />
          </Cabinet>
          <HMISection x={380} w={120} gid={gid} />
          <ControllerSection x={500} w={84} gid={gid} reading="0.98" steps={4} title="APFC" />
        </g>
      )
  }
}

export function PanelArt({ variant, className = '', title }: { variant: ArtVariant; className?: string; title?: string }) {
  const gid = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 30 600 340" className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} preserveAspectRatio="xMidYMid meet">
      <Defs gid={gid} />
      <Scene variant={variant} gid={gid} />
    </svg>
  )
}

/** Navy blueprint backdrop with an illustration — or a real photo when supplied. */
export function ServiceVisual({ variant, image, alt, className = '' }: { variant: PanelVariant; image?: string; alt: string; className?: string }) {
  if (image) {
    return <img src={image} alt={alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />
  }
  return (
    <div className={`blueprint relative flex h-full w-full items-end justify-center overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 ${className}`}>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-electric-400 via-electric-300 to-gold-500" />
      <PanelArt variant={variant} title={alt} className="relative h-full w-full p-3" />
    </div>
  )
}
