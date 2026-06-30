import HeroSlider from '@/components/marketing/HeroSlider';
import CategoryStrip from '@/components/marketing/CategoryStrip';
import FeaturedProducts from '@/components/marketing/FeaturedProducts';
import AboutSection from '@/components/marketing/AboutSection';
import StatsBanner from '@/components/marketing/StatsBanner';
import Testimonials from '@/components/marketing/Testimonials';

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <CategoryStrip />
      <FeaturedProducts />
      <StatsBanner />
      <AboutSection />
      <Testimonials />
    </main>
  );
}
