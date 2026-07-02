import { Heart, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Interests() {
  const { data } = useData();
  const { ref: leftRef, visible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, visible: rightVisible } = useScrollAnimation();

  return (
    <section id="interests" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-3">Beyond Work</p>
          <h2 className="text-4xl font-extrabold text-black">Interests &amp; Volunteering</h2>
          <div className="w-10 h-px bg-black mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Professional interests */}
          <div
            ref={leftRef}
            className={`transition-all duration-700 ${leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <Heart size={17} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black">Professional Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {data.interests.map((interest, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-semibold text-sm transition-all duration-200 cursor-default hover:bg-blue-500 hover:text-white hover:border-blue-500 neon-tag-blue"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Volunteering */}
          <div
            ref={rightRef}
            className={`transition-all duration-700 delay-150 ${rightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Users size={17} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-black">Volunteering &amp; Activities</h3>
            </div>
            <div className="space-y-3">
              {data.volunteering.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200 hover-neon-emerald transition-all duration-300"
                >
                  <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm">{v.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
