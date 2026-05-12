import { Award, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function AchievementCard({ item, index }) {
  const { ref, visible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all duration-700 flex items-start gap-4 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <Award className="text-amber-500" size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 text-base leading-tight">{item.title}</h3>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 flex-shrink-0"
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
    <section id="achievements" className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-xs uppercase tracking-widest mb-2">Recognition</p>
          <h2 className="text-4xl font-extrabold text-gray-900">Achievements</h2>
          <div className="w-14 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
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
