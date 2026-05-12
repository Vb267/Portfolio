import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function ExperienceCard({ job, index }) {
  const { ref, visible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Timeline icon */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md z-10">
          {job.logo ? (
            <img src={job.logo} alt={job.company} className="w-9 h-9 object-contain rounded-lg" />
          ) : (
            <Briefcase className="text-white" size={22} />
          )}
        </div>
        {/* Connector line rendered via parent */}
      </div>

      {/* Card */}
      <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow mb-10">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm whitespace-nowrap">
            <Calendar size={13} />
            {job.period}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-5">
          <span className="text-blue-600 font-bold">{job.company}</span>
          {job.companyType && (
            <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-semibold">
              {job.companyType}
            </span>
          )}
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <MapPin size={12} />
            {job.location}
          </div>
        </div>

        <ul className="space-y-2.5">
          {job.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-gray-600 text-[14px] leading-relaxed">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const { data } = useData();

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-xs uppercase tracking-widest mb-2">Career</p>
          <h2 className="text-4xl font-extrabold text-gray-900">Work Experience</h2>
          <div className="w-14 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-7 top-7 bottom-10 w-px bg-blue-100 hidden md:block" />

          <div>
            {data.experience.map((job, i) => (
              <ExperienceCard key={job.id} job={job} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
