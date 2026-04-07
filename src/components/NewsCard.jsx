import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import './NewsCard.css';

const NewsCard = ({ news, isHeadline = false }) => {
  // Parsing date or using default if invalid
  let dateStr = "Tanggal tidak tersedia";
  try {
    if (news.isoDate) {
      dateStr = format(parseISO(news.isoDate), 'dd MMM yyyy', { locale: id });
    }
  } catch (error) {
    console.error("Invalid date", news.isoDate);
  }

  // Find image URL safely
  const imageUrl = news.image?.large || news.image?.medium || news.image?.small || 'https://via.placeholder.com/400x250?text=No+Image';

  // We extract a slug from the link for internal routing.
  // Example link: https://kumparan.com/kumparannews/slug-279iWzlSKq1
  const pathParts = news.link ? news.link.split('/') : [];
  const slug = pathParts.length > 0 ? pathParts[pathParts.length - 1] : Math.random().toString(36).substr(2, 9);
  const detailUrl = `/news/${slug}`;

  // Use the first category if available
  const category = news.categories && news.categories.length > 0 ? news.categories[0] : 'Nasional';

  if (isHeadline) {
    return (
      <div className="headline-card">
        <div className="headline-content">
          <span className="category-badge">Headline</span>
          <h1 className="headline-title">
            <Link to={detailUrl}>{news.title}</Link>
          </h1>
          <p className="headline-desc">{news.description?.substring(0, 150)}...</p>
          <div className="meta-info">
            <span className="date">📅 {dateStr}</span>
          </div>
          <Link to={detailUrl} className="read-more">Baca Selengkapnya ↗</Link>
        </div>
        <div className="headline-image-container">
          <img src={imageUrl} alt={news.title} className="headline-image" />
        </div>
      </div>
    );
  }

  return (
    <div className="news-card">
      <div className="card-image">
        <img src={imageUrl} alt={news.title} loading="lazy" />
      </div>
      <div className="card-body">
        <h3 className="card-title">
          <Link to={detailUrl}>{news.title}</Link>
        </h3>
        <div className="card-meta">
          <span className="category">{category}</span>
          <span className="separator">•</span>
          <span className="date">{dateStr}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
