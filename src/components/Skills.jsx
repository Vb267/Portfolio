import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CATEGORY_STYLES = {
  'Analysis & Strategy': {
    dot: 'bg-blue-600',
    tag: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  Technical: {
    dot: 'bg-indigo-600',
    tag: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  },
  'Collaboration & Communication': {
    dot: 'bg-violet-600',
    tag: 'bg-violet-50 text-violet-700 border-violet-100',
  },
  Tools: {
    dot: 'bg-amber-500',
    tag: 'bg-amber-50 text-amber-700 border-amber-100',
  },
};

const DEFAULT_STYLE = { dot: 'bg-blue-600', tag: 'bg-gray-100 text-gray-700 border-gray-200' };

function SkillGroup({ group, index }) {
  const { ref, visible } = useScrollAnimation();
  const style = CATEGORY_STYLES[group.category] || DEFAULT_STYLE;

  return (
    <div
      ref={ref}
      className={`bg-slate-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
        <h3 className="font-bold text-gray-800 text-sm">{group.category}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map((skill, i) => (
          <span
            key={i}
            className={`text-sm px-3 py-1.5 rounded-full font-medium border ${style.tag}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { data } = useData();

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-xs uppercase tracking-widest mb-2">Expertise</p>
          <h2 className="text-4xl font-extrabold text-gray-900">Skills</h2>
          <div className="w-14 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {data.skills.map((group, i) => (
            <SkillGroup key={i} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
