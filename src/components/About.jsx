import { Mail, Phone, MapPin, Linkedin, TrendingUp, Search, Lightbulb, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TRAITS = [
  { label: 'Data-Driven', Icon: TrendingUp },
  { label: 'Detail-Oriented', Icon: Search },
  { label: 'Problem Solver', Icon: Lightbulb },
  { label: 'Team Player', Icon: Users },
];

export default function About() {
  const { data } = useData();
  const { personal } = data;
  const { ref, visible } = useScrollAnimation();

  const initials = personal.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-xs uppercase tracking-widest mb-2">Who I Am</p>
          <h2 className="text-4xl font-extrabold text-gray-900">About Me</h2>
          <div className="w-14 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-5 gap-12 items-start transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left: avatar + contact */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="relative">
              {personal.photo ? (
                <img
                  src={personal.photo}
                  alt={personal.name}
                  className="w-44 h-44 rounded-2xl object-cover shadow-xl"
                />
              ) : (
                <div className="w-44 h-44 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-xl">
                  <span className="text-5xl font-extrabold text-white">{initials}</span>
                </div>
              )}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Open to Work
              </div>
            </div>

            {/* Contact links */}
            <div className="mt-10 w-full space-y-2.5 max-w-xs">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Mail size={14} className="text-blue-600" />
                </div>
                <span className="text-gray-600 text-sm truncate group-hover:text-blue-600 transition-colors">{personal.email}</span>
              </a>
              <div className="flex items-center gap-3 p-2.5">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-blue-600" />
                </div>
                <span className="text-gray-600 text-sm">{personal.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-2.5">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-blue-600" />
                </div>
                <span className="text-gray-600 text-sm">{personal.location}</span>
              </div>
              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white hover:shadow-sm transition-all group"
                >
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Linkedin size={14} className="text-blue-600" />
                  </div>
                  <span className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors">LinkedIn Profile</span>
                </a>
              )}
            </div>
          </div>

          {/* Right: content */}
          <div className="md:col-span-3">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
              Analytical Postgraduate &amp; Fintech Enthusiast
            </h3>
            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
              {personal.profileSummary}
            </p>

            {/* Traits */}
            <div className="grid grid-cols-2 gap-3">
              {TRAITS.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all"
                >
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
