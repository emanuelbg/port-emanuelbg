'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Clock } from './Clock'
import { AvatarImage } from './AvatarImage'
// 1. Adicionamos os imports dos componentes
import { BioText } from '@/components/bio/BioText'
import { Capabilities } from '@/components/bio/Capabilities'

// 2. Adicionamos bioText e capabilities na tipagem das props
interface SidebarProps {
  avatarUrl?: string | null
  bioText?: any[]
  capabilities?: any[]
}

export function Sidebar({ avatarUrl, bioText = [], capabilities = [] }: SidebarProps) {
  const [copied, setCopied] = useState(false)

  const name     = process.env.NEXT_PUBLIC_SITE_NAME  ?? ''
  const role     = process.env.NEXT_PUBLIC_SITE_ROLE  ?? ''
  const city     = process.env.NEXT_PUBLIC_SITE_CITY  ?? ''
  const email    = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? ''
  const behance  = process.env.NEXT_PUBLIC_BEHANCE_URL  ?? ''
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? ''
  const twitter  = process.env.NEXT_PUBLIC_TWITTER_URL ?? ''
  const year     = new Date().getFullYear()
  const cityCode = city.slice(0, 2).toUpperCase()

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-70 bg-bg border-r border-border flex-col z-40 overflow-y-auto scrollbar:none]">

      {/* Identidade */}
      <div className="p-5 pb-4">
        <AvatarImage src={avatarUrl} name={name} size={64} />
        <p className="text-sm font-medium text-fg leading-tight mt-3">{name}</p>
        <p className="text-xs text-muted mt-0.5">{role ? `${role}, ` : ''}</p>
        <p className="text-xs text-muted">{city ? `based in ${city}` : ''}</p>

        {/* Open to work fixo */}
        <div className="flex items-center gap-1.5 mt-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
          </span>
          <span className="text-[10px] text-muted">
            Open to work
          </span>
        </div>
      </div>

      {/* 3. Renderizamos a Bio e as Capabilities aqui (com um pequeno espaçamento) */}
      {(bioText.length > 0 || capabilities.length > 0) && (
        <div className="px-5 pb-5 flex flex-col gap-1">
          {bioText.length > 0 && <BioText paragraphs={bioText} />}
          {capabilities.length > 0 && <Capabilities items={capabilities} />}
        </div>
      )}

      {/* Info + Email */}
      <div className="border-t border-border">
        <Link
          href="/bio"
          className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-blue-800 transition-colors"
        >
          <span>Info</span>
          <span className="text-accent/40">+</span>
        </Link>
        <div className="border-t border-border">
          <button
            onClick={copyEmail}
            className="w-full flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-blue-800 transition-colors"
          >
            <span>{copied ? 'Copied!' : email}</span>
            {!copied && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-40 flex-shrink-0 ml-2">
                <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M8 4V2a1 1 0 00-1-1H2a1 1 0 00-1 1v5a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Redes sociais */}
      <div className="border-t border-border">
          <a href="https://bit.ly/port-emanuelbg" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-blue-800 transition-colors">
            <span>Other Projects</span><span className="text-accent/40 text-[10px]">↗</span>
          </a>
        {linkedin && (
          <div className="border-t border-border">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-blue-800 transition-colors">
              <span>LinkedIn</span><span className="text-accent/40 text-[10px]">↗</span>
            </a>
          </div>
        )}
        {behance && (
          <div className="border-t border-border">
            <a href={behance} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-blue-800 transition-colors">
              <span>Behance</span><span className="text-accent/40 text-[10px]">↗</span>
            </a>
          </div>
        )}
        {instagram && (
          <div className="border-t border-border">
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-blue-800 transition-colors">
              <span>Instagram</span><span className="text-accent/40 text-[10px]">↗</span>
            </a>
          </div>
        )}
        {/*}
        {twitter && (
          <div className="border-t border-border">
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-blue-800 transition-colors">
              <span>Twitter</span><span className="text-accent/40 text-[10px]">↗</span>
            </a>
          </div>
        )}
        */}
      </div>
          
      {/* Espaçador */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="border-t border-border px-5 py-4 flex items-center justify-between mt-auto">
        <span className="text-[10px] text-muted/50">© {year}</span>
        <div className="flex items-center gap-2 text-[10px] text-muted/50 font-mono uppercase tracking-wider">
          {cityCode && <span>{cityCode}</span>}
          <Clock />
        </div>
      </div>
    </aside>
  )
}