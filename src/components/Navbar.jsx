import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useData } from '../context/DataContext';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Journey', id: 'journey' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const { data } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['home', 'about', 'journey', 'projects', 'skills', 'contact'];
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  const initials = data.personal.name.split(' ').map((n) => n[0]).join('');
  const overBlack = !scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white border-b border-gray-200 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2.5 group">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${overBlack ? 'bg-white group-hover:neon-box-white' : 'bg-black'}`}>
              <span className={`font-bold text-xs ${overBlack ? 'text-black' : 'text-white'}`}>{initials}</span>
            </div>
            <span className={`font-semibold text-sm hidden sm:block transition-colors ${overBlack ? 'text-white/80 group-hover:text-white' : 'text-black/70 group-hover:text-black'}`}>
              {data.personal.name.split(' ')[0]} Bhosale
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === id
                    ? overBlack ? 'text-white bg-white/10' : 'text-black bg-black/[0.07]'
                    : overBlack ? 'text-white/55 hover:text-white hover:bg-white/10' : 'text-black/55 hover:text-black hover:bg-black/[0.06]'
                }`}
              >
                {label}
              </button>
            ))}
            {/* Hire Me — neon glow on hover */}
            <a
              href={`mailto:${data.personal.email}`}
              className={`ml-3 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                overBlack
                  ? 'bg-white text-black neon-btn'
                  : 'bg-black text-white neon-btn-dark'
              }`}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${overBlack ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-black/60 hover:text-black hover:bg-black/[0.06]'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-0.5">
            {NAV_LINKS.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="block w-full text-left px-3 py-2.5 text-black/65 hover:text-black hover:bg-black/[0.05] rounded-lg text-sm font-medium transition-colors">
                {label}
              </button>
            ))}
            <a href={`mailto:${data.personal.email}`}
              className="block w-full text-center mt-2 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-semibold neon-btn-dark transition-all duration-300">
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
