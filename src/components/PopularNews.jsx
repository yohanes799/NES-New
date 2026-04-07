import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import './PopularNews.css';

const PopularNewsItem = ({ news, index }) => {
  let dateStr = "";
  try {
    if (news.isoDate) {
      dateStr = format(parseISO(news.isoDate), 'dd MMM yyyy', { locale: id });
    }
  } catch (error) {}

  const imageUrl = news.image?.small || news.image?.medium || 'https://via.placeholder.com/150';
  const pathParts = news.link ? news.link.split('/') : [];
  const slug = pathParts.length > 0 ? pathParts[pathParts.length - 1] : Math.random().toString(36).substr(2, 9);
  const detailUrl = `/news/${slug}`;
  const category = news.categories && news.categories.length > 0 ? news.categories[0] : 'Nasional';

  return (
    <div className="popular-news-item">
      <div className="popular-image-wrapper">
        <span className="popular-rank">{index + 1}</span>
        <img src={imageUrl} alt={news.title} loading="lazy" />
      </div>
      <div className="popular-content">
        <h4 className="popular-title">
          <Link to={detailUrl}>{news.title}</Link>
        </h4>
        <div className="popular-meta">
          <span className="category">{category}</span>
          <span className="separator">•</span>
          <span className="date">{dateStr}</span>
        </div>
      </div>
    </div>
  );
};

const PopularNews = ({ title = "Berita Terpopuler", newsList }) => {
  if (!newsList || newsList.length === 0) return null;

  return (
    <div className="popular-sidebar">
      <h3 className="section-title">{title}</h3>
      <div className="popular-list">
        {newsList.slice(0, 3).map((item, index) => (
          <PopularNewsItem key={index} news={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default PopularNews;
