import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import PopularNews from '../components/PopularNews';
import './Home.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/kumparan-news/');
        // Assumes API returns { data: [...] }
        if (response.data && response.data.data) {
          setData(response.data.data);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error(err);
        setError('Gagal memuat berita. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-state">Memuat berita terkini...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="empty-state">Tidak ada berita saat ini.</div>;
  }

  // Split data
  const headlineNews = data[0];
  const popularNewsList = data.slice(1, 4); // Take next 3 for popular
  const recommendedNews = data.slice(4, 12); // Rest for grid

  return (
    <div className="home-page container">
      {/* Top Section: Headline & Popular */}
      <div className="home-top-section">
        {headlineNews && (
          <div className="main-headline">
            <NewsCard news={headlineNews} isHeadline={true} />
          </div>
        )}
      </div>

      {/* Adding Popular News below headline or next to it based on screen size, wait the design shows Headline is full width (mostly). Then Popular News is below it or part of top. Actually the first image shows: Menu -> Headline (full width or side-by-side) -> popular news in a row or list. Wait, in 1st image, Popular News is a horizontal flex container! Popular 1, Popular 2, Popular 3 in a row. Wait! The first image shows: "Berita Terpopuler" as a section with 3 horizontal items. Recommendation is a grid below it. */}

      <div className="horizontal-popular-section">
         <h3 className="section-title">Berita Terpopuler</h3>
         <div className="horizontal-list">
            {popularNewsList.map((item, index) => (
              <div className="horizontal-popular-item" key={index}>
                 <div className="popular-rank-circle">{index + 1}</div>
                 <NewsCard news={item} isHeadline={false} />
              </div>
            ))}
         </div>
      </div>

      {/* Recommendation Section */}
      <div className="recommendation-section">
        <div className="section-header">
          <h3 className="section-title">Rekomendasi Untuk Anda</h3>
          <div className="search-bar">
            <input type="text" placeholder="Cari disini..." />
            <span className="search-icon">🔍</span>
          </div>
        </div>
        
        <div className="news-grid">
          {recommendedNews.map((item, index) => (
            <NewsCard key={index} news={item} isHeadline={false} />
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="pagination">
           <span className="page-info">Showing 1 to 8 of {data.length} results</span>
           <div className="page-controls">
              <button className="page-btn disabled">« Previous</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">...</button>
              <button className="page-btn">Next »</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
