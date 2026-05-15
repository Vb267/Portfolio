import { useState } from 'react';

const TECH_ITEMS = [
  { name: 'Python',     slug: 'python',          fallback: '#3776AB' },
  { name: 'SQL',        slug: 'postgresql',       fallback: '#4169E1' },
  { name: 'Tableau',    slug: 'tableau',          fallback: '#E97627' },
  { name: 'Snowflake',  slug: 'snowflake',        fallback: '#29B5E8' },
  { name: 'Excel',      slug: 'microsoftexcel',   fallback: '#217346' },
  { name: 'Power BI',   slug: 'microsoftpowerbi', fallback: '#F2C811' },
  { name: 'Pandas',     slug: 'pandas',           fallback: '#150458' },
  { name: 'JIRA',       slug: 'jira',             fallback: '#0052CC' },
  { name: 'Confluence', slug: 'confluence',       fallback: '#0052CC' },
  { name: 'GitHub',     slug: 'github',           fallback: '#181717' },
  { name: 'React',      slug: 'react',            fallback: '#61DAFB' },
  { name: 'NumPy',      slug: 'numpy',            fallback: '#013243' },
];

function TechItem({ name, slug, fallback }) {
  const [error, setError] = useState(false);
  const src = `https://cdn.simpleicons.org/${slug}`;

  return (
    <div className="flex flex-col items-center gap-3 mx-7 flex-shrink-0 group">
      {/* Icon card with neon on hover */}
      <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center neon-icon transition-all duration-300 group-hover:scale-110">
        {!error ? (
          <img
            src={src}
            alt={name}
            className="w-8 h-8 object-contain"
            loading="lazy"
            onError={() => setError(true)}
          />
        ) : (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
            style={{ backgroundColor: fallback }}
          >
            {name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <span className="text-gray-400 text-[11px] font-medium group-hover:text-gray-700 transition-colors duration-300 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function TechStack() {
  const doubled = [...TECH_ITEMS, ...TECH_ITEMS];
  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
        <p className="text-center text-gray-400 text-xs font-medium uppercase tracking-widest">
          Technologies &amp; Tools
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee">
          {doubled.map((item, i) => (
            <TechItem key={i} name={item.name} slug={item.slug} fallback={item.fallback} />
          ))}
        </div>
      </div>
    </section>
  );
}
