import React, { useState, useEffect, useRef } from 'react';
import { THEMES } from './constants/data';

// UI Components
import CustomCursor from './components/ui/CustomCursor';
import BackgroundGrid from './components/ui/BackgroundGrid';
import Toast from './components/ui/Toast';
import ProjectModal from './components/ui/ProjectModal';
import ResumeModal from './components/ui/ResumeModal';
import TerminalDrawer from './components/ui/TerminalDrawer';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Section Components
import HeroAboutSection from './components/sections/HeroAboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';

export default function App() {
  // Theme & Appearance States
  const [accent, setAccent] = useState(() => {
    const saved = localStorage.getItem('faizal-portfolio-accent');
    if (!saved || saved === 'Iris' || saved === 'Rust' || saved === 'Sand' || saved === 'Sage' || saved === 'Slate') {
      return 'Emerald';
    }
    return saved;
  });
  const [isPortraitLoaded, setIsPortraitLoaded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('faizal-portfolio-theme');
    if (saved) return saved === 'dark';
    return true; // Default to dark mode
  });
  const [cursorTheme, setCursorTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('faizal-portfolio-cursor-theme');
      if (savedTheme) {
        return savedTheme.startsWith('"') || savedTheme.startsWith('{')
          ? JSON.parse(savedTheme)
          : savedTheme;
      }
      const savedBool = localStorage.getItem('faizal-portfolio-use-cursor');
      if (savedBool === 'true') return 'developer';
    } catch (e) {
      console.error('Error reading cursorTheme from localStorage:', e);
    }
    return 'default';
  });

  // Navigation State
  const [activeNav, setActiveNav] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // About Section Active Tab
  const [aboutTab, setAboutTab] = useState('story');

  // Experience Active Tab
  const [activeExp, setActiveExp] = useState(0);

  // Project Category Filter
  const [projectFilter, setProjectFilter] = useState('All');

  // Selected Project for Modal
  const [selectedProject, setSelectedProject] = useState(null);

  // Modal active sub-tab (Overview vs Clean Architecture)
  const [modalTab, setModalTab] = useState('overview');
  // Visualizer active layer (Presentation, Domain, Data)
  const [activeArchLayer, setActiveArchLayer] = useState('presentation');

  // Device Switcher States (per project ID)
  const [projectPlatforms, setProjectPlatforms] = useState({
    blessing: 'iOS',
    ncc: 'iOS',
    expenxo: 'Android',
    chatifly: 'iOS',
    autoresq: 'Android'
  });

  // Custom Cursor Positions
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Contact Form States
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('faizal-portfolio-contact-draft');
      return saved ? JSON.parse(saved) : { name: '', email: '', subject: '', message: '' };
    } catch (e) {
      console.error('Error reading contact draft from localStorage:', e);
      return { name: '', email: '', subject: '', message: '' };
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Resume Modal State
  const [showResume, setShowResume] = useState(false);

  // Terminal CLI Panel states
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'info', text: 'Welcome to Faizal M. Portfolio Shell CLI v1.0' },
    { type: 'info', text: 'Type "help" to view list of active commands.' }
  ]);
  const terminalBottomRef = useRef(null);

  // Effect to apply selected accent theme to CSS custom property
  useEffect(() => {
    const activeThemeObj = THEMES.find(t => t.name === accent) || THEMES[0];
    document.documentElement.style.setProperty('--accent-rgb', activeThemeObj.rgb);
    localStorage.setItem('faizal-portfolio-accent', activeThemeObj.name);
    if (accent !== activeThemeObj.name) {
      setAccent(activeThemeObj.name);
    }
  }, [accent]);

  // Effect to toggle dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('faizal-portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('faizal-portfolio-theme', 'light');
    }
  }, [isDarkMode]);

  // Effect to store cursor preference
  useEffect(() => {
    localStorage.setItem('faizal-portfolio-cursor-theme', JSON.stringify(cursorTheme));
  }, [cursorTheme]);

  // Track Mouse for custom cursor (only on desktop/pointer screens)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Save form drafts to local storage
  useEffect(() => {
    localStorage.setItem('faizal-portfolio-contact-draft', JSON.stringify(formData));
  }, [formData]);

  // Auto scroll terminal history
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, terminalOpen]);

  // Toggle Project Platform Switcher
  const togglePlatform = (id) => {
    setProjectPlatforms(prev => ({
      ...prev,
      [id]: prev[id] === 'iOS' ? 'Android' : 'iOS'
    }));
  };

  // Form Validation
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      localStorage.removeItem('faizal-portfolio-contact-draft');

      setTimeout(() => setShowToast(false), 4000);
    }, 1800);
  };

  // CLI Command Interpreter
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let newHistory = [...terminalHistory, { type: 'input', text: `visitor@faizal-portfolio:~$ ${terminalInput}` }];

    const parts = cmd.split(' ');
    const mainCmd = parts[0];
    const arg = parts.slice(1).join(' ');

    switch (mainCmd) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Available commands:' });
        newHistory.push({ type: 'output', text: '  about      - Display background details' });
        newHistory.push({ type: 'output', text: '  skills     - View core technology checklist' });
        newHistory.push({ type: 'output', text: '  projects   - Show details of featured applications' });
        newHistory.push({ type: 'output', text: '  contact    - Print direct channels & coordinates' });
        newHistory.push({ type: 'output', text: '  theme <c>  - Set site glow accent (iris/violet, sage/green, sand/amber, rust/rose, slate/grey)' });
        newHistory.push({ type: 'output', text: '  neofetch   - Show custom developer system specs' });
        newHistory.push({ type: 'output', text: '  clear      - Wipe terminal history' });
        newHistory.push({ type: 'output', text: '  exit       - Close shell drawer' });
        break;
      case 'about':
        newHistory.push({ type: 'output', text: 'Muhammed Faizal M - Software Developer specializing in Flutter, Dart, & Clean Architecture.' });
        newHistory.push({ type: 'output', text: 'Experience: 1.5+ Years building robust commercial cross-platform interfaces.' });
        break;
      case 'skills':
        newHistory.push({ type: 'output', text: 'Core Tech Tree:' });
        newHistory.push({ type: 'output', text: '  ├─ Languages: Dart, Java, C, JavaScript' });
        newHistory.push({ type: 'output', text: '  ├─ Frameworks: Flutter (iOS/Android), HTML, CSS' });
        newHistory.push({ type: 'output', text: '  ├─ Databases: Firestore, Hive, SQLite, MySQL' });
        newHistory.push({ type: 'output', text: '  └─ States: BLoC / Cubit, GetX, Provider' });
        break;
      case 'projects':
        newHistory.push({ type: 'output', text: 'Major Applications Published:' });
        newHistory.push({ type: 'output', text: '  • Blessing App      - Islamic lifestyle scheduler & logs' });
        newHistory.push({ type: 'output', text: '  • NCC Management App- Cadet tracking system' });
        newHistory.push({ type: 'output', text: '  • Expenxo           - Privacy first local budget ledger' });
        newHistory.push({ type: 'output', text: '  • Chatifly          - Realtime chat channels' });
        newHistory.push({ type: 'output', text: '  • AutoResQ          - Emergency roadside assist & routing' });
        break;
      case 'contact':
        newHistory.push({ type: 'output', text: 'Direct Contacts:' });
        newHistory.push({ type: 'output', text: '  Phone:    +91 8075374600' });
        newHistory.push({ type: 'output', text: '  Email:    mhdfaizalofficial@gmail.com' });
        newHistory.push({ type: 'output', text: '  GitHub:   github.com/mhdfaizal03' });
        newHistory.push({ type: 'output', text: '  LinkedIn: linkedin.com/in/mhdfaizal' });
        break;
      case 'theme':
        if (!arg) {
          newHistory.push({ type: 'error', text: 'Error: Please specify a color. (e.g. "theme emerald" or "theme azure")' });
        } else {
          let targetTheme = arg.toLowerCase();
          const mappings = {
            green: 'emerald',
            emerald: 'emerald',
            blue: 'azure',
            cyan: 'azure',
            sky: 'azure',
            yellow: 'amber',
            amber: 'amber',
            gold: 'amber',
            red: 'crimson',
            rose: 'crimson',
            silver: 'monochrome',
            grey: 'monochrome',
            gray: 'monochrome'
          };
          if (mappings[targetTheme]) {
            targetTheme = mappings[targetTheme];
          }
          const matchedTheme = THEMES.find(t => t.name.toLowerCase() === targetTheme);
          if (matchedTheme) {
            setAccent(matchedTheme.name);
            newHistory.push({ type: 'output', text: `Success: Glow tint switched to ${matchedTheme.name}.` });
          } else {
            newHistory.push({ type: 'error', text: `Error: Unknown tint color "${arg}". Try: emerald, azure, amber, crimson, monochrome.` });
          }
        }
        break;
      case 'neofetch':
        newHistory.push({
          type: 'output', text: `      /\\
     /  \\       Muhammed Faizal M
    /\\  /       -----------------
   /  \\/        OS: Flutter / Cross-Platform
  /\\  /\\        Uptime: 1.5+ Years Experience
 /  \\/  \\       Theme: ${accent} Mode
/___/\\___\\      Status: Open for Hire (Immediate)`
        });
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'exit':
        setTerminalOpen(false);
        setTerminalInput('');
        return;
      default:
        newHistory.push({ type: 'error', text: `Command not found: "${mainCmd}". Type "help" for options.` });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  return (
    <div className="min-h-dvh relative overflow-x-clip font-sans bg-slate-50 dark:bg-[#09090b] text-slate-800 dark:text-slate-200">
      {/* Custom Mouse Cursors */}
      <CustomCursor cursorTheme={cursorTheme} mousePos={mousePos} isHovering={isHovering} />

      {/* Ambient Grid Background */}
      <BackgroundGrid />

      {/* Navigation Header */}
      <Navbar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        accent={accent}
        setAccent={setAccent}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        cursorTheme={cursorTheme}
        setCursorTheme={setCursorTheme}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setShowResume={setShowResume}
        setIsHovering={setIsHovering}
      />

      {/* Main Page Sections */}
      <main>
        <HeroAboutSection
          aboutTab={aboutTab}
          setAboutTab={setAboutTab}
          isPortraitLoaded={isPortraitLoaded}
          setIsPortraitLoaded={setIsPortraitLoaded}
          setShowResume={setShowResume}
          setIsHovering={setIsHovering}
        />

        <SkillsSection />

        <ExperienceSection
          activeExp={activeExp}
          setActiveExp={setActiveExp}
          setIsHovering={setIsHovering}
        />

        <ProjectsSection
          projectFilter={projectFilter}
          setProjectFilter={setProjectFilter}
          projectPlatforms={projectPlatforms}
          togglePlatform={togglePlatform}
          setSelectedProject={setSelectedProject}
          setIsHovering={setIsHovering}
        />

        <ContactSection
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          isSubmitting={isSubmitting}
          handleContactSubmit={handleContactSubmit}
          setIsHovering={setIsHovering}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ResumeModal
        showResume={showResume}
        setShowResume={setShowResume}
        setIsHovering={setIsHovering}
      />

      <ProjectModal
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        modalTab={modalTab}
        setModalTab={setModalTab}
        activeArchLayer={activeArchLayer}
        setActiveArchLayer={setActiveArchLayer}
        projectPlatforms={projectPlatforms}
        togglePlatform={togglePlatform}
        setIsHovering={setIsHovering}
      />

      <TerminalDrawer
        terminalOpen={terminalOpen}
        setTerminalOpen={setTerminalOpen}
        terminalHistory={terminalHistory}
        terminalInput={terminalInput}
        setTerminalInput={setTerminalInput}
        handleTerminalSubmit={handleTerminalSubmit}
        terminalBottomRef={terminalBottomRef}
        setIsHovering={setIsHovering}
      />

      {/* Floating Success Toast Alert */}
      <Toast showToast={showToast} />
    </div>
  );
}
