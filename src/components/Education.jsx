import { GraduationCap, Calendar, MapPin, BookOpen, Star } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function EducationCard({ edu, index }) {
  const { ref, visible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100">
          {edu.logo ? (
            <img src={edu.logo} alt={edu.school} className="w-10 h-10 object-contain" />
          ) : (
            <GraduationCap className="text-blue-600" size={26} />
          )}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{edu.degree}</h3>
          <p className="text-blue-600 font-semibold text-sm mt-0.5">{edu.school}</p>
          {edu.subtitle && edu.subtitle !== edu.location && (
            <p className="text-gray-400 text-xs mt-0.5">{edu.subtitle}</p>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <Calendar size={13} />
          {edu.period}
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <MapPin size={13} />
          {edu.location}
        </div>
        {edu.grade && (
          <div className="flex items-center gap-1.5 text-amber-600 text-sm font-semibold">
            <Star size={13} />
            {edu.grade}
          </div>
        )}
      </div>

      {/* Modules */}
      {edu.modules.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Modules</p>
          <div className="flex flex-wrap gap-1.5">
            {edu.modules.map((mod, i) => (
              <span
                key={i}
                className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full font-medium"
              >
                {mod}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Highlights */}
      {edu.highlights.map((h, i) => (
        <div key={i} className="flex items-start gap-2 text-gray-600 text-sm mt-3">
          <BookOpen size={13} className="text-blue-400 mt-0.5 flex-shrink-0" />
          {h}
        </div>
      ))}
    </div>
  );
}

export default function Education() {
  const { data } = useData();

  return (
    <section id="education" className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-xs uppercase tracking-widest mb-2">Academic</p>
          <h2 className="text-4xl font-extrabold text-gray-900">Education</h2>
          <div className="w-14 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {data.education.map((edu, i) => (
            <EducationCard key={edu.id} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
