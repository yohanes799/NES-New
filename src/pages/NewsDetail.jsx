import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import PopularNews from '../components/PopularNews';
import NewsCard from '../components/NewsCard';
import './NewsDetail.css';

const NewsDetail = () => {
  const { id: slug } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/kumparan-news/');
        if (response.data && response.data.data) {
          setData(response.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return <div className="loading-state">Memuat...</div>;

  // Find the current news based on slug (matching last part of link)
  // If not found, fallback to first item for demo purposes
  const currentNews = data.find(item => item.link.endsWith(slug)) || data[0];
  const relatedNews = data.filter(item => item !== currentNews).slice(0, 4);
  const popularNewsList = data.slice(5, 10);

  if (!currentNews) return <div className="empty-state">Berita tidak ditemukan.</div>;

  let dateStr = "";
  try {
    if (currentNews.isoDate) {
      dateStr = format(parseISO(currentNews.isoDate), 'dd MMM yyyy', { locale: id });
    }
  } catch (error) {}

  const category = currentNews.categories && currentNews.categories.length > 0 ? currentNews.categories[0] : 'Nasional';
  const imageUrl = currentNews.image?.extraLarge || currentNews.image?.large || 'https://via.placeholder.com/800x500';

  // Mocking paragraphs since API only gives short description
  const mockParagraphs = [
    currentNews.description,
    "Jakarta, CNN Indonesia - Ketua Badan Tim Nasional (BTN) PSSI Sumardji merespons peluang Timnas Indonesia pindah dari Stadion Utama Gelora Bung Karno (GBK) apabila lolos ke putaran ketiga Kualifikasi Piala Dunia 2026. Akhir-akhir ini rumput lapangan Stadion GBK yang jadi markas Indonesia dalam babak kedua Kualifikasi Piala Dunia 2026 kerap bermasalah.",
    "Acara-acara di luar sepak bola itu kerap membuat kondisi rumput tidak sehat dan tidak terlihat bagus saat pertandingan, khususnya laga Timnas Indonesia. Sampai saat melawan Irak, rumput GBK tidak terlihat sempurna meskipun kondisinya lebih bagus dibanding lawan Vietnam. Opsi pindah kandang pun muncul.",
    "\"Nanti kami akan sampaikan [rencana pindah dari GBK],\" ujar Sumardji saat ditanya kemungkinan menggunakan stadion lain di putaran ketiga kualifikasi kemarin."
  ];

  return (
    <div className="container news-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">⌂ Beranda</Link> <span className="separator">{`>`}</span>
        <Link to={`/${category.toLowerCase()}`}>{category}</Link> <span className="separator">{`>`}</span>
        <span className="current">Detail</span>
      </div>

      <div className="detail-layout">
        <div className="detail-main">
          <h1 className="detail-title">{currentNews.title}</h1>
          <div className="detail-meta">
            <span className="category">{category}</span>
            <span className="separator">•</span>
            <span className="date">{dateStr}</span>
          </div>

          <div className="detail-image-wrapper">
            <img src={imageUrl} alt={currentNews.title} className="detail-image" />
            <p className="image-caption">Ilustrasi {currentNews.title}. (Foto: Kumparan News)</p>
          </div>

          <div className="detail-content">
            {mockParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Comments Section */}
          <div className="comments-section">
             <h3 className="section-title">Komentar</h3>
             
             <div className="comment-form">
                <div className="user-avatar">
                   <img src="https://i.pravatar.cc/150?img=11" alt="User" />
                </div>
                <div className="form-group">
                   <textarea placeholder="Apa yang ingin anda tanyakan?" rows="3"></textarea>
                   <div className="form-footer">
                      <span className="char-count">0/100</span>
                      <button className="btn btn-primary">Kirim</button>
                   </div>
                </div>
             </div>

             <div className="comments-list">
                {/* Mock Comment 1 */}
                <div className="comment-item">
                   <img src="https://i.pravatar.cc/150?img=12" alt="User" className="user-avatar" />
                   <div className="comment-body">
                      <div className="comment-header">
                         <span className="user-name">Ujang Purnwadi, M.Agr.</span>
                         <span className="comment-date">• 28 Mar 2024 11:15</span>
                      </div>
                      <p className="comment-text">Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh ? Karena saya mau download ada konfirmasi bahwa TOTF aktivasi salah. Bagaimana ya solusinya ?</p>
                      <button className="reply-btn">Balas</button>

                      {/* Reply */}
                      <div className="comment-reply">
                         <img src="https://i.pravatar.cc/150?img=5" alt="User" className="user-avatar" />
                         <div className="comment-body">
                            <div className="comment-header">
                               <span className="user-name">Dina Nisa Kurniati, S.Pd</span>
                               <span className="comment-date">• 28 Mar 2024 11:18</span>
                            </div>
                            <p className="comment-text">Saya mengunduh sertifikatnya kok juga terkendala</p>
                            <button className="reply-btn">Balas</button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Related News */}
          <div className="related-section">
             <div className="section-header">
                <h3 className="section-title">Berita Terkait</h3>
                <button className="btn btn-secondary-outline">Lihat Semua</button>
             </div>
             <div className="related-grid">
               {relatedNews.map((item, idx) => (
                 <NewsCard key={idx} news={item} isHeadline={false} />
               ))}
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="detail-sidebar">
          <PopularNews newsList={popularNewsList} />
        </aside>
      </div>
    </div>
  );
};

export default NewsDetail;
