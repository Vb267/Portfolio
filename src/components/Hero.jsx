import { Mail, ArrowDown, ExternalLink, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Hero() {
  const { data } = useData();
  const { personal } = data;

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Neon colour blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-neon-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none animate-neon-pulse" style={{ animationDelay: '1.2s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none animate-neon-pulse" style={{ animationDelay: '0.6s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 pb-16">

        {/* Eyebrow — neon border */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-white/60 text-xs tracking-widest uppercase mb-10 font-medium transition-all duration-300 neon-box-blue"
          style={{ borderColor: 'rgba(96,165,250,0.4)' }}
        >
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-neon-pulse" />
          Portfolio
        </div>

        {/* Name — subtle white neon glow */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-5 tracking-tight leading-[1.05] neon-white">
          {personal.name}
        </h1>

        {/* Title */}
        <p className="text-base sm:text-lg text-white/60 font-medium mb-3 tracking-wide">
          {personal.title}
        </p>

        {/* Location */}
        <div className="flex items-center justify-center gap-1.5 text-white/40 text-sm mb-10">
          <MapPin size={12} />
          <span>{personal.location}</span>
        </div>

        {/* Summary */}
        <p className="text-white/60 max-w-2xl mx-auto text-[15px] leading-relaxed mb-12">
          {personal.profileSummary.slice(0, 230)}&hellip;
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-2 px-6 py-3 border border-white/25 text-white/75 rounded-lg font-semibold text-sm hover:bg-white/10 hover:text-white hover:border-white/50 neon-btn transition-all duration-300"
          >
            <Mail size={15} />
            Get In Touch
          </button>
          {personal.linkedin && (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-white/25 text-white/75 rounded-lg font-semibold text-sm hover:bg-white/10 hover:text-white hover:border-white/50 neon-btn transition-all duration-300"
            >
              <ExternalLink size={15} />
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 hover:text-white/65 transition-colors"
      >
        <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
}
