import { createContext, useContext, useEffect, useState } from 'react';
import {
  projectsData as defaultProjects,
  skillsData as defaultSkills,
  personalInfo as defaultPersonalInfo,
  projectTracks as defaultTracks
} from '../data/portfolioData';
import { generatePortfolioDataJsString } from '../utils/portfolioSync';

const STORAGE_KEYS = {
  PROJECTS: 'portfolio_custom_projects',
  TRACKS: 'portfolio_custom_tracks',
  SKILLS: 'portfolio_custom_skills',
  PROFILE: 'portfolio_custom_profile',
  GH_TOKEN: 'portfolio_admin_gh_token',
  PIN: 'portfolio_admin_pin'
};

const DEFAULT_PIN = '21988';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  // Initialize projects from localStorage or default data
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return defaultProjects;
  });

  // Initialize skills from localStorage or default data
  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return defaultSkills;
  });

  // Initialize personal profile
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return defaultPersonalInfo;
  });

  // Admin PIN & GitHub Token
  const [adminPin, setAdminPin] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PIN) || DEFAULT_PIN;
    } catch {
      return DEFAULT_PIN;
    }
  });

  const [githubToken, setGithubToken] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.GH_TOKEN) || '';
    } catch {
      return '';
    }
  });

  // Initialize tracks/stack cards from localStorage or default data
  const [tracks, setTracks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRACKS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return defaultTracks;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch {
      // Ignore
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRACKS, JSON.stringify(tracks));
    } catch {
      // Ignore
    }
  }, [tracks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    } catch {
      // Ignore
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {
      // Ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PIN, adminPin);
    } catch {
      // Ignore
    }
  }, [adminPin]);

  useEffect(() => {
    try {
      if (githubToken) {
        localStorage.setItem(STORAGE_KEYS.GH_TOKEN, githubToken);
      } else {
        localStorage.removeItem(STORAGE_KEYS.GH_TOKEN);
      }
    } catch {
      // Ignore
    }
  }, [githubToken]);

  // Compute dynamic project tracks with real counts
  const dynamicTracks = tracks.map((track) => {
    const count = projects.filter((p) => p.track === track.id).length;
    return {
      ...track,
      count,
      badge: `${count} Live Project${count === 1 ? '' : 's'}`
    };
  });

  // Actions: Add Project
  const addProject = (projectData) => {
    const targetTrackId = projectData.track || (dynamicTracks[0] ? dynamicTracks[0].id : 'frontend-html-css-js');
    const matchedTrack = dynamicTracks.find((t) => t.id === targetTrackId);
    const newProject = {
      id: projectData.id || `proj-${Date.now()}`,
      track: targetTrackId,
      category: projectData.category || matchedTrack?.title || 'Project',
      title: projectData.title,
      badge: projectData.badge || 'Project',
      shortDesc: projectData.shortDesc || '',
      longDesc: projectData.longDesc || projectData.shortDesc || '',
      tech: Array.isArray(projectData.tech)
        ? projectData.tech
        : (typeof projectData.tech === 'string'
            ? projectData.tech.split(',').map((t) => t.trim()).filter(Boolean)
            : ['HTML5', 'CSS3', 'JavaScript']),
      highlights: projectData.highlights?.length ? projectData.highlights : ['Responsive modern design', 'Clean component architecture'],
      gradient: projectData.gradient || matchedTrack?.gradient || 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
      github: projectData.github || 'https://github.com/maaz-ahmad06',
      demo: projectData.demo || '',
      image: projectData.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    };

    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  // Actions: Delete Project
  const deleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  // Actions: Add / Update Project Track (Stack Card)
  const addTrack = (trackData) => {
    const baseSlug = (trackData.title || 'custom')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const id = trackData.id || baseSlug || `track-${Date.now()}`;

    const accentColor = trackData.accentColor || '#0284c7';
    const gradient = trackData.gradient || `linear-gradient(135deg, ${accentColor} 0%, #2563eb 100%)`;
    const bgSoft = trackData.bgSoft || `${accentColor}18`;
    const borderSoft = trackData.borderSoft || `${accentColor}40`;

    const tags = Array.isArray(trackData.tags)
      ? trackData.tags
      : (typeof trackData.tags === 'string' && trackData.tags.trim()
          ? trackData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [trackData.title]);

    const newTrack = {
      id,
      title: trackData.title,
      subtitle: trackData.subtitle || 'Specialized Technology Stack',
      desc: trackData.desc || `Curated collection of applications and projects engineered using ${trackData.title}.`,
      badge: 'New Stack',
      count: 0,
      accentColor,
      gradient,
      bgSoft,
      borderSoft,
      icon: trackData.icon || 'Code2',
      tags
    };

    setTracks((prev) => {
      const exists = prev.some((t) => t.id === id);
      if (exists) {
        return prev.map((t) => (t.id === id ? { ...t, ...newTrack } : t));
      }
      return [...prev, newTrack];
    });

    return newTrack;
  };

  // Actions: Delete Project Track (Stack Card)
  const deleteTrack = (trackId) => {
    setTracks((prev) => prev.filter((t) => t.id !== trackId));
  };

  // Actions: Add Skill
  const addSkill = (skillData) => {
    const category = skillData.category || 'backend'; // 'frontend' | 'backend' | 'tools'
    const newSkill = {
      name: skillData.name,
      tier: skillData.tier || 'Core Stack',
      icon: skillData.icon || 'Code2',
      color: skillData.color || '#0284c7',
      desc: skillData.desc || 'Proficient hands-on expertise'
    };

    setSkills((prev) => {
      const targetCategory = prev[category] || [];
      // Prevent duplicate
      const filtered = targetCategory.filter((s) => s.name.toLowerCase() !== newSkill.name.toLowerCase());
      return {
        ...prev,
        [category]: [...filtered, newSkill]
      };
    });
  };

  // Actions: Delete Skill
  const deleteSkill = (skillName, category) => {
    setSkills((prev) => {
      const targetCategory = prev[category] || [];
      return {
        ...prev,
        [category]: targetCategory.filter((s) => s.name !== skillName)
      };
    });
  };

  // Actions: Update Profile
  const updateProfile = (fields) => {
    setProfile((prev) => ({ ...prev, ...fields }));
  };

  // Reset to original repository defaults
  const resetToDefaults = () => {
    setProjects(defaultProjects);
    setTracks(defaultTracks);
    setSkills(defaultSkills);
    setProfile(defaultPersonalInfo);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.TRACKS);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  };

  // Direct GitHub API Commit Push
  const pushToGitHub = async (customToken) => {
    const token = (customToken || githubToken)?.trim();
    if (!token) {
      throw new Error('GitHub Personal Access Token is required to commit to repository.');
    }

    const owner = 'maaz-ahmad06';
    const repo = 'MyPortfolio';
    const filePath = 'src/data/portfolioData.js';

    // 1. Fetch current file SHA from GitHub
    const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!getRes.ok) {
      throw new Error(`Failed to fetch file from GitHub. Check your token permissions: ${getRes.statusText}`);
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;

    // 2. Generate updated portfolioData.js file content
    const updatedContent = generatePortfolioDataJsString({
      profile,
      skills,
      projects,
      tracks: dynamicTracks
    });

    // 3. Commit updated content via PUT request
    const encodedContent = btoa(unescape(encodeURIComponent(updatedContent)));

    const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'feat: update portfolio data via Portfolio Admin Dashboard',
        content: encodedContent,
        sha: sha,
        branch: 'main'
      })
    });

    if (!putRes.ok) {
      const errJson = await putRes.json().catch(() => ({}));
      throw new Error(errJson.message || 'GitHub commit failed.');
    }

    return await putRes.json();
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        tracks,
        projectTracks: dynamicTracks,
        skills,
        profile,
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
        resetToDefaults,
        pushToGitHub
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
