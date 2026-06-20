import { SiNextdotjs, SiTypescript, SiFigma, SiWordpress, SiTailwindcss, SiSupabase, SiVercel, SiStripe, SiLine } from 'react-icons/si'
import type { IconType } from 'react-icons'

const MAP: { keywords: string[]; Icon: IconType }[] = [
  { keywords: ['next.js', 'nextjs'], Icon: SiNextdotjs },
  { keywords: ['typescript'],        Icon: SiTypescript },
  { keywords: ['figma'],             Icon: SiFigma },
  { keywords: ['wordpress'],         Icon: SiWordpress },
  { keywords: ['tailwind'],          Icon: SiTailwindcss },
  { keywords: ['supabase'],          Icon: SiSupabase },
  { keywords: ['vercel'],            Icon: SiVercel },
  { keywords: ['stripe'],            Icon: SiStripe },
  { keywords: ['line'],              Icon: SiLine },
]

export function SkillIcon({ name, size = 12 }: { name: string; size?: number }) {
  const n = name.toLowerCase()
  const match = MAP.find(m => m.keywords.some(k => n.includes(k)))
  if (!match) return null
  const { Icon } = match
  return <Icon size={size} />
}
