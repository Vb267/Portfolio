import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function ExperienceCard({ job }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover-neon-blue transition-all duration-300 w-full">
      <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-400 neon-box-blue" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-black font-bold text-base leading-snug">{job.title}</h3>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs whitespace-nowrap flex-shrink-0">
            <Calendar size={11} />{job.period}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
          <span className="text-blue-600 font-semibold text-sm">{job.company}</span>
          {job.companyType && (
            <span className="text-[11px] bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">
              {job.companyType}
            </span>
          )}
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <MapPin size={10} />{job.location}
          </div>
        </div>
        <ul className="space-y-2">
          {job.bullets.slice(0, 3).map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-gray-600 text-[13px] leading-relaxed">
              <span className="w-1 h-1 bg-blue-400 rounded-full mt-[7px] flex-shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EducationCard({ edu }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover-neon-violet transition-all duration-300 w-full">
      <div className="h-1 bg-gradient-to-r from-violet-500 to-violet-400 neon-box-violet" />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-black font-bold text-base leading-snug">{edu.degree}</h3>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs whitespace-nowrap flex-shrink-0">
            <Calendar size={11} />{edu.period}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
          <span className="text-violet-600 font-semibold text-sm">{edu.school}</span>
          {edu.subtitle && (
            <span className="text-[11px] bg-violet-50 text-violet-600 border border-violet-200 px-2 py-0.5 rounded-full">
              {edu.subtitle}
            </span>
          )}
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <MapPin size={10} />{edu.location}
          </div>
        </div>
        {edu.grade && <p className="text-gray-600 text-sm mb-3 font-medium">{edu.grade}</p>}
        {edu.highlights.length > 0 && (
          <ul className="space-y-2">
            {edu.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-gray-600 text-[13px] leading-relaxed">
                <span className="w-1 h-1 bg-violet-400 rounded-full mt-[7px] flex-shrink-0" />{h}
              </li>
            ))}
          </ul>
        )}
        {edu.modules.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {edu.modules.map((mod, i) => (
              <span key={i} className="text-[11px] bg-violet-50 text-violet-600 border border-violet-200 px-2.5 py-1 rounded-full">
                {mod}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineRow({ leftItem, rightItem, index }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div ref={ref} className={`relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 120}ms` }}>

      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] items-start gap-0 mb-12">
        <div className="pr-6 flex justify-end">
          {leftItem ? <ExperienceCard job={leftItem} /> : <div />}
        </div>
        <div className="flex flex-col items-center pt-6">
          <div className="w-9 h-9 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10 shadow-sm">
            {leftItem ? <Briefcase size={14} className="text-blue-500" /> : <GraduationCap size={14} className="text-violet-500" />}
          </div>
        </div>
        <div className="pl-6">
          {rightItem ? <EducationCard edu={rightItem} /> : <div />}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative flex gap-4 mb-8 pl-10">
        <div className="absolute left-3.5 top-4 w-4 h-4 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10">
          {leftItem ? <Briefcase size={8} className="text-blue-500" /> : <GraduationCap size={8} className="text-violet-500" />}
        </div>
        <div className="w-full">
          {leftItem ? <ExperienceCard job={leftItem} /> : rightItem && <EducationCard edu={rightItem} />}
        </div>
      </div>
    </div>
  );
}

export default function Journey() {
  const { data } = useData();
  const rows = [
    { leftItem: data.experience[0], rightItem: data.education[0] },
    { leftItem: data.experience[1], rightItem: data.education[1] },
  ];

  return (
    <section id="journey" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-3">My Background</p>
          <h2 className="text-4xl font-extrabold text-black">Career Journey</h2>
          <div className="w-10 h-px bg-black mx-auto mt-5" />
        </div>

        <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] mb-10">
          <div className="pr-6 text-right">
            <div className="inline-flex items-center gap-2 text-blue-500 text-xs font-semibold uppercase tracking-widest">
              <Briefcase size={12} />Experience
            </div>
          </div>
          <div />
          <div className="pl-6">
            <div className="inline-flex items-center gap-2 text-violet-500 text-xs font-semibold uppercase tracking-widest">
              <GraduationCap size={12} />Education
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
          {rows.map((row, i) => (
            <TimelineRow key={i} leftItem={row.leftItem} rightItem={row.rightItem} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
