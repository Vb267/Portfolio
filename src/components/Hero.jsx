import { Download, Mail, MapPin, ArrowDown, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';

const STATS = [
  { value: '2+', label: 'Companies' },
  { value: '10M+', label: 'Records Analysed' },
  { value: '30%', label: 'Avg Efficiency Gain' },
  { value: 'Jun 2026', label: 'Available From' },
];

export default function Hero() {
  const { data } = useData();
  const { personal } = data;

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b3e] via-[#1a2e5a] to-[#1e3a8a]" />

      {/* Subtle geometric rings */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] border-2 border-white rounded-full" />
        <div className="absolute -top-16 -left-16 w-[400px] h-[400px] border border-white rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] border-2 border-white rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] border border-white rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20 pb-16">

        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {personal.availability}
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          {personal.name}
        </h1>

        {/* Title */}
        <p className="text-xl sm:text-2xl text-blue-300 font-semibold mb-4">
          {personal.title}
        </p>

        {/* Location */}
        <div className="flex items-center justify-center gap-1.5 text-white/50 text-sm mb-8">
          <MapPin size={13} />
          <span>{personal.location}</span>
        </div>

        {/* Summary excerpt */}
        <p className="text-white/65 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-10">
          {personal.profileSummary.slice(0, 220)}&hellip;
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {personal.cvUrl ? (
            <a
              href={personal.cvUrl}
              download
              className="flex items-center gap-2 px-7 py-3.5 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg text-sm"
            >
              <Download size={17} />
              Download CV
            </a>
          ) : (
            <button
              className="flex items-center gap-2 px-7 py-3.5 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg text-sm opacity-70 cursor-default"
              title="Upload your CV URL via the admin panel"
            >
              <Download size={17} />
              Download CV
            </button>
          )}
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all text-sm"
          >
            <Mail size={17} />
            Get In Touch
          </a>
          {personal.linkedin && (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all text-sm"
            >
              <ExternalLink size={17} />
              LinkedIn
            </a>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 hover:bg-white/15 transition-colors"
            >
              <div className="text-2xl font-extrabold text-white">{stat.value}</div>
              <div className="text-white/50 text-xs mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
      >
        <span className="text-xs font-medium">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
}
