import { SiX, SiInstagram, SiThreads, SiGithub, SiNote } from 'react-icons/si'
import type { IconType } from 'react-icons'

const MAP: { keywords: string[]; Icon: IconType }[] = [
  { keywords: ['x', 'twitter'],   Icon: SiX },
  { keywords: ['instagram'],       Icon: SiInstagram },
  { keywords: ['threads'],         Icon: SiThreads },
  { keywords: ['github'],          Icon: SiGithub },
  { keywords: ['note'],            Icon: SiNote },
]

export function SnsIcon({ name, size = 14 }: { name: string; size?: number }) {
  const n = name.toLowerCase()
  const match = MAP.find(m => m.keywords.some(k => n.includes(k)))
  if (!match) return null
  const { Icon } = match
  return <Icon size={size} />
}
