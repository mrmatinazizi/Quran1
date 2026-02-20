/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Quran from './pages/Quran';
import SurahDetail from './pages/SurahDetail';
import Hadith from './pages/Hadith';
import Dhikr from './pages/Dhikr';
import About from './pages/About';
import Learn from './pages/Learn';
import LessonDetail from './pages/LessonDetail';
import Khatm from './pages/Khatm';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/quran/:id" element={<SurahDetail />} />
          <Route path="/hadith" element={<Hadith />} />
          <Route path="/dhikr" element={<Dhikr />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:id" element={<LessonDetail />} />
          <Route path="/khatm" element={<Khatm />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
