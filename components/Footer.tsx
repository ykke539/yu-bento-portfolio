export default function Footer() {
  return (
    <footer
      className="max-w-[1200px] mx-auto px-14 py-10 flex justify-between items-center flex-wrap gap-3"
      style={{
        borderTop: '1px solid var(--color-border)',
        fontFamily: 'var(--font-dm-mono)',
        fontSize: '10px',
        color: 'var(--color-muted)',
        letterSpacing: '0.1em',
      }}
    >
      <span>優.bento © 2026</span>
      <span>まったり、丁寧に、本質をレジスタンス</span>
      <span>Tokyo, Japan</span>
    </footer>
  )
}
