import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  // Fallback default data matching Hi-Quality Silencers Google Business Profile
  const defaultData = {
    businessName: 'Hi-Quality Silencers',
    rating: 4.8,
    user_ratings_total: 45,
    googleReviewUrl: 'https://www.google.com/search?hl=en-IN&gl=in&q=Hi+Quality+Silencers,+Cross+Road,+behind+Ambika+Hotel,+Passport+Office,+East+Nadakkave,+Nadakkave,+Kozhikode,+Kerala+673006&ludocid=11199802823282393819&lsig=AB86z5Vtm5x1ryatQXnDIqYArUw9#lrd=0x3ba65ec90c5bbccd:0x9b6db154242a02db,3,,,,',
    reviews: [
      {
        author_name: 'Sahil Mo',
        profile_photo_url: '',
        rating: 5,
        relative_time_description: 'last month',
        text: 'fast service good service'
      },
      {
        author_name: 'Dnyaneshwar Pawar',
        profile_photo_url: '',
        rating: 5,
        relative_time_description: 'last month',
        text: 'Very good service'
      },
      {
        author_name: 'Pankaj Borole',
        profile_photo_url: '',
        rating: 4,
        relative_time_description: '2 months ago',
        text: 'Good quality silencer and quick response from staff.'
      },
      {
        author_name: 'JIBIN M',
        profile_photo_url: '',
        rating: 5,
        relative_time_description: 'a week ago',
        text: 'good product & Super quality'
      },
      {
        author_name: 'PRAVEEN C V',
        profile_photo_url: '',
        rating: 5,
        relative_time_description: '2 weeks ago',
        text: 'Excellent service and genuine quality products.'
      }
    ]
  };

  // 1. First try fetching dynamic admin-managed reviews from backend API
  try {
    const backendRes = await fetch(`${backendApiUrl}/api/reviews`, { cache: 'no-store' });
    if (backendRes.ok) {
      const dbData = await backendRes.json();
      if (dbData.success && Array.isArray(dbData.reviews) && dbData.reviews.length > 0) {
        const mappedReviews = dbData.reviews.map(r => ({
          author_name: r.customerName,
          profile_photo_url: r.customerImage || '',
          rating: r.rating || 5,
          relative_time_description: r.relativeTime || 'recently',
          text: r.reviewText,
          googleReviewLink: r.googleReviewLink || defaultData.googleReviewUrl
        }));

        // Calculate average rating
        const sumRating = mappedReviews.reduce((acc, curr) => acc + curr.rating, 0);
        const avgRating = (sumRating / mappedReviews.length).toFixed(1);

        return NextResponse.json({
          success: true,
          isBackend: true,
          data: {
            businessName: 'Hi-Quality Silencers',
            rating: Number(avgRating) || 4.8,
            user_ratings_total: mappedReviews.length >= 5 ? 45 : mappedReviews.length,
            googleReviewUrl: defaultData.googleReviewUrl,
            reviews: mappedReviews
          }
        });
      }
    }
  } catch (err) {
    console.log('[API google-reviews] Backend API unavailable, using default data.');
  }

  // 2. If Google Places API Key exists, try Google Places API
  if (apiKey && placeId) {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&key=${apiKey}`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
      const data = await res.json();

      if (data.status === 'OK' && data.result) {
        return NextResponse.json({
          success: true,
          isMock: false,
          data: {
            businessName: data.result.name || defaultData.businessName,
            rating: data.result.rating || defaultData.rating,
            user_ratings_total: data.result.user_ratings_total || defaultData.user_ratings_total,
            googleReviewUrl: data.result.url || defaultData.googleReviewUrl,
            reviews: data.result.reviews || defaultData.reviews
          }
        });
      }
    } catch (error) {
      console.error('Error fetching Google Places reviews:', error);
    }
  }

  // 3. Fallback to default high quality reviews dataset
  return NextResponse.json({ success: true, isMock: true, data: defaultData });
}
