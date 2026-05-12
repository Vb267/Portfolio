import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useData } from '../context/DataContext';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
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
      const sections = ['home', 'about', 'experience', 'education', 'skills', 'achievements', 'interests', 'contact'];
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

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const initials = data.personal.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
              <span className="text-white font-bold text-sm">{initials}</span>
            </div>
            <span
              className={`font-semibold text-sm hidden sm:block transition-colors ${
                scrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              {data.personal.name.split(' ')[0]} Bhosale
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === id
                    ? scrolled
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-white bg-white/15'
                    : scrolled
                    ? 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
            <a
              href={`mailto:${data.personal.email}`}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full text-left px-3 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors"
              >
                {label}
              </button>
            ))}
            <a
              href={`mailto:${data.personal.email}`}
              className="block w-full text-center mt-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
