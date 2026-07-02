import { useState } from 'react';
import {
  X, Save, RefreshCw, Download, Lock, Eye, EyeOff, Plus, Trash2,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { defaultData } from '../data/portfolio';

const ADMIN_PASSWORD = 'vrushank2024';

// ─── Shared form primitives ───────────────────────────────────────────────────

function Field({ label, value, onChange, type = 'text', placeholder, hint }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      />
      {hint && <p className="text-gray-400 text-xs mt-1">{hint}</p>}
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 4, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </label>
      <textarea
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical bg-white"
      />
    </div>
  );
}

// ─── Tab: Personal ────────────────────────────────────────────────────────────

function PersonalTab({ data, updateField }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Full Name" value={data.personal.name} onChange={(v) => updateField('personal.name', v)} />
        <Field label="Location" value={data.personal.location} onChange={(v) => updateField('personal.location', v)} />
      </div>
      <Field label="Professional Title" value={data.personal.title} onChange={(v) => updateField('personal.title', v)} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Email" type="email" value={data.personal.email} onChange={(v) => updateField('personal.email', v)} />
        <Field label="Phone" value={data.personal.phone} onChange={(v) => updateField('personal.phone', v)} />
      </div>
      <Field label="LinkedIn URL" value={data.personal.linkedin} onChange={(v) => updateField('personal.linkedin', v)} placeholder="https://linkedin.com/in/..." />
      <Field
        label="CV / Resume URL"
        value={data.personal.cvUrl}
        onChange={(v) => updateField('personal.cvUrl', v)}
        placeholder="https://drive.google.com/..."
        hint="Direct link to your PDF CV (Google Drive, Dropbox, etc.)"
      />
      <Field
        label="Profile Photo URL"
        value={data.personal.photo}
        onChange={(v) => updateField('personal.photo', v)}
        placeholder="https://..."
        hint="Direct link to your headshot image"
      />
      <Field label="Availability" value={data.personal.availability} onChange={(v) => updateField('personal.availability', v)} />
      <Textarea label="Profile Summary" value={data.personal.profileSummary} onChange={(v) => updateField('personal.profileSummary', v)} rows={6} />
    </div>
  );
}

// ─── Tab: Experience ─────────────────────────────────────────────────────────

