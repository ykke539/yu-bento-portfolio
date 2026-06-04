import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import WorksPreview from '@/components/WorksPreview'
import Process from '@/components/Process'
import AboutSection from '@/components/AboutSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getAboutContent } from '@/lib/notion-about'

export default async function Home() {
  const { process } = await getAboutContent()
  return (
    <main>
      <Hero />
      <Philosophy />
      <WorksPreview />
      <Process steps={process} />
      <AboutSection />
      <Contact />
      <Footer />
    </main>
  )
}
