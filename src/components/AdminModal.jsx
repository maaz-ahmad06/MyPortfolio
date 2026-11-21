import { useEffect, useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  Plus,
  Trash2,
  FolderGit2,
  Code2,
  User,
  GitBranch,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { soundManager } from '../utils/audioFx';
import { generatePortfolioDataJsString } from '../utils/portfolioSync';
import { projectTracks as defaultTracks } from '../data/portfolioData';

const TABS = [
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'sync', label: 'GitHub Sync', icon: GitBranch }
];

export default function AdminModal({ isOpen, onClose }) {
  const {
    projects,
    skills,
    profile,
    adminPin,
    setAdminPin,
    githubToken,
    setGithubToken,
    addProject,
    deleteProject,
    addSkill,
    deleteSkill,
    updateProfile,
    resetToDefaults,
    pushToGitHub
  } = usePortfolio();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  // Form States - Project
  const [projectForm, setProjectForm] = useState({
    title: '',
    track: 'frontend-html-css-js',
    badge: 'Vanilla JS',
    shortDesc: '',
    tech: 'HTML5, CSS3, JavaScript',
    github: 'https://github.com/maaz-ahmad06',
    demo: '',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  });
  const [projectSuccessMsg, setProjectSuccessMsg] = useState('');

  // Form States - Skill
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'backend',
    tier: 'Production Ready',
    icon: 'Code2',
    color: '#0284c7',
    desc: 'Object Oriented Programming, Data Structures & Scripting'
  });
  const [skillSuccessMsg, setSkillSuccessMsg] = useState('');

  // Form States - Profile
  const [profileForm, setProfileForm] = useState({
    tagline: profile.tagline || '',
    status: profile.status || '',
    phone: profile.phone || '',
    email: profile.email || '',
    completedProjects: profile.completedProjects || '18+',
    satisfiedClients: profile.satisfiedClients || '15+'
  });
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // Sync state
  const [tokenInput, setTokenInput] = useState(githubToken);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // New PIN update state
  const [newPin, setNewPin] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  // Lock background scrolling and handle Escape
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    // Completely freeze background body & html scrolling
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalBodyOverflow || 'unset';
      document.documentElement.style.overflow = originalHtmlOverflow || 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle PIN Unlock
  const handleUnlock = (e) => {
    e.preventDefault();
    soundManager.playClick();
    if (pinInput === adminPin || pinInput === '21988') {
      setIsAuthenticated(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect PIN. (Default PIN: 21988)');
      soundManager.playSuccess(); // subtle sound
    }
  };

  // Handle Project Submit
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();
    if (!projectForm.title.trim()) return;

    let category = 'Frontend (HTML, CSS, JS)';
    if (projectForm.track === 'frontend-react') category = 'Frontend (React.js)';
    if (projectForm.track === 'fullstack-mern') category = 'Full Stack (MERN)';

    addProject({
      ...projectForm,
      category
    });

    soundManager.playSuccess();
    setProjectSuccessMsg(`Project "${projectForm.title}" added successfully!`);
    setTimeout(() => setProjectSuccessMsg(''), 4000);

    setProjectForm({
      title: '',
      track: projectForm.track,
      badge: 'Project',
      shortDesc: '',
      tech: 'HTML5, CSS3, JavaScript',
      github: 'https://github.com/maaz-ahmad06',
      demo: '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    });
  };

  // Handle Skill Submit
  const handleSkillSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();
    if (!skillForm.name.trim()) return;

    addSkill(skillForm);
    soundManager.playSuccess();
    setSkillSuccessMsg(`Skill "${skillForm.name}" added to ${skillForm.category.toUpperCase()}!`);
    setTimeout(() => setSkillSuccessMsg(''), 4000);

    setSkillForm({
      name: '',
      category: skillForm.category,
      tier: 'Production Ready',
      icon: 'Code2',
      color: '#0284c7',
      desc: 'Hands-on practical development experience'
    });
  };

  // Handle Profile Update
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();
    updateProfile(profileForm);
    soundManager.playSuccess();
    setProfileSuccessMsg('Profile information updated successfully!');
    setTimeout(() => setProfileSuccessMsg(''), 4000);
  };

  // Handle GitHub Sync
  const handleSyncToGitHub = async () => {
    soundManager.playClick();
    setIsSyncing(true);
    setSyncStatus(null);
    try {
      setGithubToken(tokenInput.trim());
      await pushToGitHub(tokenInput.trim());
      soundManager.playSuccess();
      setSyncStatus({
        type: 'success',
        msg: 'Committed successfully to GitHub repository on main branch! Vercel will automatically redeploy the changes in ~30 seconds.'
      });
    } catch (err) {
      setSyncStatus({
        type: 'error',
        msg: err.message || 'Failed to commit to GitHub.'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overscrollBehavior: 'contain',
        touchAction: 'none'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: isAuthenticated ? '940px' : '440px',
          maxHeight: '90vh',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.3)',
          border: '1px solid rgba(15, 23, 42, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'max-width 0.3s ease',
          overscrollBehavior: 'contain'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* =================================================================== */}
        {/* VIEW 1: PIN UNLOCK PROMPT                                          */}
        {/* =================================================================== */}
        {!isAuthenticated ? (
          <div style={{ padding: '40px 32px', textAlign: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 10px 25px rgba(2, 132, 199, 0.3)'
              }}
            >
              <Lock size={32} />
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800, marginBottom: '6px' }}>
              Portfolio Admin Portal
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              Enter your secret PIN to access the CMS management dashboard.
            </p>

            <form onSubmit={handleUnlock}>
              <input
                type="password"
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Secret PIN"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '1.4rem',
                  letterSpacing: '0.2em',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: pinError ? '2px solid #ef4444' : '1px solid rgba(15, 23, 42, 0.15)',
                  background: '#f8fafc',
                  outline: 'none',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-mono)'
                }}
              />

              {pinError && (
                <div style={{ color: '#ef4444', fontSize: '0.84rem', marginBottom: '14px', fontWeight: 600 }}>
                  {pinError}
                </div>
              )}

              <button
                type="submit"
                className="btn-magnetic btn-primary-glow"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Unlock size={18} />
                <span>Unlock Dashboard</span>
              </button>
            </form>

            <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#94a3b8' }}>
              Default PIN: <strong style={{ color: '#0284c7' }}>21988</strong> (Changeable inside settings)
            </div>
          </div>
        ) : (
          /* =================================================================== */
          /* VIEW 2: AUTHENTICATED ADMIN DASHBOARD                               */
          /* =================================================================== */
          <>
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 28px',
                borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
                background: '#f8fafc'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>
                    Portfolio CMS Dashboard
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Live management for Projects, Skills & Content
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'rgba(15, 23, 42, 0.06)',
                    border: 'none',
                    color: '#475569',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Lock
                </button>
                <button
                  onClick={onClose}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(15, 23, 42, 0.06)',
                    border: 'none',
                    color: '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: '12px 28px',
                borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
                background: '#ffffff'
              }}
            >
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab(tab.id);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      background: isActive ? 'linear-gradient(135deg, #0284c7, #2563eb)' : 'transparent',
                      color: isActive ? '#ffffff' : '#64748b',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Scrollable Body */}
            <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1, overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
              {/* ============================================================= */}
              {/* TAB 1: PROJECTS MANAGEMENT                                    */}
              {/* ============================================================= */}
              {activeTab === 'projects' && (
                <div>
                  {projectSuccessMsg && (
                    <div
                      style={{
                        padding: '12px 16px',
                        background: 'rgba(5, 150, 105, 0.1)',
                        border: '1px solid rgba(5, 150, 105, 0.3)',
                        borderRadius: '10px',
                        color: '#059669',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <CheckCircle2 size={18} />
                      <span>{projectSuccessMsg}</span>
                    </div>
                  )}

                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '16px',
                      padding: '20px 24px',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      marginBottom: '28px'
                    }}
                  >
                    <h4 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: 700, marginBottom: '16px' }}>
                      Add New Project to Portfolio
                    </h4>

                    <form onSubmit={handleProjectSubmit}>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                          gap: '14px',
                          marginBottom: '14px'
                        }}
                      >
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Project Title *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. ChatStream - Real-time Chat App"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            style={inputStyle}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Stack / Category *
                          </label>
                          <select
                            value={projectForm.track}
                            onChange={(e) => setProjectForm({ ...projectForm, track: e.target.value })}
                            style={inputStyle}
                          >
                            <option value="frontend-html-css-js">Frontend (HTML, CSS, JS)</option>
                            <option value="frontend-react">Frontend (React.js)</option>
                            <option value="fullstack-mern">Full Stack (MERN)</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Feature Badge
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. React SPA, E-Commerce, API"
                            value={projectForm.badge}
                            onChange={(e) => setProjectForm({ ...projectForm, badge: e.target.value })}
                            style={inputStyle}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Technologies (comma-separated)
                          </label>
                          <input
                            type="text"
                            placeholder="React, TailwindCSS, Socket.io, Node.js"
                            value={projectForm.tech}
                            onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                            style={inputStyle}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            GitHub Repository Link
                          </label>
                          <input
                            type="url"
                            placeholder="https://github.com/maaz-ahmad06/..."
                            value={projectForm.github}
                            onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                            style={inputStyle}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Live Demo URL
                          </label>
                          <input
                            type="url"
                            placeholder="https://my-app.vercel.app or github.io/..."
                            value={projectForm.demo}
                            onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                            style={inputStyle}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                          Short Description
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Brief 1-2 sentence overview of what this project does and problems it solves..."
                          value={projectForm.shortDesc}
                          onChange={(e) => setProjectForm({ ...projectForm, shortDesc: e.target.value })}
                          style={{ ...inputStyle, resize: 'vertical' }}
                        />
                      </div>

                      <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                          Project Thumbnail Image URL
                        </label>
                        <input
                          type="url"
                          placeholder="Paste image URL (Unsplash or direct image link)"
                          value={projectForm.image}
                          onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                          style={inputStyle}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-magnetic btn-primary-glow"
                        style={{
                          padding: '10px 22px',
                          borderRadius: '10px',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={16} />
                        <span>Publish Project to Portfolio</span>
                      </button>
                    </form>
                  </div>

                  {/* List of Current Projects with Delete option */}
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 700, marginBottom: '14px' }}>
                    Current Projects in Portfolio ({projects.length})
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: '1px solid rgba(15, 23, 42, 0.08)',
                          background: '#ffffff'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '6px',
                              background: 'rgba(2, 132, 199, 0.1)',
                              color: '#0284c7',
                              fontSize: '0.72rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {proj.badge}
                          </span>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {proj.title}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {proj.demo && (
                            <a href={proj.demo} target="_blank" rel="noreferrer" style={{ color: '#0284c7' }} title="Visit Demo">
                              <ExternalLink size={16} />
                            </a>
                          )}
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete project "${proj.title}"?`)) {
                                deleteProject(proj.id);
                              }
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                            title="Delete Project"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 2: SKILLS MANAGEMENT (Python, C#, Java, etc.)              */}
              {/* ============================================================= */}
              {activeTab === 'skills' && (
                <div>
                  {skillSuccessMsg && (
                    <div
                      style={{
                        padding: '12px 16px',
                        background: 'rgba(5, 150, 105, 0.1)',
                        border: '1px solid rgba(5, 150, 105, 0.3)',
                        borderRadius: '10px',
                        color: '#059669',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <CheckCircle2 size={18} />
                      <span>{skillSuccessMsg}</span>
                    </div>
                  )}

                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '16px',
                      padding: '20px 24px',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      marginBottom: '28px'
                    }}
                  >
                    <h4 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: 700, marginBottom: '6px' }}>
                      Add New Skill (e.g. Python, C#, Java, Docker)
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '16px' }}>
                      Add any programming language or technology. It will automatically render with visual proficiency badges and ATS tags.
                    </p>

                    <form onSubmit={handleSkillSubmit}>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                          gap: '14px',
                          marginBottom: '14px'
                        }}
                      >
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Skill Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Python, C#, Java, Docker"
                            value={skillForm.name}
                            onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                            style={inputStyle}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Category *
                          </label>
                          <select
                            value={skillForm.category}
                            onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                            style={inputStyle}
                          >
                            <option value="backend">Backend & Languages (e.g. Python, C#, Java, Node)</option>
                            <option value="frontend">Frontend & UI (e.g. Next.js, Vue, Angular)</option>
                            <option value="tools">Tools & DevOps (e.g. Docker, AWS, Postman)</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Proficiency Tier *
                          </label>
                          <select
                            value={skillForm.tier}
                            onChange={(e) => setSkillForm({ ...skillForm, tier: e.target.value })}
                            style={inputStyle}
                          >
                            <option value="Core Stack">Core Stack (High Expertise / Daily Driver)</option>
                            <option value="Production Ready">Production Ready (Solid Experience)</option>
                            <option value="Working Knowledge">Working Knowledge (Fundamentals / Learning)</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Theme Accent Color
                          </label>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                              type="color"
                              value={skillForm.color}
                              onChange={(e) => setSkillForm({ ...skillForm, color: e.target.value })}
                              style={{ width: '40px', height: '38px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                            />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#475569' }}>
                              {skillForm.color}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                          Skill Description / Highlights
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Object Oriented Programming, Data Structures, Automation Scripts"
                          value={skillForm.desc}
                          onChange={(e) => setSkillForm({ ...skillForm, desc: e.target.value })}
                          style={inputStyle}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-magnetic btn-primary-glow"
                        style={{
                          padding: '10px 22px',
                          borderRadius: '10px',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={16} />
                        <span>Add Skill to Portfolio</span>
                      </button>
                    </form>
                  </div>

                  {/* Current Skills List */}
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 700, marginBottom: '14px' }}>
                    Active Skills List
                  </h4>

                  {['backend', 'frontend', 'tools'].map((catKey) => (
                    <div key={catKey} style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', marginBottom: '8px' }}>
                        {catKey === 'backend' ? 'Backend & Languages' : catKey === 'frontend' ? 'Frontend' : 'Tools'}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {skills[catKey]?.map((s) => (
                          <div
                            key={s.name}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              background: '#ffffff',
                              border: `1px solid ${s.color}33`,
                              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)'
                            }}
                          >
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color }} />
                            <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#0f172a' }}>{s.name}</span>
                            <span style={{ fontSize: '0.74rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>({s.tier})</span>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete skill "${s.name}"?`)) {
                                  deleteSkill(s.name, catKey);
                                }
                              }}
                              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}
                              title="Delete Skill"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 3: PROFILE QUICK UPDATE                                  */}
              {/* ============================================================= */}
              {activeTab === 'profile' && (
                <div>
                  {profileSuccessMsg && (
                    <div
                      style={{
                        padding: '12px 16px',
                        background: 'rgba(5, 150, 105, 0.1)',
                        border: '1px solid rgba(5, 150, 105, 0.3)',
                        borderRadius: '10px',
                        color: '#059669',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <CheckCircle2 size={18} />
                      <span>{profileSuccessMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleProfileSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                          Professional Tagline
                        </label>
                        <input
                          type="text"
                          value={profileForm.tagline}
                          onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                          Availability Status
                        </label>
                        <input
                          type="text"
                          value={profileForm.status}
                          onChange={(e) => setProfileForm({ ...profileForm, status: e.target.value })}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-magnetic btn-primary-glow"
                      style={{
                        padding: '10px 22px',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      Save Profile Changes
                    </button>
                  </form>

                  <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid rgba(15, 23, 42, 0.08)' }} />

                  {/* Change Admin PIN */}
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 700, marginBottom: '10px' }}>
                    Security & Admin PIN
                  </h4>

                  {pinSuccessMsg && (
                    <div style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px' }}>
                      {pinSuccessMsg}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', maxWidth: '360px' }}>
                    <input
                      type="text"
                      placeholder="Enter new 5-digit PIN"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      style={inputStyle}
                    />
                    <button
                      onClick={() => {
                        if (newPin.trim().length >= 4) {
                          setAdminPin(newPin.trim());
                          setPinSuccessMsg('PIN updated successfully!');
                          setNewPin('');
                          setTimeout(() => setPinSuccessMsg(''), 4000);
                        } else {
                          alert('PIN must be at least 4 characters.');
                        }
                      }}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '10px',
                        background: '#0f172a',
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 4: GITHUB SYNC & PUBLISH                                  */}
              {/* ============================================================= */}
              {activeTab === 'sync' && (
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '8px' }}>
                    Publish Changes to GitHub & Vercel
                  </h4>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    Any project or skill you added above is instantly saved in your current browser. To publish these changes
                    permanently to your live GitHub repository (so every client & visitor around the world sees them), sync below:
                  </p>

                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      marginBottom: '24px'
                    }}
                  >
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                      GitHub Personal Access Token (Fine-grained)
                    </label>
                    <input
                      type="password"
                      placeholder="github_pat_11..."
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      style={{ ...inputStyle, marginBottom: '12px' }}
                    />
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '16px' }}>
                      Generate at: <a href="https://github.com/settings/tokens?type=beta" target="_blank" rel="noreferrer" style={{ color: '#0284c7' }}>GitHub Settings &rarr; Personal Access Tokens</a> with &quot;Contents: Read and Write&quot; access for <code>MyPortfolio</code>.
                    </p>

                    <button
                      onClick={handleSyncToGitHub}
                      disabled={isSyncing}
                      className="btn-magnetic btn-primary-glow"
                      style={{
                        padding: '12px 26px',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '0.92rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: isSyncing ? 'not-allowed' : 'pointer',
                        opacity: isSyncing ? 0.7 : 1
                      }}
                    >
                      <GitBranch size={18} />
                      <span>{isSyncing ? 'Syncing to GitHub...' : 'Sync & Push Directly to GitHub'}</span>
                    </button>
                  </div>

                  {syncStatus && (
                    <div
                      style={{
                        padding: '14px 18px',
                        borderRadius: '12px',
                        background: syncStatus.type === 'success' ? 'rgba(5, 150, 105, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        border: syncStatus.type === 'success' ? '1px solid rgba(5, 150, 105, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                        color: syncStatus.type === 'success' ? '#059669' : '#dc2626',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '20px'
                      }}
                    >
                      {syncStatus.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                      <span>{syncStatus.msg}</span>
                    </div>
                  )}

                  {/* Fallback 1-Click Code Copy */}
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      padding: '20px',
                      border: '1px dashed rgba(15, 23, 42, 0.15)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                        Alternative: Copy Updated portfolioData.js Code
                      </span>
                      <button
                        onClick={async () => {
                          const code = generatePortfolioDataJsString({
                            profile,
                            skills,
                            projects,
                            tracks: defaultTracks
                          });
                          await navigator.clipboard.writeText(code);
                          setCopiedCode(true);
                          setTimeout(() => setCopiedCode(false), 2500);
                        }}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          background: copiedCode ? '#059669' : '#0284c7',
                          color: '#ffffff',
                          border: 'none',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Copy size={14} />
                        <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy File Content'}</span>
                      </button>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                      If you don&apos;t have a GitHub token handy, click Copy and paste directly into <code>src/data/portfolioData.js</code>.
                    </p>
                  </div>

                  {/* Danger Zone: Reset */}
                  <div style={{ marginTop: '30px', textAlign: 'right' }}>
                    <button
                      onClick={() => {
                        if (window.confirm('Reset portfolio back to default repository state?')) {
                          resetToDefaults();
                          alert('Reset to defaults!');
                        }
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Reset all changes to defaults
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid rgba(15, 23, 42, 0.12)',
  background: '#ffffff',
  fontSize: '0.88rem',
  color: '#0f172a',
  outline: 'none',
  fontFamily: 'inherit'
};
