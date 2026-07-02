import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

// To receive form submissions by email:
// 1. Go to https://formspree.io and create a free account
// 2. Create a new form and copy your form endpoint URL
// 3. Replace the placeholder below with your Formspree endpoint
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const CONTACT_META = [
  { Icon: Mail,     label: 'Email',    iconBg: 'bg-blue-100',    iconColor: 'text-blue-600',    neon: 'hover-neon-blue' },
  { Icon: Phone,    label: 'Phone',    iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', neon: 'hover-neon-emerald' },
  { Icon: MapPin,   label: 'Location', iconBg: 'bg-rose-100',    iconColor: 'text-rose-600',    neon: 'hover-neon-blue' },
  { Icon: Linkedin, label: 'LinkedIn', iconBg: 'bg-blue-100',    iconColor: 'text-blue-600',    neon: 'hover-neon-blue' },
];

export default function Contact() {
  const { data } = useData();
  const { personal } = data;

  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      const subject = encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      return;
    }
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      if (response.ok) { setStatus('success'); setFormData({ name: '', email: '', subject: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

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
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="text-4xl font-extrabold text-black">Contact Me</h2>
          <div className="w-10 h-px bg-black mx-auto mt-5" />
          <p className="text-gray-500 mt-6 max-w-lg mx-auto text-[15px] leading-relaxed">
            Open to opportunities in fintech, data analytics, and financial services.
            Feel free to reach out — I&apos;ll get back to you promptly.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 items-start">
          {/* Contact info */}
          <div className="space-y-3">
            {contacts.map(({ Icon, label, value, href, external, iconBg, iconColor, neon }, i) => {
              const inner = (
                <div className={`flex items-center gap-3.5 p-4 bg-white border border-gray-200 rounded-xl ${neon} transition-all duration-300 group`}>
                  <div className={`w-9 h-9 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon size={15} className={iconColor} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-400 text-[11px] font-medium mb-0.5">{label}</p>
                    <p className="text-gray-800 font-medium text-sm truncate group-hover:text-black transition-colors">{value}</p>
                  </div>
                </div>
              );
              return href ? (
                <a key={i} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{inner}</a>
              ) : <div key={i}>{inner}</div>;
            })}
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover-neon-blue transition-all duration-300">
            {(status === 'success' || status === 'mailto') ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center neon-box-emerald">
                  {status === 'mailto'
                    ? <Mail size={28} className="text-emerald-500" />
                    : <CheckCircle size={28} className="text-emerald-500" />}
                </div>
                <div>
                  <p className="text-black font-semibold mb-1">
                    {status === 'mailto' ? 'Opening your email app…' : 'Message sent!'}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {status === 'mailto'
                      ? `Your message was drafted in your email client — just press send. If nothing opened, email me directly at ${personal.email}.`
                      : 'Thank you for reaching out. I\'ll get back to you soon.'}
                  </p>
                </div>
                <button onClick={() => setStatus('idle')} className="mt-2 text-gray-400 hover:text-black text-sm transition-colors">
                  {status === 'mailto' ? 'Back to form' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-[11px] font-medium uppercase tracking-widest mb-2">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                      placeholder="Your name"
                      className="neon-input w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black text-sm placeholder-gray-300 transition-all" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-[11px] font-medium uppercase tracking-widest mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      placeholder="your@email.com"
                      className="neon-input w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black text-sm placeholder-gray-300 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-[11px] font-medium uppercase tracking-widest mb-2">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                    placeholder="What's this about?"
                    className="neon-input w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black text-sm placeholder-gray-300 transition-all" />
                </div>

                <div>
                  <label className="block text-gray-400 text-[11px] font-medium uppercase tracking-widest mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                    placeholder="Tell me about the opportunity or how I can help..."
                    className="neon-input w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black text-sm placeholder-gray-300 transition-all resize-none" />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={14} />
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <button type="submit" disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-black text-white rounded-lg font-semibold text-sm neon-btn-dark hover:bg-black/85 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send size={14} />
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}