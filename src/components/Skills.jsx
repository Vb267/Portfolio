import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CATEGORY_STYLES = {
  'Analysis & Strategy': {
    dot:  'bg-blue-500',
    label: 'text-blue-500',
    pill:  'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-500 hover:text-white hover:border-blue-500 neon-tag-blue',
    card:  'hover-neon-blue',
  },
  'Technical': {
    dot:  'bg-violet-500',
    label: 'text-violet-500',
    pill:  'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-500 hover:text-white hover:border-violet-500 neon-tag-violet',
    card:  'hover-neon-violet',
  },
  'Collaboration & Communication': {
    dot:  'bg-emerald-500',
    label: 'text-emerald-500',
    pill:  'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 neon-tag-emerald',
    card:  'hover-neon-emerald',
  },
  'Tools': {
    dot:  'bg-amber-500',
    label: 'text-amber-500',
    pill:  'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-500 hover:text-white hover:border-amber-500 neon-tag-amber',
    card:  'hover-neon-amber',
  },
};

const DEFAULT_STYLE = {
  dot: 'bg-gray-400', label: 'text-gray-500',
  pill: 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-black hover:text-white hover:border-black',
  card: 'hover:border-gray-400',
};

function SkillGroup({ group, index }) {
  const { ref, visible } = useScrollAnimation();
  const style = CATEGORY_STYLES[group.category] || DEFAULT_STYLE;

  return (
    <div
      ref={ref}
      className={`bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 ${style.card} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-2 h-2 rounded-full ${style.dot}`} />
        <h3 className={`font-semibold text-xs uppercase tracking-widest ${style.label}`}>{group.category}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map((skill, i) => (
          <span
            key={i}
            className={`text-sm px-3 py-1.5 rounded-full font-medium border transition-all duration-200 cursor-default ${style.pill}`}
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
    <section id="skills" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-3">Expertise</p>
          <h2 className="text-4xl font-extrabold text-black">Skills</h2>
          <div className="w-10 h-px bg-black mx-auto mt-5" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.skills.map((group, i) => (
            <SkillGroup key={i} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
