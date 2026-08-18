import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import AboutSection from '@/components/AboutSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import FeaturedCategories from '@/components/FeaturedCategories';
import ProductGrid from '@/components/ProductGrid';
import FaqSection from '@/components/FaqSection';
import BlogPosts from '@/components/BlogPosts';
import GoogleReviews from '@/components/GoogleReviews';
import Footer from '@/components/Footer';
import DataPrefetcher from '@/components/DataPrefetcher';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DataPrefetcher />
      <Header />
      <main style={{ flex: 1, paddingTop: '94px' }}>
        <HeroBanner />
        <AboutSection />
        <FeaturedCategories />
        <ProductGrid />
        <WhyChooseSection />
        <BlogPosts />
        <FaqSection />
        <GoogleReviews />
      </main>
      <Footer />
    </div>
  );
}
