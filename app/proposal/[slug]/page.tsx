import { notFound } from 'next/navigation'
import { getProposalBySlug } from '@/lib/notion'
import Footer from '@/components/Footer'

const ALL_WORKS: Record<string, { name: string; cat: string; desc: string; tags: string[]; url?: string }> = {
  perzona: {
    name: 'Perzona', cat: 'Web App / Full Stack',
    desc: 'AIパーソナ診断サービス。着想からロゴ・全デザイン・全実装まで一人称で担当。決済（Stripe）を含むフルスタック構築。',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind', 'Vercel'],
    url: 'https://perzona.site/',
  },
  annonline: {
    name: 'annonline.jp', cat: 'WordPress / Full Stack',
    desc: 'WordPressオリジナルテーマをゼロから設計・構築。テンプレートや既製テーマへの依存なし。',
    tags: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
    url: 'https://annonline.jp/',
  },
  'ag-logo': {
    name: 'AG — ロゴデザイン', cat: 'Logo Design',
    desc: 'パフォーマー「AG」さんのロゴ。Adobe Illustratorで文字に人格を持たせる設計を行った。',
    tags: ['Adobe Illustrator', 'Brand Design'],
  },
  automation: {
    name: '業務効率化システム群', cat: 'Automation / Internal Tools',
    desc: 'ExcelVBA〜Next.jsまで、課題に最適な道具を選び複数の業務自動化ツールを設計・実装。',
    tags: ['Excel VBA', 'GAS', 'Next.js', 'TypeScript'],
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProposalPage({ params }: Props) {
  const { slug } = await params
  const proposal = await getProposalBySlug(slug)
  if (!proposal) notFound()

  const works = proposal.selectedWorks
    .map(key => ({ key, ...ALL_WORKS[key] }))
    .filter(w => w.name)

  return (
    <main>
      {/* 提案文 */}
      <section className="min-h-screen flex flex-col justify-center px-14 py-36 max-w-[900px] mx-auto">
        <div
          className="mb-8 text-[11px] tracking-[0.2em] uppercase flex items-center gap-4"
          style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-taupe)' }}
        >
          <span className="block w-8 h-px" style={{ background: 'var(--color-taupe)' }} />
          Proposal
        </div>
        <h1
          className="leading-[1.6] mb-12"
          style={{
            fontFamily: 'var(--font-shippori)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 400,
            color: 'var(--color-ink)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {proposal.proposalText}
        </h1>
        <div className="h-px w-16" style={{ background: 'var(--color-border)' }} />
      </section>

      {/* 実績 */}
      <section className="px-14 pb-36 max-w-[1200px] mx-auto">
        <div
          className="flex items-center gap-5 mb-16"
          style={{ borderTop: '1px solid var(--color-border)', paddingTop: '60px' }}
        >
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--color-taupe)', letterSpacing: '0.1em' }}>Works</span>
          <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
        </div>
        <div className="flex flex-col gap-0">
          {works.map((work, i) => (
            <div
              key={work.key}
              className="py-12"
              style={{ borderTop: i === 0 ? '1px solid var(--color-border)' : undefined, borderBottom: '1px solid var(--color-border)' }}
            >
              <div className="flex items-baseline gap-6 mb-6">
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.1em' }}>0{i + 1}</span>
                <span
                  className="text-[11px] tracking-[0.08em] uppercase px-3 py-1"
                  style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-taupe)', border: '1px solid var(--color-border)' }}
                >
                  {work.cat}
                </span>
                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline text-[11px] tracking-[0.08em] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-muted)' }}
                  >
                    {work.url.replace('https://', '')} ↗
                  </a>
                )}
              </div>
              <h2
                className="mb-4"
                style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 400, color: 'var(--color-ink)', lineHeight: 1.2 }}
              >
                {work.name}
              </h2>
              <p className="text-[14px] leading-[1.9] mb-8" style={{ color: 'var(--color-muted)', maxWidth: '560px' }}>
                {work.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {work.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] px-2.5 py-1 tracking-[0.06em]"
                    style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-taupe)', border: '1px solid var(--color-border)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* プロフィール */}
      <section
        className="px-14 py-36 max-w-[1200px] mx-auto"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div
          className="flex items-center gap-5 mb-16"
        >
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--color-taupe)', letterSpacing: '0.1em' }}>Profile</span>
          <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div
            style={{ fontFamily: 'var(--font-shippori)', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 400, color: 'var(--color-ink)', lineHeight: 1.7 }}
          >
            エンジニアとして作り、<br />
            デザイナーとして考え、<br />
            <em className="not-italic" style={{ color: 'var(--color-taupe)', textDecoration: 'underline', textUnderlineOffset: '6px', textDecorationColor: 'var(--color-border)' }}>思考する実装者</em>として<br />
            最後まで持っていく。
          </div>
          <div className="flex flex-col gap-0">
            {[
              ['Role', 'AI Native Product Designer\nDesign Engineer'],
              ['Stack', 'Next.js, Supabase, Vercel\nFigma, Notion, AI Tools'],
              ['Base', 'Tokyo, Japan'],
              ['Available', '案件相談可'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-6 py-5 text-[13px]" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <span className="min-w-[80px] text-[10px] tracking-[0.1em] uppercase pt-0.5" style={{ fontFamily: 'var(--font-dm-mono)', color: 'var(--color-muted)' }}>{k}</span>
                <span className="whitespace-pre-line leading-[1.7]" style={{ color: 'var(--color-ink)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <a
            href="mailto:yusuke.katsuki.539@gmail.com"
            className="inline-flex items-center gap-4 no-underline transition-all duration-250"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-ink)',
              padding: '18px 36px',
            }}
          >
            yusuke.katsuki.539@gmail.com →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
