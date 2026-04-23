import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import WorksPreview from '@/components/WorksPreview'
import Process from '@/components/Process'
import AboutSection from '@/components/AboutSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <WorksPreview />
      <Process />
      <AboutSection />
      <Contact />
      <Footer />
    </main>
  )
}
