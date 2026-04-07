import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaInstagram, FaFacebook, FaPaperPlane } from 'react-icons/fa';
import { SiBabel } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Kolom 1: Info Kiri */}
        <div className="footer-col footer-info">
          <Link to="/" className="footer-logo">
            <SiBabel className="footer-logo-icon" />
            <span className="footer-logo-text">Berita Kini</span>
          </Link>
          <p className="copyright">© 2023 Berita Kini. All Rights Reserved.</p>
          
          <div className="social-section">
            <h4>Ikuti Kami</h4>
            <div className="social-icons">
              <a href="#"><FaYoutube /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaFacebook /></a>
            </div>
          </div>
        </div>

        {/* Kolom 2: Telusuri */}
        <div className="footer-col footer-links">
          <h4>Telusuri</h4>
          <ul>
            <li><Link to="/">Beranda</Link></li>
            <li><Link to="/kesehatan">Kesehatan</Link></li>
            <li><Link to="/otomotif">Otomotif</Link></li>
            <li><Link to="/politik">Politik</Link></li>
            <li><Link to="/olahraga">Olahraga</Link></li>
            <li><Link to="/nasional">Nasional</Link></li>
            <li><Link to="/internasional">Internasional</Link></li>
          </ul>
        </div>

        {/* Kolom 3: Bantuan */}
        <div className="footer-col footer-links">
          <h4>Bantuan</h4>
          <ul>
            <li><a href="#">Kontak Kami</a></li>
            <li><a href="#">Laporan Pembajakan</a></li>
            <li><a href="#">Kebijakan</a></li>
          </ul>
        </div>

        {/* Kolom 4: Subscribe */}
        <div className="footer-col footer-subscribe">
          <h4>Berlangganan Berita Terbaru</h4>
          <div className="subscribe-form">
            <input type="email" placeholder="Masukan email" />
            <button type="button" className="btn-subscribe">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
