import { Award, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function AchievementCard({ item, index }) {
  const { ref, visible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-6 border border-gray-200 hover-neon-amber transition-all duration-300 flex items-start gap-4 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <Award className="text-amber-500" size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-black text-base leading-tight">{item.title}</h3>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black flex-shrink-0 transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
        <p className="text-amber-600 text-xs font-semibold mt-0.5">{item.year}</p>
        <p className="text-gray-600 text-sm mt-2 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

export default function Achievements() {
  const { data } = useData();

  if (!data.achievements?.length) return null;

  return (
    <section id="achievements" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-3">Recognition</p>
          <h2 className="text-4xl font-extrabold text-black">Achievements</h2>
          <div className="w-10 h-px bg-black mx-auto mt-5" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {data.achievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
