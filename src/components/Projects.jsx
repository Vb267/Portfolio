import { ExternalLink, Github, ImageOff } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CARD_STYLES = [
  { badge: 'bg-blue-500',    neon: 'hover-neon-blue' },
  { badge: 'bg-violet-500',  neon: 'hover-neon-violet' },
  { badge: 'bg-emerald-500', neon: 'hover-neon-emerald' },
];

function ProjectCard({ project, index }) {
  const { ref, visible } = useScrollAnimation();
  const style = CARD_STYLES[index % CARD_STYLES.length];

  return (
    <div
      ref={ref}
      className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden ${style.neon} transition-all duration-300 flex flex-col ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden flex-shrink-0">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <div className="w-full h-full items-center justify-center flex-col gap-2" style={{ display: project.image ? 'none' : 'flex' }}>
          <ImageOff size={28} className="text-gray-300" />
          <span className="text-gray-400 text-xs font-medium">Add image to public/images/</span>
        </div>
        <div className={`absolute top-3 left-3 w-7 h-7 rounded-full ${style.badge} flex items-center justify-center shadow-sm`}>
          <span className="text-white text-[11px] font-bold">0{project.id}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-black font-bold text-base mb-1 leading-snug">{project.title}</h3>
        {(project.period || project.collaboration) && (
          <p className="text-gray-400 text-[11px] font-medium mb-2">
            {project.period}
            {project.period && project.collaboration && ' · '}
            {project.collaboration && `with ${project.collaboration}`}
          </p>
        )}
        <p className="text-gray-600 text-[13px] leading-relaxed mb-4 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t, i) => (
            <span key={i} className="text-[11px] bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-black text-xs font-medium transition-colors">
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-500 hover:text-black text-xs font-medium transition-colors">
              <Github size={12} /> GitHub
            </a>
          )}
          {!project.link && !project.github && <span className="text-gray-300 text-xs">Coming soon</span>}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { data } = useData();
  const projects = data.projects || [];
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-3">Work</p>
          <h2 className="text-4xl font-extrabold text-black">Projects</h2>
          <div className="w-10 h-px bg-black mx-auto mt-5" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
