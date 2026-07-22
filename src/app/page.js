import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import FeaturedCategories from '@/components/FeaturedCategories';
import ProductGrid from '@/components/ProductGrid';
import FaqSection from '@/components/FaqSection';
import BlogPosts from '@/components/BlogPosts';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <HeroBanner />
        <FeaturedCategories />
        <ProductGrid />
        <FaqSection />
        <BlogPosts />
      </main>
      <Footer />
    </div>
  );
}
