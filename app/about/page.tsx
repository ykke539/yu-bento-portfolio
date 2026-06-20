import Footer from '@/components/Footer'
import { getAboutContent, type SkillItem, type RichTextSpan } from '@/lib/notion-about'
import { SnsIcon } from '@/components/SnsIcon'

export const metadata = {
  title: 'About — 優.bento',
}

const monoStyle = { fontFamily: 'var(--font-dm-mono)' }
const serifStyle = { fontFamily: 'var(--font-shippori)' }

// Notionのcolor annotationをCSSカラーに変換
function renderRichText(spans: RichTextSpan[]) {
  return spans.map((s, i) => {
    const colored = s.color !== 'default'
    return colored
      ? <em key={i} className="not-italic" style={{ color: 'var(--color-taupe)' }}>{s.text}</em>
      : <span key={i}>{s.text}</span>
  })
}

function buildSkillGroups(skillItems: SkillItem[]) {
  const groups: Record<string, { name: string; level: string }[]> = {}
  const order: string[] = []
  for (const s of skillItems) {
    const g = s.body || 'Other'
    if (!groups[g]) { groups[g] = []; order.push(g) }
    groups[g].push({ name: s.title, level: s.sub_label })
  }
  return order.map(g => ({ group: g, items: groups[g] }))
}

