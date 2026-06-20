import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import WorksPreview from '@/components/WorksPreview'
import Process from '@/components/Process'
import AboutSection from '@/components/AboutSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getAboutContent } from '@/lib/notion-about'

export default async function Home() {
  const { process, aboutStats, profile } = await getAboutContent()
  const introTopItem = profile.find(p => p.title === 'intro')
  return (
    <main>
      <Hero />
      <AboutSection rows={aboutStats} introRich={introTopItem?.bodyRich} />
      <WorksPreview />
      <Philosophy />
      <Process steps={process} />
      <Contact />
      <Footer />
    </main>
  )
}
