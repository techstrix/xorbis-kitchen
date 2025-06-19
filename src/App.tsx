import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { HomePage } from '@/pages/HomePage';
import { PostDetail } from '@/components/PostDetail';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="xbori-kitchen-theme">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:slug" element={<PostDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;