function ExperienceTab({ data, setLocalData }) {
  const update = (jobId, field, value) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.experience.find((j) => j.id === jobId)[field] = value;
      return d;
    });

  const updateBullet = (jobId, idx, value) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.experience.find((j) => j.id === jobId).bullets[idx] = value;
      return d;
    });

  const addBullet = (jobId) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.experience.find((j) => j.id === jobId).bullets.push('');
      return d;
    });

  const removeBullet = (jobId, idx) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.experience.find((j) => j.id === jobId).bullets.splice(idx, 1);
      return d;
    });

  const addJob = () =>
    setLocalData((prev) => {
      const d = clone(prev);
      const id = Math.max(0, ...d.experience.map((j) => j.id)) + 1;
      d.experience.unshift({ id, title: '', company: '', companyType: '', location: '', period: '', bullets: [''], logo: '' });
      return d;
    });

  const removeJob = (jobId) => {
    if (!confirm('Remove this experience entry?')) return;
    setLocalData((prev) => {
      const d = clone(prev);
      d.experience = d.experience.filter((j) => j.id !== jobId);
      return d;
    });
  };

  return (
    <div className="space-y-6">
      <button onClick={addJob} className="w-full py-3 border-2 border-dashed border-blue-200 rounded-xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all text-sm font-semibold flex items-center justify-center gap-1.5">
        <Plus size={15} /> Add Experience
      </button>
      {data.experience.map((job) => (
        <div key={job.id} className="border border-gray-200 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-gray-800 text-sm">{job.company || 'New Experience'}</h4>
            <button onClick={() => removeJob(job.id)} className="text-red-400 hover:text-red-600 p-1">
              <Trash2 size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Job Title" value={job.title} onChange={(v) => update(job.id, 'title', v)} />
            <Field label="Company" value={job.company} onChange={(v) => update(job.id, 'company', v)} />
            <Field label="Company Type" value={job.companyType} onChange={(v) => update(job.id, 'companyType', v)} placeholder="e.g. Financial Services" />
            <Field label="Location" value={job.location} onChange={(v) => update(job.id, 'location', v)} />
            <Field label="Period" value={job.period} onChange={(v) => update(job.id, 'period', v)} placeholder="Jan 2024 – Dec 2024" />
            <Field label="Logo URL" value={job.logo} onChange={(v) => update(job.id, 'logo', v)} placeholder="https://..." />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Bullet Points</p>
            <div className="space-y-2">
              {job.bullets.map((b, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    value={b}
                    onChange={(e) => updateBullet(job.id, idx, e.target.value)}
                    placeholder={`Achievement ${idx + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={() => removeBullet(job.id, idx)} className="p-2 text-red-400 hover:text-red-600">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => addBullet(job.id)} className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
              <Plus size={13} /> Add bullet
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Tab: Education ───────────────────────────────────────────────────────────

function EducationTab({ data, setLocalData }) {
  const update = (eduId, field, value) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.education.find((e) => e.id === eduId)[field] = value;
      return d;
    });

  const updateModule = (eduId, idx, value) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.education.find((e) => e.id === eduId).modules[idx] = value;
      return d;
    });

  const addModule = (eduId) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.education.find((e) => e.id === eduId).modules.push('');
      return d;
    });

  const removeModule = (eduId, idx) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.education.find((e) => e.id === eduId).modules.splice(idx, 1);
      return d;
    });

  const addEdu = () =>
    setLocalData((prev) => {
      const d = clone(prev);
      const id = Math.max(0, ...d.education.map((e) => e.id)) + 1;
      d.education.push({ id, degree: '', school: '', subtitle: '', location: '', period: '', grade: '', modules: [], highlights: [], logo: '' });
      return d;
    });

  const removeEdu = (eduId) => {
    if (!confirm('Remove this education entry?')) return;
    setLocalData((prev) => {
      const d = clone(prev);
      d.education = d.education.filter((e) => e.id !== eduId);
      return d;
    });
  };

  return (
    <div className="space-y-6">
      {data.education.map((edu) => (
        <div key={edu.id} className="border border-gray-200 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-gray-800 text-sm">{edu.school || 'New Education'}</h4>
            <button onClick={() => removeEdu(edu.id)} className="text-red-400 hover:text-red-600 p-1">
              <Trash2 size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Degree" value={edu.degree} onChange={(v) => update(edu.id, 'degree', v)} />
            <Field label="School / University" value={edu.school} onChange={(v) => update(edu.id, 'school', v)} />
            <Field label="Subtitle" value={edu.subtitle} onChange={(v) => update(edu.id, 'subtitle', v)} />
            <Field label="Location" value={edu.location} onChange={(v) => update(edu.id, 'location', v)} />
            <Field label="Period" value={edu.period} onChange={(v) => update(edu.id, 'period', v)} placeholder="Sep 2024 – Sep 2026" />
            <Field label="Grade / CGPA" value={edu.grade} onChange={(v) => update(edu.id, 'grade', v)} placeholder="e.g. CGPA: 8.4 / 10" />
            <Field label="Logo URL" value={edu.logo} onChange={(v) => update(edu.id, 'logo', v)} placeholder="https://..." />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Modules</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {edu.modules.map((mod, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
                  <input
                    value={mod}
                    onChange={(e) => updateModule(edu.id, idx, e.target.value)}
                    className="text-sm bg-transparent focus:outline-none w-28"
                  />
                  <button onClick={() => removeModule(edu.id, idx)} className="text-red-400 hover:text-red-600">
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => addModule(edu.id)} className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
              <Plus size={13} /> Add module
            </button>
          </div>
        </div>
      ))}
      <button onClick={addEdu} className="w-full py-3 border-2 border-dashed border-blue-200 rounded-xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all text-sm font-semibold flex items-center justify-center gap-1.5">
        <Plus size={15} /> Add Education
      </button>
    </div>
  );
}

// ─── Tab: Skills ──────────────────────────────────────────────────────────────

function SkillsTab({ data, setLocalData }) {
  const updateCat = (idx, value) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.skills[idx].category = value;
      return d;
    });

  const updateSkill = (catIdx, skillIdx, value) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.skills[catIdx].items[skillIdx] = value;
      return d;
    });

  const addSkill = (catIdx) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.skills[catIdx].items.push('');
      return d;
    });

  const removeSkill = (catIdx, skillIdx) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.skills[catIdx].items.splice(skillIdx, 1);
      return d;
    });

  return (
    <div className="space-y-5">
      {data.skills.map((group, catIdx) => (
        <div key={catIdx} className="border border-gray-200 rounded-2xl p-5 space-y-3">
          <Field label="Category Name" value={group.category} onChange={(v) => updateCat(catIdx, v)} />
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Skills</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {group.items.map((skill, skillIdx) => (
                <div key={skillIdx} className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
                  <input
                    value={skill}
                    onChange={(e) => updateSkill(catIdx, skillIdx, e.target.value)}
                    className="text-sm bg-transparent focus:outline-none w-24"
                  />
                  <button onClick={() => removeSkill(catIdx, skillIdx)} className="text-red-400 hover:text-red-600">
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => addSkill(catIdx)} className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
              <Plus size={13} /> Add skill
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Tab: Achievements ────────────────────────────────────────────────────────

function AchievementsTab({ data, setLocalData }) {
  const update = (id, field, value) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.achievements.find((a) => a.id === id)[field] = value;
      return d;
    });

  const add = () =>
    setLocalData((prev) => {
      const d = clone(prev);
      const id = Math.max(0, ...d.achievements.map((a) => a.id)) + 1;
      d.achievements.push({ id, title: '', description: '', year: '', link: '' });
      return d;
    });

  const remove = (id) => {
    if (!confirm('Remove this achievement?')) return;
    setLocalData((prev) => {
      const d = clone(prev);
      d.achievements = d.achievements.filter((a) => a.id !== id);
      return d;
    });
  };

  return (
    <div className="space-y-5">
      {data.achievements.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-bold text-gray-700">{item.title || 'New Achievement'}</span>
            <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600 p-1">
              <Trash2 size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Title" value={item.title} onChange={(v) => update(item.id, 'title', v)} />
            <Field label="Year" value={item.year} onChange={(v) => update(item.id, 'year', v)} placeholder="2024" />
          </div>
          <Textarea label="Description" value={item.description} onChange={(v) => update(item.id, 'description', v)} rows={2} />
          <Field label="Link (optional)" value={item.link} onChange={(v) => update(item.id, 'link', v)} placeholder="https://..." />
        </div>
      ))}
      <button onClick={add} className="w-full py-3 border-2 border-dashed border-blue-200 rounded-xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all text-sm font-semibold flex items-center justify-center gap-1.5">
        <Plus size={15} /> Add Achievement
      </button>
    </div>
  );
}

// ─── Tab: Interests ───────────────────────────────────────────────────────────

function InterestsTab({ data, setLocalData }) {
  const updateInterest = (idx, value) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.interests[idx] = value;
      return d;
    });

  const addInterest = () =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.interests.push('');
      return d;
    });

  const removeInterest = (idx) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.interests.splice(idx, 1);
      return d;
    });

  const updateVol = (id, value) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.volunteering.find((v) => v.id === id).name = value;
      return d;
    });

  const addVol = () =>
    setLocalData((prev) => {
      const d = clone(prev);
      const id = Math.max(0, ...d.volunteering.map((v) => v.id)) + 1;
      d.volunteering.push({ id, name: '' });
      return d;
    });

  const removeVol = (id) =>
    setLocalData((prev) => {
      const d = clone(prev);
      d.volunteering = d.volunteering.filter((v) => v.id !== id);
      return d;
    });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Professional Interests</p>
        <div className="space-y-2">
          {data.interests.map((interest, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                value={interest}
                onChange={(e) => updateInterest(idx, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Fintech"
              />
              <button onClick={() => removeInterest(idx)} className="p-2 text-red-400 hover:text-red-600">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addInterest} className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
          <Plus size={13} /> Add interest
        </button>
      </div>

      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Volunteering &amp; Activities</p>
        <div className="space-y-2">
          {data.volunteering.map((v) => (
            <div key={v.id} className="flex gap-2">
              <input
                value={v.name}
                onChange={(e) => updateVol(v.id, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. UCD Badminton Club"
              />
              <button onClick={() => removeVol(v.id)} className="p-2 text-red-400 hover:text-red-600">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addVol} className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
          <Plus size={13} /> Add activity
        </button>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// ─── Main AdminPanel ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'personal', label: 'Personal' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'interests', label: 'Interests' },
];

export default function AdminPanel({ onClose }) {
  const { data, updateData, resetData } = useData();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [localData, setLocalData] = useState(() => clone(data));
  const [saved, setSaved] = useState(false);

  // Dot-path updater for simple nested fields
  const updateField = (path, value) => {
    setLocalData((prev) => {
      const d = clone(prev);
      const keys = path.split('.');
      let obj = d;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return d;
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPwError('');
    } else {
      setPwError('Incorrect password.');
    }
  };

  const handleSave = () => {
    updateData(localData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (!confirm('Reset all content to defaults? This will clear all your edits.')) return;
    resetData();
    setLocalData(clone(defaultData));
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(localData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Password gate
  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
          >
            <X size={18} />
          </button>
          <div className="text-center mb-7">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <Lock className="text-blue-600" size={22} />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">Admin Panel</h2>
            <p className="text-gray-500 text-sm mt-1">Enter your password to edit content</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="relative mb-3">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {pwError && <p className="text-red-500 text-sm mb-3">{pwError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="w-full max-w-xl bg-white h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-white flex-shrink-0">
          <div>
            <h2 className="font-extrabold text-gray-900 text-base">Content Manager</h2>
            <p className="text-gray-400 text-xs">Changes are saved in your browser</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExport}
              title="Export JSON"
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
            >
              <Download size={13} />
              Export
            </button>
            <button
              onClick={handleReset}
              title="Reset to defaults"
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-semibold"
            >
              <RefreshCw size={13} />
              Reset
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                saved ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Save size={13} />
              {saved ? 'Saved!' : 'Save'}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 px-3 py-2 bg-gray-50 border-b overflow-x-auto flex-shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-100'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'personal' && <PersonalTab data={localData} updateField={updateField} />}
          {activeTab === 'experience' && <ExperienceTab data={localData} setLocalData={setLocalData} />}
          {activeTab === 'education' && <EducationTab data={localData} setLocalData={setLocalData} />}
          {activeTab === 'skills' && <SkillsTab data={localData} setLocalData={setLocalData} />}
          {activeTab === 'achievements' && <AchievementsTab data={localData} setLocalData={setLocalData} />}
          {activeTab === 'interests' && <InterestsTab data={localData} setLocalData={setLocalData} />}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 bg-amber-50 border-t border-amber-100 flex-shrink-0">
          <p className="text-amber-700 text-xs font-medium">
            After saving, changes appear instantly. To make them permanent, click <strong>Export</strong> and replace <code>src/data/portfolio.js</code>.
          </p>
        </div>
      </div>
    </div>
  );
}