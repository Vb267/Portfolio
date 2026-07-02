import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, TrendingUp, Search, Lightbulb, Users, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TRAITS = [
  { label: 'Data-Driven', Icon: TrendingUp },
  { label: 'Detail-Oriented', Icon: Search },
  { label: 'Problem Solver', Icon: Lightbulb },
  { label: 'Team Player', Icon: Users },
];

export default function About() {
  const { data } = useData();
  const { personal } = data;
  const { ref, visible } = useScrollAnimation();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const initials = personal.name.split(' ').map((n) => n[0]).join('');

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => e.key === 'Escape' && setLightboxOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-3">Who I Am</p>
          <h2 className="text-4xl font-extrabold text-black">About Me</h2>
          <div className="w-10 h-px bg-black mx-auto mt-5" />
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-5 gap-12 items-start transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left: avatar + contact */}
          <div className="md:col-span-2 flex flex-col items-center">
            {personal.photo ? (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="group relative w-44 h-44 rounded-2xl overflow-hidden border border-gray-200 hover-neon-blue transition-all duration-300 cursor-zoom-in"
                aria-label="Enlarge profile photo"
              >
                <img
                  src={personal.photo}
                  alt={personal.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ) : (
              <div className="w-44 h-44 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                <span className="text-5xl font-extrabold text-gray-300">{initials}</span>
              </div>
            )}

            <div className="mt-8 w-full space-y-1 max-w-xs">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-all group"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={13} className="text-gray-500" />
                </div>
                <span className="text-gray-500 text-sm truncate group-hover:text-black transition-colors">{personal.email}</span>
              </a>
              <div className="flex items-center gap-3 p-2.5">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={13} className="text-gray-500" />
                </div>
                <span className="text-gray-500 text-sm">{personal.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-2.5">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={13} className="text-gray-500" />
                </div>
                <span className="text-gray-500 text-sm">{personal.location}</span>
              </div>
              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-all group"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Linkedin size={13} className="text-gray-500" />
                  </div>
                  <span className="text-gray-500 text-sm group-hover:text-black transition-colors">LinkedIn Profile</span>
                </a>
              )}
            </div>
          </div>

          {/* Right: content */}
          <div className="md:col-span-3">
            <h3 className="text-2xl font-bold text-black mb-5 leading-snug">
              Analytical Postgraduate &amp; Fintech Enthusiast
            </h3>
            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
              {personal.profileSummary}
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {TRAITS.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-black hover:shadow-sm transition-all"
                >
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-gray-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && personal.photo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6 animate-fade-up"
          style={{ animationDuration: '0.2s' }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <img
            src={personal.photo}
            alt={personal.name}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full rounded-2xl object-contain neon-box-white"
          />
        </div>
      )}
    </section>
  );
}