export default async function AboutPage() {
  const { journey, misc, skills: skillItems, profile, philosophy } = await getAboutContent()

  const skills = buildSkillGroups(skillItems)
  const profileMap = Object.fromEntries(profile.map(p => [p.title, p.body]))

  const catchCopy = profileMap['catch_copy'] || 'AI Native Product Designer × Design Engineer'
  const intro = profileMap['intro'] || 'エンジニアとして実装し、\nデザイナーとして設計し、\n思考する実装者として最後まで持っていく。\n\n「ちゃんと整う」を、一人称で担える人間でいたい。'
  const avatar = profileMap['avatar'] || '/avatar.png'
  const statusItems = ['Base', 'Available', 'Type']
    .map(k => ({ key: k, val: profileMap[k] }))
    .filter(i => i.val)

  return (
    <main>
      {/* HERO SPLIT */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen pt-[88px]">
        {/* 写真サイド */}
        <div
          className="relative flex items-end p-14 overflow-hidden"
          style={{ background: '#eae7e3', minHeight: '560px' }}
        >
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="portrait" className="absolute inset-0 w-full h-full object-cover object-top" />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'repeating-linear-gradient(-45deg, #dedad5, #dedad5 1px, #eae7e3 1px, #eae7e3 14px)' }}
            >
              <div
                className="text-center leading-[2.2] px-8 py-5"
                style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.15em', background: 'rgba(234,231,227,0.85)' }}
              >
                portrait photo<br />
                管理画面 Profile › avatar にURLを設定<br />
                推奨: 縦長, 自然光
              </div>
            </div>
          )}
          <div
            className="relative z-10 leading-[2]"
            style={{ ...monoStyle, fontSize: '10px', color: 'var(--color-taupe)', letterSpacing: '0.1em' }}
          >
            優.bento<br />Tokyo, Japan
          </div>
        </div>

        {/* テキストサイド */}
        <div
          className="flex flex-col justify-center px-16 py-20"
          style={{ borderLeft: '1px solid var(--color-border)' }}
        >
          <div
            className="flex items-center gap-3.5 mb-8 text-[10px] tracking-[0.2em] uppercase"
            style={{ ...monoStyle, color: 'var(--color-taupe)' }}
          >
            <span className="block w-6 h-px" style={{ background: 'var(--color-taupe)' }} />
            04 — About
          </div>
          <div style={{ ...serifStyle, fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 500, lineHeight: 1.1, color: 'var(--color-ink)' }}>
            優
          </div>
          <div
            className="mt-2 mb-10 text-[13px] tracking-[0.15em]"
            style={{ ...monoStyle, color: 'var(--color-muted)' }}
          >
            Yu — .bento
          </div>
          <div
            className="mb-10 text-[18px] leading-[1.6]"
            style={{ ...serifStyle, fontWeight: 400, color: 'var(--color-taupe)' }}
          >
            {catchCopy.split('×').map((part, i) => (
              <span key={i}>{i > 0 && '× '}{part}{i === 0 && <br />}</span>
            ))}
          </div>
          <p
            className="text-[14px] leading-[2] whitespace-pre-line"
            style={{ color: 'var(--color-ink)', borderLeft: '1px solid var(--color-border)', paddingLeft: '24px', maxWidth: '420px' }}
          >
            {intro}
          </p>
          {statusItems.length > 0 && (
            <div className="flex gap-12 mt-12 pt-10" style={{ borderTop: '1px solid var(--color-border)' }}>
              {statusItems.map(({ key, val }) => (
                <div key={key}>
                  <div className="mb-2 text-[9px] tracking-[0.15em] uppercase" style={{ ...monoStyle, color: 'var(--color-muted)' }}>{key}</div>
                  <div style={{ ...serifStyle, fontSize: '15px', color: 'var(--color-ink)' }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* JOURNEY */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-14">
        <div className="py-16 md:py-28" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-5 mb-16">
            <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-taupe)', letterSpacing: '0.1em' }}>01</span>
            <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Journey</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-20">
            <div />
            <div>
              {journey.map(ch => (
                <div
                  key={ch.id}
                  className="py-8"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <div className="mb-3 text-[10px] tracking-[0.12em]" style={{ ...monoStyle, color: 'var(--color-taupe)' }}>{ch.sub_label}</div>
                  <div className="mb-3 text-[20px] font-medium leading-[1.5]" style={{ ...serifStyle, color: 'var(--color-ink)' }}>{ch.title}</div>
                  {ch.body && (
                    <div className="text-[13px] leading-[1.9] whitespace-pre-line" style={{ color: 'var(--color-muted)' }}>{ch.body}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-14">
        <div className="py-16 md:py-28" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-5 mb-16">
            <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-taupe)', letterSpacing: '0.1em' }}>02</span>
            <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Skills</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {skills.map((group, gi) => (
              <div
                key={group.group}
                className={['py-10 border-t', gi === 0 ? 'md:pr-16' : '', gi === 1 ? 'md:px-10 md:border-l' : '', gi === 2 ? 'md:pl-10 md:border-l' : ''].join(' ')}
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="mb-6 text-[10px] tracking-[0.15em] uppercase" style={{ ...monoStyle, color: 'var(--color-taupe)' }}>
                  {group.group}
                </div>
                <ul className="list-none flex flex-col gap-2.5">
                  {group.items.map(({ name, level }) => (
                    <li
                      key={name}
                      className="flex items-center gap-3"
                      style={{ ...serifStyle, fontSize: '15px', color: 'var(--color-ink)' }}
                    >
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--color-taupe)' }} />
                      {name}
                      <span className="ml-auto text-[9px] tracking-[0.08em]" style={{ ...monoStyle, color: 'var(--color-muted)' }}>{level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PHILOSOPHY */}
      {philosophy.length > 0 && (
        <div id="philosophy" className="max-w-[1200px] mx-auto px-6 md:px-14">
          <div className="py-16 md:py-28" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-5 mb-16">
              <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-taupe)', letterSpacing: '0.1em' }}>03</span>
              <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
              <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Philosophy</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {philosophy.map((item, i) => (
                <div
                  key={item.id}
                  className={['py-10 md:py-12 border-t', i % 2 === 0 ? 'md:pr-16 md:border-r' : 'md:pl-16'].join(' ')}
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div className="mb-5 text-sm tracking-[0.05em]" style={{ ...serifStyle, color: 'var(--color-taupe)' }}>{item.title}</div>
                  <div className="leading-[1.5] mb-5 whitespace-pre-line" style={{ ...serifStyle, fontSize: 'clamp(20px, 3vw, 34px)', fontWeight: 500, color: 'var(--color-ink)' }}>
                    {renderRichText(item.bodyRich)}
                  </div>
                  <div className="text-[13px] leading-[1.8]" style={{ color: 'var(--color-muted)', maxWidth: '340px' }}>{item.sub_label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MISC */}
      {misc.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-6 md:px-14">
          <div className="py-16 md:py-28" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-5 mb-16">
              <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-taupe)', letterSpacing: '0.1em' }}>04</span>
              <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
              <span style={{ ...monoStyle, fontSize: '11px', color: 'var(--color-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Elsewhere</span>
            </div>
            <div className="flex flex-col gap-0" style={{ maxWidth: '480px' }}>
              {misc.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-8 py-5 no-underline group transition-colors"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <span
                    className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase"
                    style={{ ...monoStyle, color: 'var(--color-muted)', minWidth: '72px' }}
                  >
                    <SnsIcon name={link.sub_label || link.name} size={12} />
                    {link.sub_label}
                  </span>
                  <span
                    className="text-[14px] transition-colors"
                    style={{ ...serifStyle, color: 'var(--color-ink)' }}
                  >
                    {link.name}
                  </span>
                  <span
                    className="ml-auto text-[11px] transition-colors"
                    style={{ ...monoStyle, color: 'var(--color-muted)' }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* footer nav */}
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-14 py-12 md:py-20 flex justify-between items-center"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <a href="/works" style={{ ...monoStyle, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', textDecoration: 'none' }}>← Works</a>
        <a href="/#contact" style={{ ...monoStyle, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', textDecoration: 'none' }}>Contact →</a>
      </div>

      <Footer />
    </main>
  )
}
