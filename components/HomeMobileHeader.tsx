'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AvatarImage } from '@/components/AvatarImage'
import { BioText } from '@/components/bio/BioText'

interface HomeMobileHeaderProps {
  bio: any
}

export function HomeMobileHeader({ bio }: HomeMobileHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const bioText = bio?.bioText ?? []
  const capabilities = bio?.capabilities ?? []
  const hasBioContent = bioText.length > 0 || capabilities.length > 0

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? ''
  const behance = process.env.NEXT_PUBLIC_BEHANCE_URL ?? ''
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? ''

  const copyEmail = () => {
    if (!email) return
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="md:hidden">
      {/* Wrapper fixo no topo que contém o Header e o Menu para funcionarem em conjunto */}
      <div className="sticky top-0 z-40 relative">
        {/* Header Mobile */}
        <header className="bg-bg/85 backdrop-blur-md border-b border-border"> 
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <AvatarImage src={bio?.avatarUrl} name={process.env.NEXT_PUBLIC_SITE_NAME ?? ''} size={36} />
              <div>
                <p className="text-sm font-medium">{process.env.NEXT_PUBLIC_SITE_NAME}</p>
                <p className="text-[10px] text-muted">{process.env.NEXT_PUBLIC_SITE_ROLE}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/contact" className="border border-border rounded-full px-3 py-1.5 text-xs hover:bg-white/5 transition-colors">
                Let's talk
              </Link>
              
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="border border-border rounded-full px-3 py-1.5 text-xs hover:bg-white/5 transition-colors flex items-center gap-1"
              >
                <span>Menu</span>
                <span className="text-[10px]">{isMobileMenuOpen ? '✕' : '↓'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Menu Dropdown posicionado como irmão do Header */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 z-50 bg-bg/85 backdrop-blur-md border-b border-border shadow-lg px-4 py-2 flex flex-col text-xs text-muted">
            <Link 
              href="/bio" 
              className="py-2.5 border-b border-border/50 flex items-center justify-between hover:text-fg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Info</span>
              <span className="text-accent/40">+</span>
            </Link>

            {email && (
              <button 
                onClick={copyEmail}
                className="py-2.5 border-b border-border/50 flex items-center justify-between hover:text-fg text-left w-full"
              >
                <span>{copied ? 'Copied!' : email}</span>
                {!copied && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-40 flex-shrink-0 ml-2">
                    <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                    <path d="M8 4V2a1 1 0 00-1-1H2a1 1 0 00-1 1v5a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.1"/>
                  </svg>
                )}
              </button>
            )}

            <a 
              href="https://bit.ly/port-emanuelbg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="py-2.5 border-b border-border/50 flex items-center justify-between hover:text-fg"
            >
              <span>Other Projects</span>
              <span className="text-accent/40 text-[10px]">↗</span>
            </a>

            {linkedin && (
              <a 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="py-2.5 border-b border-border/50 flex items-center justify-between hover:text-fg"
              >
                <span>LinkedIn</span>
                <span className="text-accent/40 text-[10px]">↗</span>
              </a>
            )}

            {behance && (
              <a 
                href={behance} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="py-2.5 border-b border-border/50 flex items-center justify-between hover:text-fg"
              >
                <span>Behance</span>
                <span className="text-accent/40 text-[10px]">↗</span>
              </a>
            )}

            {instagram && (
              <a 
                href={instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="py-2.5 flex items-center justify-between hover:text-fg"
              >
                <span>Instagram</span>
                <span className="text-accent/40 text-[10px]">↗</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Bio visível apenas no mobile (acima dos projetos) */}
      {hasBioContent && (
        <section className="p-5 border-b border-border flex flex-col gap-1 bg-bg">
          {bioText.length > 0 && <BioText paragraphs={bioText} />}
        </section>
      )}
    </div>
  )
}