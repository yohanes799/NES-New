import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NewsDetail from './pages/NewsDetail'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
