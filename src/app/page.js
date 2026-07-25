import TopTicker from '@/components/TopTicker';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import AboutSection from '@/components/AboutSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import FeaturedCategories from '@/components/FeaturedCategories';
import ProductGrid from '@/components/ProductGrid';
import FaqSection from '@/components/FaqSection';
import BlogPosts from '@/components/BlogPosts';
import Footer from '@/components/Footer';

import headerStyles from '@/components/Header.module.css';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className={headerStyles.headerWrapper}>
        <TopTicker />
        <Header />
      </header>
      <main style={{ flex: 1, paddingTop: '96px' }}>
        <HeroBanner />
        <AboutSection />
        <WhyChooseSection />
        <FeaturedCategories />
        <ProductGrid />
        <BlogPosts />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
