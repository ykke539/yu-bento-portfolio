interface Props {
  num: string
  label: string
}

export default function SectionLabel({ num, label }: Props) {
  return (
    <div className="flex items-center gap-5 mb-20">
      <span
        style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '11px',
          color: 'var(--color-taupe)',
          letterSpacing: '0.1em',
        }}
      >
        {num}
      </span>
      <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
      <span
        style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '11px',
          color: 'var(--color-muted)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}
