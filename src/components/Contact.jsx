import { Mail, Phone, MapPin, Linkedin, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Contact() {
  const { data } = useData();
  const { personal } = data;
  const { ref, visible } = useScrollAnimation();

  const contacts = [
    {
      Icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      Icon: Phone,
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone}`,
    },
    {
      Icon: MapPin,
      label: 'Location',
      value: personal.location,
      href: null,
    },
    {
      Icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: personal.linkedin,
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#0d1b3e] via-[#1a2e5a] to-[#1e3a8a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-blue-300 font-semibold text-xs uppercase tracking-widest mb-2">Get In Touch</p>
          <h2 className="text-4xl font-extrabold text-white">Contact Me</h2>
          <div className="w-14 h-1 bg-blue-400 mx-auto mt-4 rounded-full" />
          <p className="text-white/50 mt-6 max-w-xl mx-auto text-[15px] leading-relaxed">
            I&apos;m open to new opportunities and collaborations in fintech, data analytics, and financial services.
            Feel free to reach out — I&apos;ll get back to you promptly.
          </p>
        </div>

        <div
          ref={ref}
          className={`grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {contacts.map(({ Icon, label, value, href, external }, i) => {
            const inner = (
              <div className="flex items-center gap-4 p-5 bg-white/10 backdrop-blur border border-white/15 rounded-2xl hover:bg-white/[0.17] transition-all group cursor-pointer">
                <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-white/40 text-xs font-medium">{label}</p>
                  <p className="text-white font-semibold text-sm truncate">{value}</p>
                </div>
                {href && (
                  <ArrowRight
                    size={15}
                    className="text-white/25 ml-auto flex-shrink-0 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all"
                  />
                )}
              </div>
            );

            return href ? (
              <a
                key={i}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                {inner}
              </a>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-blue-900 rounded-2xl font-bold text-base hover:bg-blue-50 transition-all shadow-xl"
          >
            <Mail size={19} />
            Send Me an Email
          </a>
        </div>
      </div>
    </section>
  );
}
