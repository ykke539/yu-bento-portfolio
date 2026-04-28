'use client'

import { useState } from 'react'

interface Props {
  images: string[]
  alt: string
}

export default function ImageGallery({ images, alt }: Props) {
  const [selected, setSelected] = useState(0)
  const [fading, setFading] = useState(false)

  if (images.length === 0) return null

  const switchTo = (i: number) => {
    if (i === selected) return
    setFading(true)
    setTimeout(() => {
      setSelected(i)
      setFading(false)
    }, 180)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* メイン画像 */}
      <div
        className="relative overflow-hidden w-full"
        style={{ aspectRatio: '3 / 4', background: 'var(--color-border)' }}
      >
        <img
          src={images[selected]}
          alt={`${alt} — ${selected + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[180ms]"
          style={{ opacity: fading ? 0 : 1 }}
        />
      </div>

      {/* サムネイル（2枚以上の場合のみ） */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              className="relative overflow-hidden flex-shrink-0 transition-opacity duration-200"
              style={{
                width: '64px',
                height: '48px',
                opacity: i === selected ? 1 : 0.35,
                outline: i === selected ? '1.5px solid var(--color-ink)' : '1px solid var(--color-border)',
                outlineOffset: '1px',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              <img
                src={src}
                alt={`${alt} — thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
