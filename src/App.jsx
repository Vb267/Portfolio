import { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Interests from './components/Interests';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';

function Portfolio() {
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Journey />
        <TechStack />
        <Projects />
        <Skills />
        <Achievements />
        <Interests />
        <Contact />
      </main>
      <footer className="bg-black py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Vrushank Bhosale &middot; Built with React &amp; Tailwind CSS
          </p>
          <button
            onClick={() => setAdminOpen(true)}
            className="mt-3 text-white/10 text-xs hover:text-white/30 transition-colors"
            title="Admin panel (Ctrl+Shift+A)"
          >
            &bull; &bull; &bull;
          </button>
        </div>
      </footer>
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </>
  );
}

export default function App() {
  return (
    <DataProvider>
      <Portfolio />
    </DataProvider>
  );
}
