import { Heart, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Interests() {
  const { data } = useData();
  const { ref: leftRef, visible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, visible: rightVisible } = useScrollAnimation();

  return (
    <section id="interests" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold text-xs uppercase tracking-widest mb-2">Beyond Work</p>
          <h2 className="text-4xl font-extrabold text-gray-900">Interests &amp; Volunteering</h2>
          <div className="w-14 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
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
              <h3 className="text-xl font-bold text-gray-800">Professional Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {data.interests.map((interest, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl font-semibold text-sm hover:bg-blue-100 transition-colors"
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
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <Users size={17} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Volunteering &amp; Activities</h3>
            </div>
            <div className="space-y-3">
              {data.volunteering.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
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
