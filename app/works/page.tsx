import Footer from '@/components/Footer'
import ImageGallery from '@/components/ImageGallery'
import { getWorks } from '@/lib/notion-works'

export const metadata = {
  title: 'Works — 優.bento',
}

export default async function WorksPage() {
  const works = await getWorks()
  const monoStyle = { fontFamily: 'var(--font-dm-mono)' }
  const serifStyle = { fontFamily: 'var(--font-shippori)' }

  return (
    <main>
      {/* PAGE HEADER */}
      <div
        className="px-6 md:px-14 pt-32 md:pt-40 pb-12 md:pb-20 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-end"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div>
          <span className="block mb-5 text-[11px] tracking-[0.2em] uppercase" style={{ ...monoStyle, color: 'var(--color-taupe)' }}>02 — Works</span>
          <h1 style={{ ...serifStyle, fontSize: 'clamp(56px, 8vw, 108px)', fontWeight: 400, lineHeight: 1, color: 'var(--color-ink)' }}>
            作ってきたもの
          </h1>
        </div>
        <p
          className="text-[14px] leading-[2] max-w-[400px]"
          style={{ color: 'var(--color-muted)', borderLeft: '1px solid var(--color-border)', paddingLeft: '32px' }}
        >
          実績というより、思考の記録。<br />
          何を作ったかではなく、<br />
          なぜそう設計したかを書いている。<br /><br />
          Before / Afterではなく、<br />
          Thinkingを読んでほしい。
        </p>
      </div>

      {/* INDEX */}
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-14 hidden md:flex"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        {works.map((w, i) => (
          <a
            key={w.id}
            href={`#${w.id}`}
            className="flex-1 flex items-center gap-4 py-8 no-underline transition-colors duration-200 group"
            style={{
              ...monoStyle,
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'var(--color-muted)',
              borderRight: i < works.length - 1 ? '1px solid var(--color-border)' : undefined,
              paddingRight: i < works.length - 1 ? '24px' : 0,
              paddingLeft: i > 0 ? '24px' : 0,
            }}
          >
            <span style={{ color: 'var(--color-border)' }}>{w.num || `0${i + 1}`}</span>
            <span>{w.title}</span>
          </a>
        ))}
      </div>

      {/* WORK ENTRIES */}
      {works.map((work) => (
        <div
          key={work.id}
          id={work.id}
          className="max-w-[1200px] mx-auto px-6 md:px-14 py-14 md:py-24"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          {/* meta */}
          <div className="flex items-baseline gap-6 mb-16">
            <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.1em' }}>{work.num}</span>
            <span
              className="text-[10px] px-3 py-1 tracking-[0.1em] uppercase"
              style={{ ...monoStyle, color: 'var(--color-taupe)', border: '1px solid var(--color-border)' }}
            >
              {work.cat}
            </span>
            {work.url && (
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-[11px] tracking-[0.08em] transition-colors duration-200"
                style={{ ...monoStyle, color: 'var(--color-muted)' }}
              >
                {work.url.replace('https://', '')} ↗
              </a>
            )}
          </div>

          <h2
            className="mb-6"
            style={{ ...serifStyle, fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 400, lineHeight: 1.15, color: 'var(--color-ink)' }}
          >
            {work.title}
          </h2>
          {work.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-start">
              <p className="text-[14px] leading-[1.9] whitespace-pre-line" style={{ color: 'var(--color-muted)' }}>
                {work.subtitle}
              </p>
              <ImageGallery images={work.images} alt={work.title} />
            </div>
          ) : (
            <p className="text-[14px] leading-[1.9] mb-16 whitespace-pre-line" style={{ color: 'var(--color-muted)', maxWidth: '560px' }}>
              {work.subtitle}
            </p>
          )}

          {/* scope table */}
          {work.scope.length > 0 && (
            <div className="mb-20" style={{ borderTop: '1px solid var(--color-border)' }}>
              {work.scope.map((row, i) => (
                <div
                  key={i}
                  className="grid gap-6 py-4 text-[13px]"
                  style={{ gridTemplateColumns: '140px 1fr', borderBottom: '1px solid var(--color-border)' }}
                >
                  <span
                    className="text-[10px] tracking-[0.1em] uppercase pt-1"
                    style={{ ...monoStyle, color: 'var(--color-muted)' }}
                  >
                    {row.key}
                  </span>
                  <div style={{ color: 'var(--color-ink)' }}>
                    {row.val || null}
                    {row.tags && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {row.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] px-2.5 py-1 tracking-[0.05em]"
                            style={{ ...monoStyle, color: 'var(--color-taupe)', border: '1px solid var(--color-border)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* thinking */}
          {work.thinking.length > 0 && (
            <div>
              <div
                className="flex items-center gap-5 mb-12 text-[10px] tracking-[0.2em] uppercase"
                style={{ ...monoStyle, color: 'var(--color-taupe)' }}
              >
                Thinking
                <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {work.thinking.map((t, i) => (
                  <div
                    key={i}
                    className={['py-10 border-t', i % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:border-l'].join(' ')}
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div
                      className="mb-4 text-[10px] tracking-[0.12em] uppercase"
                      style={{ ...monoStyle, color: 'var(--color-muted)' }}
                    >
                      {t.q}
                    </div>
                    <div
                      className="mb-4 text-[18px] font-medium leading-[1.7]"
                      style={{ ...serifStyle, color: 'var(--color-ink)' }}
                    >
                      {t.a}
                    </div>
                    <div className="text-[13px] leading-[1.9] whitespace-pre-line" style={{ color: 'var(--color-muted)' }}>
                      {t.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* footer nav */}
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-14 py-12 md:py-20 flex justify-between items-center"
      >
        <a href="/" style={{ ...monoStyle, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', textDecoration: 'none' }}>← Home</a>
        <a href="/about" style={{ ...monoStyle, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', textDecoration: 'none' }}>About →</a>
      </div>

      <Footer />
    </main>
  )
}
