import { getProjects, getBio } from "@/lib/notion"
import { Sidebar } from "@/components/Sidebar"
import { ProjectGrid } from "@/components/ProjectGrid"
import { LayoutToggle } from "@/components/LayoutToggle"
import { HomeMobileHeader } from "@/components/HomeMobileHeader" // Vamos separar a interatividade mobile
import { AvatarImage } from "@/components/AvatarImage"
// 1. Importar os componentes da Bio
import { BioText } from "@/components/bio/BioText"
import { Capabilities } from "@/components/bio/Capabilities"
import Link from "next/link"

export const revalidate = 60

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  description: `Portfólio de ${process.env.NEXT_PUBLIC_SITE_NAME}`,
}

export default async function HomePage() {
  const [projects, bio] = await Promise.all([getProjects(), getBio()])

  const bioText = bio?.bioText ?? []
  const capabilities = bio?.capabilities ?? []
  const hasBioContent = bioText.length > 0 || capabilities.length > 0

  return (
    <div className="flex min-h-screen">
      {/* Sidebar continua oculta no mobile e visível apenas no desktop */}
      <Sidebar 
        avatarUrl={bio?.avatarUrl} 
        bioText={bioText}
        capabilities={capabilities}
      />

      <main className="md:ml-70 flex-1 min-w-0">
        {/* Header e Bio Mobile com estado de Toggle */}
        <HomeMobileHeader bio={bio} />

        {/* Barra de toggle desktop */}
        <div className="hidden md:flex sticky top-0 z-30 justify-end px-3 py-2 bg-bg/80 backdrop-blur-sm border-b border-border">
          <LayoutToggle />
        </div>

        {/* Grid de Projetos seguros contra undefined */}
        <ProjectGrid projects={projects} />
      </main>
    </div>
  )
}