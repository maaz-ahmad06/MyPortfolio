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
  Sparkles,
  Layers,
  Terminal,
  Cpu,
  Server,
  Smartphone,
  Globe,
  Zap,
  Atom,
  Database,
  Bot,
  FileText,
  FileUp,
  Download,
  FileCheck
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { soundManager } from '../utils/audioFx';
import { generatePortfolioDataJsString } from '../utils/portfolioSync';
import { projectTracks as defaultTracks } from '../data/portfolioData';

const TABS = [
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'tracks', label: 'Stack Cards', icon: Layers },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'cv', label: 'CV / Resume', icon: FileText },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'sync', label: 'GitHub Sync', icon: GitBranch }
];

const TRACK_PALETTES = [
  { id: 'emerald', label: 'Emerald (Python/Node)', color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
  { id: 'indigo', label: 'Indigo (C#/.NET/AI)', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' },
  { id: 'crimson', label: 'Crimson (Java/Spring)', color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
  { id: 'cyan', label: 'Cyan Ocean (React/Vite)', color: '#0284c7', gradient: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' },
  { id: 'amber', label: 'Amber Gold (Web/Cloud)', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' },
  { id: 'magenta', label: 'Magenta Pink (Mobile/App)', color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' },
  { id: 'teal', label: 'Teal Modern (DevOps/Go)', color: '#0d9488', gradient: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)' },
  { id: 'slate', label: 'Slate Dark (Systems/C++)', color: '#334155', gradient: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)' }
];

const TRACK_ICONS_MAP = {
  Terminal,
  Cpu,
  Server,
  Smartphone,
  Code2,
  Atom,
  Database,
  Bot,
  Layers,
  Globe,
  Zap,
  Sparkles
};

export default function AdminModal({ isOpen, onClose }) {
  const {
    projects,
    projectTracks,
    skills,
    profile,
    cvData,
    adminPin,
    setAdminPin,
    githubToken,
    setGithubToken,
    addProject,
    deleteProject,
    addTrack,
    deleteTrack,
    addSkill,
    deleteSkill,
    updateProfile,
    uploadCustomCv,
    removeCustomCv,
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

  // Form States - Track Card (Category)
  const [trackForm, setTrackForm] = useState({
    title: '',
    subtitle: '',
    desc: '',
    icon: 'Terminal',
    accentColor: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    tags: 'Python, Automation, Scripting, Data'
  });
  const [trackSuccessMsg, setTrackSuccessMsg] = useState('');

  // Form States - CV Upload
  const [stagedCvFile, setStagedCvFile] = useState(null);
  const [cvUrlInput, setCvUrlInput] = useState('');
  const [cvSuccessMsg, setCvSuccessMsg] = useState('');
  const [cvErrorMsg, setCvErrorMsg] = useState('');
  const [isProcessingCv, setIsProcessingCv] = useState(false);

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
      setPinError('Incorrect PIN. Access denied.');
      soundManager.playSuccess(); // subtle sound
    }
  };

  // Handle Project Submit
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();
    if (!projectForm.title.trim()) return;

    const matchedTrack = projectTracks.find((t) => t.id === projectForm.track);
    const category = matchedTrack ? matchedTrack.title : 'Project';

    addProject({
      ...projectForm,
      category
    });

    soundManager.playSuccess();
    setProjectSuccessMsg(`Project "${projectForm.title}" added to ${category} successfully!`);
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

  // Handle Track Card Submit
  const handleTrackSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();
    if (!trackForm.title.trim()) return;

    addTrack(trackForm);
    soundManager.playSuccess();
    setTrackSuccessMsg(`Stack Card "${trackForm.title}" created successfully! It is now live on your portfolio.`);
    setTimeout(() => setTrackSuccessMsg(''), 4500);

    setTrackForm({
      title: '',
      subtitle: '',
      desc: '',
      icon: 'Terminal',
      accentColor: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      tags: ''
    });
  };

  // Quick switch from skill to track card creation
  const handleCreateTrackFromSkill = (skillName) => {
    soundManager.playClick();
    const cleanName = skillName?.trim() || 'Modern Technology';
    setTrackForm({
      title: `${cleanName} & Development`,
      subtitle: `Modern ${cleanName} Applications & Solutions`,
      desc: `Curated collection of production applications, scripts, and systems developed with ${cleanName}.`,
      icon: 'Terminal',
      accentColor: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      tags: `${cleanName}, Clean Architecture, Solutions`
    });
    setActiveTab('tracks');
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

  // CV Upload Handlers
  const handleCvFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    soundManager.playClick();
    setCvErrorMsg('');
    setCvSuccessMsg('');

    const MAX_SIZE_MB = 4.5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setCvErrorMsg(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please choose a file under ${MAX_SIZE_MB}MB or provide a hosted URL.`);
      return;
    }

    setIsProcessingCv(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        setStagedCvFile({
          name: file.name,
          size: file.size,
          type: file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/png'),
          dataUrl
        });
        soundManager.playSuccess();
      }
      setIsProcessingCv(false);
    };
    reader.onerror = () => {
      setCvErrorMsg('Could not read the selected file. Please try again.');
      setIsProcessingCv(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveStagedCv = () => {
    if (!stagedCvFile) return;
    try {
      uploadCustomCv({
        fileType: stagedCvFile.type,
        fileName: stagedCvFile.name,
        fileSize: stagedCvFile.size,
        dataUrl: stagedCvFile.dataUrl
      });
      soundManager.playSuccess();
      setCvSuccessMsg(`CV "${stagedCvFile.name}" activated successfully! Visitors will now see and be able to download your uploaded document.`);
      setStagedCvFile(null);
      setTimeout(() => setCvSuccessMsg(''), 5000);
    } catch {
      setCvErrorMsg('Browser storage quota reached. Please optimize your file or provide a hosted URL.');
    }
  };

  const handleSetCvUrl = (e) => {
    e.preventDefault();
    soundManager.playClick();
    const url = cvUrlInput.trim();
    if (!url) return;

    const isPdf = url.toLowerCase().includes('.pdf');
    uploadCustomCv({
      fileType: isPdf ? 'pdf' : 'url',
      fileName: 'Hosted_CV',
      fileSize: 0,
      dataUrl: url
    });
    soundManager.playSuccess();
    setCvSuccessMsg('Hosted CV URL activated successfully!');
    setCvUrlInput('');
    setTimeout(() => setCvSuccessMsg(''), 5000);
  };

  const handleRemoveCustomCv = () => {
    if (window.confirm('Remove uploaded custom CV and revert back to the auto-generated ATS Resume?')) {
      soundManager.playClick();
      removeCustomCv();
      soundManager.playSuccess();
      setCvSuccessMsg('Reverted to default ATS Resume.');
      setTimeout(() => setCvSuccessMsg(''), 4000);
    }
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
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>
                              Stack / Category *
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                soundManager.playClick();
                                setActiveTab('tracks');
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#0284c7',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: 0
                              }}
                            >
                              <Plus size={12} />
                              <span>New Stack Card</span>
                            </button>
                          </div>
                          <select
                            value={projectForm.track}
                            onChange={(e) => {
                              const selectedT = projectTracks.find((t) => t.id === e.target.value);
                              setProjectForm({
                                ...projectForm,
                                track: e.target.value,
                                badge: selectedT ? selectedT.title.split(' ')[0] : 'Project'
                              });
                            }}
                            style={inputStyle}
                          >
                            {projectTracks.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.title} ({projects.filter((p) => p.track === t.id).length} projects)
                              </option>
                            ))}
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
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
                            {projectTracks.find((t) => t.id === proj.track)?.title.split(' ')[0] || proj.badge}
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
              {/* TAB 2: STACK CARDS (CATEGORIES) MANAGEMENT                     */}
              {/* ============================================================= */}
              {activeTab === 'tracks' && (
                <div>
                  {trackSuccessMsg && (
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
                      <span>{trackSuccessMsg}</span>
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
                      Create New Project Stack Card (e.g. Python, C#, Java, Mobile Apps)
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '18px' }}>
                      Every card you add here becomes an interactive card on your portfolio landing page. When visitors click it, it opens a dedicated showcase page featuring all projects assigned to that stack!
                    </p>

                    <form onSubmit={handleTrackSubmit}>
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
                            Card Title / Stack Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Python & Data Science, C# & .NET"
                            value={trackForm.title}
                            onChange={(e) => setTrackForm({ ...trackForm, title: e.target.value })}
                            style={inputStyle}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Subtitle / Focus Area
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Automation, AI Models & Backend Services"
                            value={trackForm.subtitle}
                            onChange={(e) => setTrackForm({ ...trackForm, subtitle: e.target.value })}
                            style={inputStyle}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                            Card Icon
                          </label>
                          <select
                            value={trackForm.icon}
                            onChange={(e) => setTrackForm({ ...trackForm, icon: e.target.value })}
                            style={inputStyle}
                          >
                            <option value="Terminal">Terminal / CLI (Python / Scripting)</option>
                            <option value="Cpu">Cpu / Chip (C# / Algorithms / AI)</option>
                            <option value="Server">Server (Java / Spring / Node / Backend)</option>
                            <option value="Smartphone">Smartphone (Mobile / Flutter / Android)</option>
                            <option value="Code2">Code2 (General Clean Code)</option>
                            <option value="Atom">Atom (React / Frontend UI)</option>
                            <option value="Database">Database (SQL / MERN / Data)</option>
                            <option value="Bot">Bot / AI (Machine Learning / Automation)</option>
                            <option value="Layers">Layers (Full Stack Architecture)</option>
                            <option value="Globe">Globe (Web & Cloud Platforms)</option>
                            <option value="Zap">Zap (High Performance / Realtime)</option>
                            <option value="Sparkles">Sparkles (Creative / Next-Gen)</option>
                          </select>
                        </div>
                      </div>

                      {/* Color Palette Selector */}
                      <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                          Theme Color & Gradient Preset
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {TRACK_PALETTES.map((pal) => {
                            const isSelected = trackForm.accentColor === pal.color;
                            return (
                              <button
                                key={pal.id}
                                type="button"
                                onClick={() => {
                                  soundManager.playClick();
                                  setTrackForm({
                                    ...trackForm,
                                    accentColor: pal.color,
                                    gradient: pal.gradient
                                  });
                                }}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  background: isSelected ? 'rgba(15, 23, 42, 0.08)' : '#ffffff',
                                  border: isSelected ? `2px solid ${pal.color}` : '1px solid rgba(15, 23, 42, 0.1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                              >
                                <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: pal.gradient }} />
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isSelected ? '#0f172a' : '#475569' }}>
                                  {pal.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                          Card Description
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Brief 1-2 sentence overview of what kinds of applications are in this track..."
                          value={trackForm.desc}
                          onChange={(e) => setTrackForm({ ...trackForm, desc: e.target.value })}
                          style={{ ...inputStyle, resize: 'vertical' }}
                        />
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                          Technologies / Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Python, Pandas, FastAPI, Automation"
                          value={trackForm.tags}
                          onChange={(e) => setTrackForm({ ...trackForm, tags: e.target.value })}
                          style={inputStyle}
                        />
                      </div>

                      {/* Live Card Preview */}
                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                          Live Homepage Card Preview
                        </div>
                        <div
                          style={{
                            background: '#ffffff',
                            borderRadius: '16px',
                            border: '1px solid rgba(15, 23, 42, 0.08)',
                            padding: '20px',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)'
                          }}
                        >
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: trackForm.gradient }} />
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div
                              style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '12px',
                                background: trackForm.gradient,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff'
                              }}
                            >
                              {(() => {
                                const PreviewIcon = TRACK_ICONS_MAP[trackForm.icon] || Code2;
                                return <PreviewIcon size={20} />;
                              })()}
                            </div>
                            <span
                              style={{
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                background: `${trackForm.accentColor}18`,
                                color: trackForm.accentColor,
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                fontFamily: 'var(--font-mono)'
                              }}
                            >
                              0 Live Projects
                            </span>
                          </div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>
                            {trackForm.title || 'Card Title'}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: trackForm.accentColor, fontWeight: 600, marginBottom: '6px' }}>
                            {trackForm.subtitle || 'Focus Area / Subtitle'}
                          </div>
                          <div style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                            {trackForm.desc || 'Card description will appear here on your portfolio landing page.'}
                          </div>
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
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={16} />
                        <span>Create Stack Showcase Card</span>
                      </button>
                    </form>
                  </div>

                  {/* List of Current Stack Cards */}
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 700, marginBottom: '14px' }}>
                    Active Portfolio Stack Cards ({projectTracks.length})
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {projectTracks.map((t) => {
                      const IconComp = TRACK_ICONS_MAP[t.icon] || Code2;
                      const count = projects.filter((p) => p.track === t.id).length;
                      const isDefault = ['frontend-html-css-js', 'frontend-react', 'fullstack-mern'].includes(t.id);

                      return (
                        <div
                          key={t.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '14px 18px',
                            borderRadius: '14px',
                            border: '1px solid rgba(15, 23, 42, 0.08)',
                            background: '#ffffff',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: t.gradient }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: '6px' }}>
                            <div
                              style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                background: t.gradient,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff'
                              }}
                            >
                              <IconComp size={18} />
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{t.title}</span>
                                <span
                                  style={{
                                    padding: '2px 8px',
                                    borderRadius: '6px',
                                    background: `${t.accentColor}18`,
                                    color: t.accentColor,
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    fontFamily: 'var(--font-mono)'
                                  }}
                                >
                                  {count} {count === 1 ? 'Project' : 'Projects'}
                                </span>
                              </div>
                              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{t.subtitle}</div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                soundManager.playClick();
                                setProjectForm((prev) => ({
                                  ...prev,
                                  track: t.id,
                                  badge: t.title.split(' ')[0]
                                }));
                                setActiveTab('projects');
                              }}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '8px',
                                background: '#f8fafc',
                                border: '1px solid rgba(15, 23, 42, 0.1)',
                                color: '#0284c7',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Plus size={12} />
                              <span>Add Project</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete stack card "${t.title}"? Any projects inside will remain in the database.`)) {
                                  deleteTrack(t.id);
                                }
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: isDefault ? '#94a3b8' : '#ef4444',
                                cursor: 'pointer',
                                padding: '6px'
                              }}
                              title={isDefault ? 'Delete Track' : 'Delete Custom Stack Card'}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 3: SKILLS MANAGEMENT (Python, C#, Java, etc.)              */}
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

                      {/* Quick link to create Stack Card for this skill */}
                      <div
                        style={{
                          marginTop: '16px',
                          padding: '12px 16px',
                          background: 'rgba(2, 132, 199, 0.06)',
                          borderRadius: '12px',
                          border: '1px dashed rgba(2, 132, 199, 0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '10px'
                        }}
                      >
                        <div style={{ fontSize: '0.84rem', color: '#334155' }}>
                          💡 <strong>Have projects for this skill?</strong> Create a dedicated <strong>Stack Showcase Card</strong> so they have their own page on your portfolio!
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCreateTrackFromSkill(skillForm.name)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            background: '#0284c7',
                            color: '#ffffff',
                            border: 'none',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Layers size={14} />
                          <span>Create Card for {skillForm.name || 'this Skill'}</span>
                        </button>
                      </div>
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
              {/* TAB 4: CV / RESUME UPLOADER (PDF / PNG / JPG)                 */}
              {/* ============================================================= */}
              {activeTab === 'cv' && (
                <div>
                  {cvSuccessMsg && (
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
                      <span>{cvSuccessMsg}</span>
                    </div>
                  )}

                  {cvErrorMsg && (
                    <div
                      style={{
                        padding: '12px 16px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '10px',
                        color: '#dc2626',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <AlertCircle size={18} />
                      <span>{cvErrorMsg}</span>
                    </div>
                  )}

                  {/* 1. Current Active CV Status Card */}
                  <div
                    style={{
                      background: cvData?.hasCustomCv ? 'rgba(2, 132, 199, 0.04)' : '#f8fafc',
                      borderRadius: '16px',
                      padding: '20px 24px',
                      border: cvData?.hasCustomCv
                        ? '1px solid rgba(2, 132, 199, 0.25)'
                        : '1px solid rgba(15, 23, 42, 0.08)',
                      marginBottom: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            background: cvData?.hasCustomCv ? '#0284c7' : '#64748b',
                            color: '#ffffff',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {cvData?.hasCustomCv ? `ACTIVE CUSTOM CV (${cvData.fileType?.toUpperCase()})` : 'AUTO-GENERATED ATS RESUME ACTIVE'}
                        </span>
                      </div>

                      {cvData?.hasCustomCv && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <a
                            href={cvData.dataUrl}
                            download={cvData.fileName || 'Maaz_Ahmad_CV'}
                            className="btn-magnetic"
                            style={{
                              padding: '6px 14px',
                              borderRadius: '8px',
                              background: '#ffffff',
                              border: '1px solid rgba(15, 23, 42, 0.12)',
                              color: '#0f172a',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              textDecoration: 'none'
                            }}
                          >
                            <Download size={14} />
                            <span>Download Current</span>
                          </a>

                          <a
                            href={cvData.dataUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-magnetic"
                            style={{
                              padding: '6px 14px',
                              borderRadius: '8px',
                              background: '#ffffff',
                              border: '1px solid rgba(15, 23, 42, 0.12)',
                              color: '#0284c7',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              textDecoration: 'none'
                            }}
                          >
                            <ExternalLink size={14} />
                            <span>View Full</span>
                          </a>

                          <button
                            type="button"
                            onClick={handleRemoveCustomCv}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              background: '#fee2e2',
                              border: '1px solid #fca5a5',
                              color: '#b91c1c',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            title="Remove custom CV and revert to default"
                          >
                            <Trash2 size={13} />
                            <span>Revert to ATS</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {cvData?.hasCustomCv ? (
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                          📄 {cvData.fileName || 'Custom CV'}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                          {cvData.fileSize > 0 && `Size: ${(cvData.fileSize / 1024).toFixed(1)} KB • `}
                          Format: {cvData.fileType?.toUpperCase()} • Last updated: {cvData.updatedAt ? new Date(cvData.updatedAt).toLocaleDateString() : 'Recently'}
                        </div>
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                        Visitors who click <strong>&quot;View CV / Resume&quot;</strong> in the Hero or About section are currently shown the clean, auto-generated ATS resume sheet. You can upload your own custom designed <strong>PDF</strong> or <strong>PNG/JPG image</strong> below to replace it anytime!
                      </p>
                    )}
                  </div>

                  {/* 2. Upload Box */}
                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      marginBottom: '24px'
                    }}
                  >
                    <h4 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: 700, marginBottom: '6px' }}>
                      Upload New CV / Resume File
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '18px' }}>
                      Supports <strong>PDF documents (.pdf)</strong> or high-resolution <strong>PNG / JPG images</strong>. Perfect when you update your CV in Canva, Figma, or Word and want to publish the new version immediately.
                    </p>

                    {/* Drag and Drop / Click Area */}
                    <label
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '32px 20px',
                        borderRadius: '14px',
                        border: '2px dashed rgba(2, 132, 199, 0.4)',
                        background: '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        marginBottom: '16px',
                        textAlign: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#0284c7';
                        e.currentTarget.style.background = 'rgba(2, 132, 199, 0.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(2, 132, 199, 0.4)';
                        e.currentTarget.style.background = '#ffffff';
                      }}
                    >
                      <input
                        type="file"
                        accept=".pdf,image/png,image/jpeg,image/webp"
                        onChange={handleCvFileSelect}
                        style={{ display: 'none' }}
                      />
                      <div
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '14px',
                          background: 'rgba(2, 132, 199, 0.1)',
                          color: '#0284c7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '12px'
                        }}
                      >
                        <FileUp size={28} />
                      </div>
                      <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                        Click to Browse or Drag &amp; Drop CV File
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Accepted: .PDF, .PNG, .JPG, .WEBP (Recommended size: under 4MB)
                      </div>
                    </label>

                    {/* Staged File Confirmation Card */}
                    {stagedCvFile && (
                      <div
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          background: '#ffffff',
                          border: '1px solid rgba(2, 132, 199, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '12px',
                          marginBottom: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '10px',
                              background: '#0284c7',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <FileCheck size={22} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                              {stagedCvFile.name}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                              {(stagedCvFile.size / 1024).toFixed(1)} KB &bull; Ready to activate
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={handleSaveStagedCv}
                            disabled={isProcessingCv}
                            className="btn-magnetic btn-primary-glow"
                            style={{
                              padding: '8px 20px',
                              borderRadius: '8px',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            <CheckCircle2 size={15} />
                            <span>Activate This CV</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setStagedCvFile(null)}
                            style={{
                              padding: '8px 14px',
                              borderRadius: '8px',
                              background: '#f1f5f9',
                              border: 'none',
                              color: '#475569',
                              fontSize: '0.85rem',
                              cursor: 'pointer'
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Direct Hosted URL Fallback */}
                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '16px',
                      padding: '20px 24px',
                      border: '1px solid rgba(15, 23, 42, 0.08)'
                    }}
                  >
                    <h4 style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700, marginBottom: '6px' }}>
                      Or Provide Hosted CV URL (Google Drive / GitHub / Dropbox)
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: '14px' }}>
                      If your PDF is hosted on Google Drive, GitHub, or OneDrive, you can paste its public link directly:
                    </p>

                    <form onSubmit={handleSetCvUrl} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... or https://raw.githubusercontent.com/..."
                        value={cvUrlInput}
                        onChange={(e) => setCvUrlInput(e.target.value)}
                        style={{ ...inputStyle, flex: 1, minWidth: '240px' }}
                      />
                      <button
                        type="submit"
                        className="btn-magnetic btn-primary-glow"
                        style={{
                          padding: '10px 20px',
                          borderRadius: '10px',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <ExternalLink size={15} />
                        <span>Set Link as Active CV</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 5: PROFILE QUICK UPDATE                                  */}
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
