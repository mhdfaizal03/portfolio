import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Mail, ExternalLink, Phone,
  Code2, Smartphone, Database, Layers, Send,
  Briefcase, GraduationCap, CheckCircle2, Sparkles, User, Settings, LayoutGrid, X,
  ArrowUpRight, Cpu, Eye, Check, RefreshCw, FileText, Download, Award, ShieldCheck, MapPin, Terminal as TerminalIcon
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import cvFile from './assets/Muhammed_Faizal_CV.pdf';
import meImg from './assets/me.png';

// Theme Presets
const THEMES = [
  { name: 'Iris', rgb: '168, 85, 247', hex: '#a855f7', class: 'bg-purple-500' },
  { name: 'Sage', rgb: '34, 197, 94', hex: '#22c55e', class: 'bg-green-500' },
  { name: 'Sand', rgb: '234, 179, 8', hex: '#eab308', class: 'bg-yellow-500' },
  { name: 'Rust', rgb: '239, 68, 68', hex: '#ef4444', class: 'bg-red-500' },
  { name: 'Slate', rgb: '244, 244, 245', hex: '#f4f4f5', class: 'bg-slate-600 dark:bg-zinc-200' },
];

// Helper function to apply syntax highlighting to Dart code snippets in the visualizer
const highlightDartCode = (code) => {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Highlight comments (greyish-green italic)
  html = html.replace(/(\/\/.*)/g, '<span class="text-slate-500/80 dark:text-zinc-500 italic font-sans">$1</span>');

  // Highlight decorators/annotations (like @override) (yellow/amber)
  html = html.replace(/(@\w+)/g, '<span class="text-amber-500 font-medium">$1</span>');

  // Highlight strings (amber/orange-like)
  html = html.replace(/(['"].*?['"])/g, '<span class="text-amber-300 font-mono">$1</span>');

  // Highlight keywords (purple)
  const keywords = ['class', 'final', 'abstract', 'implements', 'extends', 'async', 'await', 'return', 'required', 'get', 'set', 'const', 'import'];
  keywords.forEach(kw => {
    html = html.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span class="text-purple-400 font-bold">${kw}</span>`);
  });

  // Highlight types (emerald/green)
  const types = ['Bloc', 'UseCase', 'MapRepository', 'MapRepositoryImpl', 'FetchMechanicsUseCase', 'MapRemoteDataSource', 'NetworkInfo', 'Future', 'Either', 'Failure', 'List', 'Mechanic', 'LocationParams', 'ServerException', 'ServerFailure', 'CacheFailure'];
  types.forEach(ty => {
    html = html.replace(new RegExp(`\\b${ty}\\b`, 'g'), `<span class="text-emerald-400 font-semibold">${ty}</span>`);
  });

  return <code dangerouslySetInnerHTML={{ __html: html }} />;
};

export default function App() {
  // Theme State
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('faizal-portfolio-accent') || 'Iris';
  });
  const [isPortraitLoaded, setIsPortraitLoaded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('faizal-portfolio-theme');
    if (saved) return saved === 'dark';
    return true; // Default to dark mode
  });
  const [cursorTheme, setCursorTheme] = useState(() => {
    const savedTheme = localStorage.getItem('faizal-portfolio-cursor-theme');
    if (savedTheme) return JSON.parse(savedTheme);
    const savedBool = localStorage.getItem('faizal-portfolio-use-cursor');
    if (savedBool === 'true') return 'developer';
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
    const saved = localStorage.getItem('faizal-portfolio-contact-draft');
    return saved ? JSON.parse(saved) : { name: '', email: '', subject: '', message: '' };
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
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
    localStorage.setItem('faizal-portfolio-accent', accent);
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
    // Simulate sending API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setShowToast(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      localStorage.removeItem('faizal-portfolio-contact-draft');

      // Auto close toast
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
          newHistory.push({ type: 'error', text: 'Error: Please specify a color. (e.g. "theme violet")' });
        } else {
          let targetTheme = arg.toLowerCase();
          const mappings = {
            violet: 'iris',
            purple: 'iris',
            green: 'sage',
            emerald: 'sage',
            yellow: 'sand',
            amber: 'sand',
            red: 'rust',
            rose: 'rust',
            grey: 'slate',
            gray: 'slate'
          };
          if (mappings[targetTheme]) {
            targetTheme = mappings[targetTheme];
          }
          const matchedTheme = THEMES.find(t => t.name.toLowerCase() === targetTheme);
          if (matchedTheme) {
            setAccent(matchedTheme.name);
            newHistory.push({ type: 'output', text: `Success: Glow tint switched to ${matchedTheme.name}.` });
          } else {
            newHistory.push({ type: 'error', text: `Error: Unknown tint color "${arg}". Try: iris, sage, sand, rust, slate (or violet, green, amber, rose, grey).` });
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
/___/\\___\\      Status: Open for Hire (Immediate)` });
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

  // Projects Data
  const projects = [
    {
      id: "blessing",
      title: "Blessing App",
      category: "Mobile App",
      desc: "Islamic Lifestyle Companion featuring prayer tracking, fasting logs, and Quran module.",
      detailDesc: "Blessing App is a responsive Islamic lifestyle application. It features automated offline-ready calculations for prayer timings, local notifications reminders, Quran study sections, and fasting charts. Engineered with a strict isolating Clean Architecture structure.",
      tech: ["Flutter", "Firebase", "Local Notifications", "Location Services", "Clean Architecture"],
      impact: "Enabled 2,000+ downloads, providing precise timing sync and automated alert reminders.",
      role: "Lead Developer (Engineered calculations engine, SQLite data tracking, and notification tasks)",
      github: "https://github.com/mhdfaizal03",
      live: "https://github.com/mhdfaizal03",
      mockupType: "blessing"
    },
    {
      id: "ncc",
      title: "NCC Management App",
      category: "Management System",
      desc: "Communication and attendance tracking roster for Cadets & Officers.",
      detailDesc: "Designed specifically to modernise battalion operations, this NCC utility handles officer-guided attendance logs, real-time Cadet-to-Officer announcements, role-level permissions, and persistent databases for remote conditions.",
      tech: ["Flutter", "Firebase Firestore", "Authentication System", "Cloud Messaging"],
      impact: "Reduced operational coordination delays by 80%, handling check-in records for over 500 cadets.",
      role: "Full-Stack Developer (Structured Firestore schema, security rules, and Cadet rosters)",
      github: "https://github.com/mhdfaizal03",
      live: "https://github.com/mhdfaizal03",
      mockupType: "ncc"
    },
    {
      id: "expenxo",
      title: "Expenxo",
      category: "Finance",
      desc: "Personal Expense Tracker with clean custom charts, data summaries, and offline storage.",
      detailDesc: "Expenxo is a privacy-focused financial notebook. It runs fully offline using high-performance Hive local databases, tracks daily/monthly allocations, and visualizes expense splits in clean vector charts.",
      tech: ["Flutter", "Hive", "SQLite", "Data Visualization", "BLoC Pattern"],
      impact: "Rated 4.8/5 in private beta testing. Assisted users in saving an average of 15% on monthly budgets.",
      role: "Solo Developer (Developed customized charting engine, SQLite schemas, and state engine)",
      github: "https://github.com/mhdfaizal03",
      live: "https://github.com/mhdfaizal03",
      mockupType: "expenxo"
    },
    {
      id: "chatifly",
      title: "Chatifly",
      category: "Communication",
      desc: "Real-time chat application with cloud messaging alerts and responsive group channels.",
      detailDesc: "A secure chat platform implementing web-sockets and Firestore triggers. It features fast loading chat histories, dynamic presence counters, typing notifications, image cache-loading, and encrypted channel communications.",
      tech: ["Flutter", "Firebase Authentication", "Firestore", "Firebase Cloud Messaging", "GetX"],
      impact: "Achieved sub-100ms message sync with minimal battery drain on long-standing connections.",
      role: "Lead Flutter Developer (Created real-time sync systems, presence checks, and push alerts)",
      github: "https://github.com/mhdfaizal03",
      live: "https://github.com/mhdfaizal03",
      mockupType: "chatifly"
    },
    {
      id: "autoresq",
      title: "AutoResQ",
      category: "Mobile App",
      desc: "Emergency roadside assistance app with live maps routing and mechanic finder.",
      detailDesc: "AutoResQ links stranded drivers with mechanics in proximity. It integrates Google Maps API to draw route markers, computes live tracking, features click-to-trigger SOS alarms, and synchronizes status details over Firebase sockets.",
      tech: ["Flutter", "Google Maps API", "Firebase", "Location Services", "REST APIs"],
      impact: "Provided mock response times under 5 minutes for distress coordination, resolving roadside assistance mockups.",
      role: "Solo App Engineer (Integrated location services, maps layer markers, and SOS alert notifications)",
      github: "https://github.com/mhdfaizal03",
      live: "https://github.com/mhdfaizal03",
      mockupType: "autoresq"
    }
  ];

  // Mini Projects Data
  const miniProjects = [
    { name: "Musico", desc: "A sleek local audio player interface with responsive controls.", tech: "Flutter" },
    { name: "QR Scanner", desc: "Fast QR code scanning, generator, and URL redirection utility.", tech: "Flutter / Mobile" },
    { name: "Language Translator", desc: "Local database dictionary translations using Google APIs.", tech: "Flutter / REST API" },
    { name: "Weather App", desc: "Location forecast app displaying weather attributes in custom metrics.", tech: "Flutter / APIs" },
    { name: "Encrypta", desc: "Cryptographic text hasher storing algorithms using AES keys.", tech: "Dart" },
    { name: "Currency Converter", desc: "Dynamic foreign exchange calculator syncing live rates.", tech: "Flutter / JSON" },
    { name: "Bingo Game", desc: "Classic bingo board game with local state and multiplier calculations.", tech: "Flutter" }
  ];

  // Experience Data
  const experiences = [
    {
      role: "Software Developer (Flutter)",
      company: "Softroniics Technologies",
      period: "September 2024 – Present",
      location: "Calicut, India",
      bullets: [
        "Architect and maintain mobile applications in Flutter using Clean Architecture structures.",
        "Implement state management patterns (GetX, Provider, BLoC) to ensure responsive rendering.",
        "Integrate Firebase Suite services (Auth, Firestore, Cloud Messaging) and secure RESTful backend APIs.",
        "Collaborate with designers via Figma assets and deliver features in agile sprints."
      ],
      impact: "Led production launch of 3 cross-platform mobile apps, garnering 4.7+ average App Store ratings.",
      tech: ["Flutter", "Dart", "BLoC", "REST APIs", "Git", "Clean Architecture", "CI/CD"]
    },
    {
      role: "Flutter Developer Intern",
      company: "Mentorow Technologies",
      period: "Feb 2024 – July 2024",
      location: "Kochi, Kerala, India",
      bullets: [
        "Constructed reusable UI components from Figma mockups, adhering strictly to responsive layouts.",
        "Learned and implemented Firebase backend APIs and local storage structures.",
        "Collaborated with backend engineers to consume RESTful endpoints.",
        "Applied Clean Architecture models to optimize project layouts."
      ],
      impact: "Created 15+ complex UI modules that were integrated directly into the flagship client product.",
      tech: ["Flutter", "Dart", "Hive", "SQLite", "Figma", "Provider State Management"]
    }
  ];

  const stats = [
    { value: "1.5+", label: "Years Exp" },
    { value: "12+", label: "Projects Completed" },
    { value: "5+", label: "Apps Published" },
    { value: "99%", label: "Code Quality Rating" }
  ];

  // Clean Architecture Layer Mock Code Snippets
  const archLayers = {
    presentation: {
      title: "Presentation Layer (UI & BLoC/GetX State)",
      desc: "Handles user interface components, layout rendering, animations, and captures events that trigger BLoC / GetX states. No business rules reside here.",
      code: `// Presentation: Reactive BLoC event triggers
class RequestAssistantBloc extends Bloc<ResqEvent, ResqState> {
  final FetchMechanicsUseCase getMechanics;

  RequestAssistantBloc(this.getMechanics) : super(ResqInitial()) {
    on<TriggerSOSAlert>((event, emit) async {
      emit(ResqLoading());
      final result = await getMechanics(
        LocationParams(lat: event.lat, lng: event.lng),
      );
      result.fold(
        (failure) => emit(ResqError(failure.message)),
        (mechanics) => emit(ResqActiveSOS(mechanics)),
      );
    });
  }
}`
    },
    domain: {
      title: "Domain Layer (Entities & Use Cases)",
      desc: "The absolute core of the app. It holds business rules, entity models, and abstract repository definitions. Written in pure Dart with ZERO external library dependencies.",
      code: `// Domain: Pure business contract & use case
abstract class MapRepository {
  Future<Either<Failure, List<Mechanic>>> findNearby(double lat, double lng);
}

class FetchMechanicsUseCase implements UseCase<List<Mechanic>, LocationParams> {
  final MapRepository repository;
  
  FetchMechanicsUseCase(this.repository);

  @override
  Future<Either<Failure, List<Mechanic>>> call(LocationParams params) async {
    // Business logic: filter, coordinate validation, then fetch
    return await repository.findNearby(params.lat, params.lng);
  }
}`
    },
    data: {
      title: "Data Layer (Repositories & Data Sources)",
      desc: "Fetches payload JSONs from REST APIs or local databases (SQLite/Hive) and maps them into models. Implements the Repository contract declared in the Domain layer.",
      code: `// Data: Repository Implementation mapping payload details
class MapRepositoryImpl implements MapRepository {
  final MapRemoteDataSource remoteDataSource;
  final NetworkInfo networkInfo;

  MapRepositoryImpl({required this.remoteDataSource, required this.networkInfo});

  @override
  Future<Either<Failure, List<Mechanic>>> findNearby(double lat, double lng) async {
    if (await networkInfo.isConnected) {
      try {
        final rawModels = await remoteDataSource.getMechanicsList(lat, lng);
        return Right(rawModels); // Valid response mapping
      } on ServerException {
        return Left(ServerFailure("Server communication failed"));
      }
    } else {
      return Left(CacheFailure("Offline mode active"));
    }
  }
}`
    }
  };

  // Toggle Project Platform Switcher
  const togglePlatform = (id) => {
    setProjectPlatforms(prev => ({
      ...prev,
      [id]: prev[id] === 'iOS' ? 'Android' : 'iOS'
    }));
  };

  // Render SVG Screen Mockups for the phones
  const renderPhoneScreen = (type, plat) => {
    const isIOS = plat === 'iOS';

    switch (type) {
      case 'blessing':
        return (
          <div className="flex flex-col h-full p-2 justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
            {/* Custom App Bar */}
            <div className={`flex items-center border-b border-slate-300 dark:border-zinc-900 pb-1.5 mb-2 ${isIOS ? 'justify-center' : 'justify-start'}`}>
              <span className="font-bold text-[8.5px] tracking-wide text-accent">Blessing Companion</span>
            </div>

            <div className="border border-accent/20 rounded-lg p-1.5 mb-2 shadow-sm text-center bg-white/80 dark:bg-zinc-900/60">
              <span className="text-[6.5px] block text-slate-500 dark:text-slate-400">Fast Tracker</span>
              <span className="font-bold text-[9px] text-accent">Ramadan Day 18</span>
              <div className="w-full h-1 rounded-full mt-1 overflow-hidden bg-slate-200 dark:bg-zinc-800">
                <div className="bg-accent h-full w-[70%]" />
              </div>
            </div>

            <div className="space-y-1 overflow-y-auto scrollbar-none flex-1">
              <div className="border rounded p-1 flex justify-between items-center bg-white/60 dark:bg-zinc-900/40 border-slate-300 dark:border-zinc-900">
                <span className="text-[6.5px] font-semibold text-slate-500 dark:text-slate-400">Fajr</span>
                <span className="text-[6.5px] text-accent font-mono">04:45 AM</span>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded p-1 flex justify-between items-center">
                <span className="text-[6.5px] font-semibold text-slate-800 dark:text-slate-200">Dhuhr</span>
                <span className="text-[6.5px] text-accent font-mono">12:20 PM</span>
              </div>
              <div className="border rounded p-1 flex justify-between items-center bg-white/60 dark:bg-zinc-900/40 border-slate-300 dark:border-zinc-900">
                <span className="text-[6.5px] font-semibold text-slate-500 dark:text-slate-400">Asr</span>
                <span className="text-[6.5px] text-accent font-mono">03:32 PM</span>
              </div>
            </div>

            {/* Custom Platform Switch Widget inside mockup */}
            <div className="mt-2 flex items-center justify-between p-1 rounded border bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
              <span className="text-[5.5px] text-slate-500 dark:text-slate-400">Silent Mode</span>
              {isIOS ? (
                // Cupertino Toggle
                <div className="w-5 h-3 bg-accent rounded-full p-0.5 flex justify-end cursor-pointer">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              ) : (
                // Material Toggle
                <div className="w-5 h-2 bg-accent/20 rounded-full relative flex items-center cursor-pointer">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full absolute right-0" />
                </div>
              )}
            </div>
          </div>
        );
      case 'ncc':
        return (
          <div className="flex flex-col h-full p-2 justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
            {/* Custom App Bar */}
            <div className={`flex items-center border-b border-slate-300 dark:border-zinc-900 pb-1.5 mb-2 ${isIOS ? 'justify-center' : 'justify-start'}`}>
              <span className="font-bold text-[8.5px] tracking-wide text-accent">NCC Cadets</span>
            </div>

            <div className="flex space-x-1 mb-2">
              <div className={`border p-1 flex-1 text-center ${isIOS ? 'bg-white dark:bg-white/60 dark:bg-zinc-900/40 border-slate-300 dark:border-zinc-900 rounded-lg' : 'bg-transparent border-accent/20 rounded'}`}>
                <span className="text-[6px] block text-slate-600 dark:text-slate-500 text-slate-500 dark:text-slate-400">Cadets</span>
                <span className="font-bold text-[9px] text-accent">542</span>
              </div>
              <div className={`border p-1 flex-1 text-center ${isIOS ? 'bg-white dark:bg-white/60 dark:bg-zinc-900/40 border-slate-300 dark:border-zinc-900 rounded-lg' : 'bg-transparent border-slate-300 dark:border-zinc-800 rounded'}`}>
                <span className="text-[6px] block text-slate-600 dark:text-slate-500 text-slate-500 dark:text-slate-400">Roster</span>
                <span className="font-bold text-[9px] text-accent">92%</span>
              </div>
            </div>

            <div className="space-y-1.5 flex-1 overflow-y-auto scrollbar-none">
              <span className="text-[5.5px] text-accent font-mono block">RECENT NOTICES</span>
              <div className={`bg-white dark:bg-zinc-900 border-l-2 p-1 border-accent rounded-r-lg`}>
                <span className="text-[7px] font-bold block text-zinc-900 dark:text-white">Morning Parade</span>
                <p className="text-[5.5px] text-slate-500 dark:text-slate-400">Parade scheduled for 06:00 AM.</p>
              </div>
            </div>

            {/* Custom Platform Button */}
            <button className={`w-full py-1 text-center text-[7px] font-bold mt-2 ${isIOS
              ? 'bg-accent/10 border border-accent/30 text-accent rounded-lg'
              : 'bg-accent text-slate-50 dark:text-zinc-950 rounded'
              }`}>
              Open Roster Board
            </button>
          </div>
        );
      case 'expenxo':
        return (
          <div className="flex flex-col h-full p-2 justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
            {/* Custom App Bar */}
            <div className={`flex items-center border-b border-slate-300 dark:border-zinc-900 pb-1.5 mb-2 ${isIOS ? 'justify-center' : 'justify-start'}`}>
              <span className="font-bold text-[8.5px] tracking-wide text-accent font-heading">Expenxo Cash</span>
            </div>

            <div className="text-center py-2 border rounded-lg mb-2 bg-white/80 dark:bg-zinc-900/60 border-slate-300 dark:border-zinc-900">
              <span className="text-[5.5px] block font-mono text-slate-600 dark:text-slate-500 text-slate-500 dark:text-slate-400">Week Budget Status</span>
              <span className="font-bold text-xs font-mono text-zinc-900 dark:text-white">$142.50</span>
            </div>

            {/* Charts */}
            <div className="flex items-center space-x-1.5 p-1.5 rounded-lg border mb-2 flex-1 bg-white/40 dark:bg-zinc-900/30 border-slate-300 dark:border-zinc-900">
              <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0 animate-spin-slow">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--accent-color)" strokeWidth="3" strokeDasharray="70, 30" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--accent-color)" strokeWidth="3" strokeDasharray="30, 70" strokeDashoffset="70" className="opacity-30" />
              </svg>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center text-[5.5px]">
                  <span className="font-medium text-slate-500 dark:text-slate-400">Food split</span>
                  <span className="font-bold font-mono text-accent">$85.50</span>
                </div>
                <div className="flex justify-between items-center text-[5.5px]">
                  <span className="font-medium text-slate-500 dark:text-slate-400">Travel split</span>
                  <span className="font-bold font-mono text-accent/85">$37.00</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isIOS ? (
              <div className="flex justify-between items-center p-1 rounded-lg border bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
                <span className="text-[6px] text-slate-600 dark:text-slate-500 text-slate-500 dark:text-slate-400">Insert Entry</span>
                <span className="text-[9px] text-accent font-bold leading-none cursor-pointer">+</span>
              </div>
            ) : (
              // Android Floating Action Button (FAB) simulator
              <div className="flex justify-end pr-1 pb-1">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center font-bold text-xs shadow-lg leading-none cursor-pointer text-slate-50 dark:text-zinc-950">
                  +
                </div>
              </div>
            )}
          </div>
        );
      case 'chatifly':
        return (
          <div className="flex flex-col h-full p-2 justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
            {/* Custom App Bar */}
            <div className={`flex items-center border-b border-slate-300 dark:border-zinc-900 pb-1.5 mb-2 ${isIOS ? 'justify-center' : 'justify-start'}`}>
              <span className="font-bold text-[8.5px] tracking-wide text-accent">Chatifly Channel</span>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto scrollbar-none flex flex-col justify-end">
              <div className={`text-slate-600 dark:text-slate-350 p-1.5 text-[6.5px] max-w-[80%] self-start border ${isIOS
                ? 'bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800 rounded-2xl rounded-bl-sm'
                : 'bg-white dark:bg-white/70 dark:bg-zinc-900/50 border-slate-300 dark:border-zinc-800 rounded rounded-bl-none'
                }`}>
                Hey! Is Chatifly scalable?
              </div>
              <div className={`font-medium p-1.5 text-[6.5px] max-w-[80%] self-end ${isIOS
                ? 'bg-accent text-slate-50 dark:text-zinc-950 rounded-2xl rounded-br-sm'
                : 'bg-accent/90 text-slate-50 dark:text-zinc-950 rounded rounded-br-none'
                }`}>
                Yes, built on FCM. Syncs sub-100ms!
              </div>
            </div>

            <div className="mt-2 border rounded-lg p-1 flex items-center justify-between bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
              <span className="text-[5.5px] text-slate-600 dark:text-slate-500 text-slate-500 dark:text-slate-400">Channels list</span>
            </div>
          </div>
        );
      case 'autoresq':
        return (
          <div className="flex flex-col h-full p-2 justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
            {/* Custom App Bar */}
            <div className={`flex items-center border-b border-slate-300 dark:border-zinc-900 pb-1.5 mb-2 ${isIOS ? 'justify-center' : 'justify-start'}`}>
              <span className="font-bold text-[8.5px] tracking-wide text-accent font-heading">AutoResQ SOS</span>
            </div>

            {/* Custom Google Maps Vector mockup */}
            <div className="border rounded-lg relative h-[100px] w-full overflow-hidden bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-slate-500 dark:text-slate-400 text-slate-400 dark:text-slate-700">
                <line x1="10" y1="0" x2="10" y2="100" stroke="#27272a" strokeWidth="2" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="#27272a" strokeWidth="2" />
                <line x1="0" y1="30" x2="100" y2="30" stroke="#27272a" strokeWidth="2" />
                {/* Route */}
                <path d="M10,70 L50,70 L50,30 L80,30" fill="none" stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="round" />
                {/* User point */}
                <circle cx="10" cy="70" r="3.5" fill="var(--accent-color)" />
                {/* Mechanic point */}
                <circle cx="80" cy="30" r="3.5" fill="var(--accent-color)" className="opacity-60" />
              </svg>
            </div>

            {/* SOS Button */}
            <div className="mt-2 text-center">
              {isIOS ? (
                <button className="w-full py-1 bg-accent rounded-2xl text-[6.5px] font-bold border border-accent/20 shadow-md text-slate-50 dark:text-zinc-950">
                  TRIGGER EMERGENCY
                </button>
              ) : (
                <button className="w-full py-1 bg-accent rounded text-[6.5px] font-bold shadow-lg text-slate-50 dark:text-zinc-950">
                  SOS ROADSIDE
                </button>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-dvh relative overflow-x-hidden font-sans bg-slate-50 dark:bg-[#09090b] text-slate-800 dark:text-slate-200">

      {/* Dynamic Style to hide default cursor when useCustomCursor is active */}
      {/* Dynamic Style to hide default cursor when custom cursor is active */}
      {cursorTheme !== 'default' && (
        <style>{`
          @media (min-width: 768px) {
            * {
              cursor: none !important;
            }
          }
        `}</style>
      )}

      {/* Custom Mouse Cursor (Hardware Accelerated) */}
      {cursorTheme === 'developer' && (
        <>
          <div
            className={`cursor-ring hidden md:block ${isHovering ? 'cursor-ring-hover' : ''}`}
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          />
          <div
            className="cursor-dot hidden md:block"
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          />
          <div
            className="cursor-coords hidden md:block"
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          >
            {Math.round(mousePos.x)},{Math.round(mousePos.y)}
          </div>
        </>
      )}

      {cursorTheme === 'aura' && (
        <>
          <div
            className={`cursor-aura hidden md:block ${isHovering ? 'cursor-aura-hover' : ''}`}
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          />
          <div
            className="cursor-aura-dot hidden md:block"
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          />
        </>
      )}

      {cursorTheme === 'crosshair' && (
        <div
          className={`cursor-crosshair hidden md:block ${isHovering ? 'cursor-crosshair-hover' : ''}`}
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        >
          <div className="cursor-crosshair-center" />
        </div>
      )}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0 opacity-40" />

      {/* Structural Vertical/Horizontal Grid Lines for Blueprint Aesthetic */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left vertical border for main container */}
        <div className="absolute left-[calc(50%-36rem)] top-0 w-[1px] h-full hidden xl:block bg-white/40 dark:bg-zinc-900/30" />
        {/* Right vertical border for main container */}
        <div className="absolute right-[calc(50%-36rem)] top-0 w-[1px] h-full hidden xl:block bg-white/40 dark:bg-zinc-900/30" />
        {/* Subtle horizontal dividing line */}
        <div className="absolute top-[80px] left-0 w-full h-[1px] bg-white/40 dark:bg-zinc-900/30" />
      </div>

      {/* Top Floating Glow Lights */}
      <div className="absolute top-[-10%] left-[20%] w-[45vw] h-[45vh] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[35vw] h-[35vh] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Fixed Sticky Header */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 bg-slate-50/75 dark:bg-[#09090b]/75 border-slate-300/80 dark:border-zinc-900/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <a
            href="#"
            className="text-2xl font-black bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent tracking-tight font-heading flex items-center space-x-1.5"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span>FM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 text-xs font-semibold tracking-widest uppercase">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(section => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className={`transition-colors duration-300 py-1 border-b-2 hover:text-zinc-900 dark:text-white ${activeNav === section.toLowerCase() ? 'border-accent text-zinc-900 dark:text-white' : 'border-transparent text-slate-600 dark:text-slate-400'
                  }`}
                onClick={() => setActiveNav(section.toLowerCase())}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {section}
              </a>
            ))}
          </div>

          {/* Accent Settings & Menu Controls */}
          <div className="flex items-center space-x-4">

            {/* Theme Accent Settings Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 border hover:border-slate-300 rounded-lg hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer border-slate-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 text-slate-500 dark:text-slate-400"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                title="Theme Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 border rounded-xl p-4 shadow-2xl z-50 space-y-4 bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800"
                  >
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase block mb-2 font-mono text-slate-500 dark:text-slate-400">00.1 // PALETTE</span>
                      <div className="grid grid-cols-5 gap-2">
                        {THEMES.map(theme => (
                          <button
                            key={theme.name}
                            onClick={() => {
                              setAccent(theme.name);
                            }}
                            className={`w-6 h-6 rounded-full cursor-pointer transition-all border ${accent === theme.name ? 'scale-125 border-slate-500 dark:border-zinc-400 shadow-lg' : 'border-slate-300 dark:border-zinc-800 hover:scale-115'
                              } ${theme.class}`}
                            title={theme.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-3 space-y-3 border-slate-300 dark:border-zinc-850">
                      <label className="flex items-center space-x-2.5 cursor-pointer text-[10px] font-bold tracking-wider uppercase font-mono text-slate-500 dark:text-slate-400">
                        <input
                          type="checkbox"
                          checked={isDarkMode}
                          onChange={(e) => setIsDarkMode(e.target.checked)}
                          className="rounded text-accent focus:ring-accent w-3.5 h-3.5 border-slate-300 dark:border-zinc-800 bg-slate-100 dark:bg-slate-950"
                        />
                        <span>00.2 // DARK MODE</span>
                      </label>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-wider uppercase font-mono text-slate-500 dark:text-slate-400">00.3 // CURSOR THEME</span>
                        <select
                          value={cursorTheme}
                          onChange={(e) => setCursorTheme(e.target.value)}
                          className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-slate-300 text-[9px] font-mono p-1 rounded cursor-pointer outline-none focus:border-accent appearance-none pr-4"
                          style={{
                            backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2371717a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.3rem top 50%',
                            backgroundSize: '0.45rem auto'
                          }}
                        >
                          <option value="default">DEFAULT</option>
                          <option value="developer">DEVELOPER</option>
                          <option value="aura">AURA GLOW</option>
                          <option value="crosshair">CROSSHAIR</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resume Button */}
            <button
              onClick={() => setShowResume(true)}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 border border-accent/30 hover:border-accent text-accent hover:bg-accent/10 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t backdrop-blur-lg px-6 py-4 space-y-3 border-slate-300 dark:border-zinc-800 bg-slate-50/95 dark:bg-[#09090b]/95"
            >
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(section => (
                <a
                  key={section}
                  href={`#${section.toLowerCase()}`}
                  onClick={() => {
                    setActiveNav(section.toLowerCase());
                    setMobileMenuOpen(false);
                  }}
                  className={`block font-medium text-sm py-1.5 transition-colors duration-200 ${
                    activeNav === section.toLowerCase()
                      ? 'text-accent dark:text-accent font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {section}
                </a>
              ))}
              <button
                onClick={() => {
                  setShowResume(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full justify-center py-2.5 border border-accent/30 text-accent rounded-lg font-bold text-xs"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative pt-36 pb-20 px-6 z-10 overflow-hidden min-h-[90dvh] flex items-center">
        {/* Background Image with Opacity */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img src={meImg} alt="Hero Background" className="w-full h-full object-cover object-top origin-top scale-[1.15] opacity-30 dark:opacity-15 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-[#09090b]/80 dark:to-[#09090b]" />
        </div>
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6 order-last lg:order-first">

            {/* Profile Label */}
            <div className="space-y-1">
              <span className="text-accent font-mono font-bold tracking-widest text-xs uppercase block">01 // PROFILE</span>
            </div>

            {/* Hiring Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse" />
              <span>Status: Active for Hire</span>
            </motion.div>

            {/* Title & Introduction */}
            <div className="space-y-2">
              <h4 className="font-mono font-bold tracking-widest text-sm uppercase text-slate-500 dark:text-slate-400">Muhammed Faizal M</h4>
              <h1 className="text-4xl sm:text-6xl font-black leading-tight font-heading text-zinc-900 dark:text-white">
                Building fluid <br />
                <span className="bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent">
                  Mobile Experiences
                </span>
              </h1>

              <h3 className="text-xl sm:text-2xl font-bold font-heading min-h-[60px] sm:min-h-[40px] flex items-center justify-center lg:justify-start text-slate-500 dark:text-slate-400">
                Specializing in{' '}
                <span className="text-accent ml-2">
                  <Typewriter
                    words={['Flutter Applications', 'Clean Architecture Design', 'Responsive UI/UX solutions']}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    cursorColor="var(--accent-color)"
                  />
                </span>
              </h3>
            </div>

            {/* Description Bio */}
            <p className="text-base leading-relaxed max-w-xl mx-auto lg:mx-0 text-slate-500 dark:text-slate-400">
              Results-driven <strong className="text-zinc-900 dark:text-white">Flutter Developer</strong> with experience in building scalable, high-performance cross-platform mobile applications using Flutter and Dart. Strong expertise in Clean Architecture, reactive state management (GetX, Provider, BLoC), and Firebase ecosystem integration.
            </p>

            {/* Actions Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#contact"
                className="px-6 py-3 bg-accent hover:bg-accent-hover font-bold rounded-xl flex items-center space-x-2 transition-all hover:scale-103 shadow-lg cursor-pointer text-slate-50 dark:text-slate-950"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span>Hire Me</span>
                <Send className="w-4 h-4" />
              </a>
              <button
                onClick={() => setShowResume(true)}
                className="px-6 py-3 border hover:border-accent hover:text-zinc-900 dark:hover:text-white rounded-xl font-bold flex items-center space-x-2 transition-all cursor-pointer border-slate-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 bg-white/60 dark:bg-zinc-900/40"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <FileText className="w-4 h-4" />
                <span>Explore CV</span>
              </button>
            </div>

            {/* Live Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-300/80 dark:border-zinc-800/80 w-full">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1 text-center lg:text-left">
                  <span className="text-2xl sm:text-3xl font-black font-heading tracking-tight block text-zinc-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Hero Interactive Luxury Portrait Module */}
          <div className="lg:col-span-5 relative z-10 flex flex-col items-center order-first lg:order-last w-full mt-4 lg:mt-0">
            {/* The Cinematic Luxury Portrait Component */}
            <div className="w-full max-w-[360px] aspect-square rounded-3xl overflow-hidden border border-slate-300 dark:border-zinc-850 bg-zinc-950 relative shadow-2xl group mb-6">
              {!isPortraitLoaded && (
                <div className="absolute inset-0 bg-slate-200 dark:bg-zinc-900 animate-pulse flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                </div>
              )}
              <motion.img
                src={meImg}
                alt="Muhammed Faizal M Cinematic Luxury Portrait"
                className="w-full h-full object-cover object-top origin-top scale-[1.15] transition-transform duration-700 group-hover:scale-[1.25]"
                onLoad={() => setIsPortraitLoaded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: isPortraitLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000";
                  setIsPortraitLoaded(true);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-40" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-zinc-900/70 backdrop-blur-md p-3 rounded-xl border border-zinc-800/80">
                <div>
                  <span className="text-[10px] font-mono text-accent font-bold block">PORTRAIT // ID</span>
                  <span className="text-white text-xs font-bold">Faizal M.</span>
                </div>
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              </div>
            </div>

            {/* Info Card Tabs Container */}
            <div className="w-full premium-card rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-slate-200/50 dark:shadow-none border-white/40 dark:border-white/10">

              {/* Card Tabs */}
              <div className="flex border-b pb-3 mb-4 space-x-4 text-xs font-bold uppercase tracking-wider border-slate-300 dark:border-zinc-800 text-slate-500 dark:text-slate-400">
                {['story', 'education', 'principles'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setAboutTab(tab)}
                    className={`transition-colors cursor-pointer pb-1 border-b-2 ${aboutTab === tab ? 'text-accent border-accent' : 'border-transparent hover:text-slate-800 dark:text-slate-200'
                      }`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="min-h-[160px] text-sm leading-relaxed font-sans text-slate-500 dark:text-slate-400">
                {aboutTab === 'story' && (
                  <div className="space-y-3">
                    <p>
                      Hello, I am Muhammed Faizal M. I build production-ready applications with an emphasis on performance optimization, secure database operations, and maintainable cross-platform codebases.
                    </p>
                    <p>
                      I have structured commercial mobile layouts at <strong className="text-zinc-900 dark:text-white">Softroniics Technologies</strong> and delivered UI flows as an intern at <strong className="text-zinc-900 dark:text-white">Mentorow Technologies</strong>.
                    </p>
                  </div>
                )}

                {aboutTab === 'education' && (
                  <div className="space-y-4">
                    <div className="border-l-2 border-accent pl-3">
                      <h4 className="font-bold text-[13px] text-zinc-900 dark:text-white">Flutter Development Program</h4>
                      <p className="text-xs font-mono">Brototype, Trivandrum | Mar 2023 – Dec 2023</p>
                    </div>
                    <div className="border-l-2 pl-3 border-slate-300 dark:border-zinc-700">
                      <h4 className="font-bold text-[13px] text-slate-700 dark:text-slate-300">Bachelor’s Degree</h4>
                      <p className="text-xs font-mono">Travancore College, Trivandrum | 2018 – 2021</p>
                    </div>
                  </div>
                )}

                {aboutTab === 'principles' && (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[
                      { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "Clean Architecture" },
                      { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "SOLID Coding Rules" },
                      { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "JSON Parsers" },
                      { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "BLoC / GetX States" },
                      { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "Agile Scrums" },
                      { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "Performance Tuning" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 p-2 rounded-lg border bg-white/60 dark:bg-zinc-900/40 border-slate-300/80 dark:border-zinc-850/80">
                        {item.icon}
                        <span className="font-medium text-slate-600 dark:text-slate-350">{item.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Contact Link */}
              <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row justify-between sm:items-center text-xs gap-2 border-slate-300/80 dark:border-zinc-800/80 text-slate-500 dark:text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span className="font-mono text-slate-500 dark:text-slate-400">+91 8075374600</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  <span className="font-mono text-slate-500 dark:text-slate-400">mhdfaizalofficial@gmail.com</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Arsenal Section */}
      <section id="skills" className="py-24 border-y relative border-slate-300 dark:border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="space-y-2">
              <h4 className="text-accent font-mono font-bold tracking-widest text-xs uppercase">02 // EXPERTISE</h4>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-zinc-900 dark:text-white">Technical Arsenal</h2>
            </div>
            <p className="text-sm max-w-sm mt-3 md:mt-0 text-slate-500 dark:text-slate-400">
              Categorized skills representing core concepts, databases, frameworks and tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Languages & Core Cards */}
            <div className="p-8 premium-card rounded-3xl relative overflow-hidden group backdrop-blur-xl">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-300">
                <Code2 className="w-28 h-28 text-zinc-900 dark:text-white" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Core & Languages</h3>
              <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Dart Programming</span>
                  <span className="text-xs text-accent font-mono">Expert</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Java / C Language</span>
                  <span className="text-xs text-accent font-mono">Proficient</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Clean Architecture / OOP</span>
                  <span className="text-xs text-accent font-mono">Expert</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">MVC Pattern</span>
                  <span className="text-xs font-mono text-slate-550 dark:text-slate-450 text-slate-500 dark:text-slate-400">Proficient</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">JSON Parsing & APIs</span>
                  <span className="text-xs text-accent font-mono">Advanced</span>
                </div>
              </div>
            </div>

            {/* Frameworks & Database */}
            <div className="p-8 premium-card rounded-3xl relative overflow-hidden group backdrop-blur-xl">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-300">
                <Database className="w-28 h-28 text-zinc-900 dark:text-white" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Frameworks & Database</h3>
              <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Flutter Framework</span>
                  <span className="text-xs text-accent font-mono">Expert</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Firebase Firestore / DB</span>
                  <span className="text-xs text-accent font-mono">Advanced</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">SQLite & Hive Local DB</span>
                  <span className="text-xs text-accent font-mono">Expert</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">SharedPreferences</span>
                  <span className="text-xs text-accent font-mono">Advanced</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">MySQL Database</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Intermediate</span>
                </div>
              </div>
            </div>

            {/* States & Environments */}
            <div className="p-8 premium-card rounded-3xl relative overflow-hidden group backdrop-blur-xl">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-300">
                <Layers className="w-28 h-28 text-zinc-900 dark:text-white" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">State Management & Tools</h3>
              <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">GetX State</span>
                  <span className="text-xs text-accent font-mono">Expert</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Provider & BLoC</span>
                  <span className="text-xs text-accent font-mono">Expert</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Git / GitHub / Postman</span>
                  <span className="text-xs text-accent font-mono">Advanced</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Android Studio / VS Code</span>
                  <span className="text-xs text-accent font-mono">Expert</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Figma Collaboration</span>
                  <span className="text-xs text-accent font-mono">Proficient</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 max-w-4xl mx-auto px-6 z-10 relative">

        <div className="text-center space-y-3 mb-16">
          <h4 className="text-accent font-mono font-bold tracking-widest text-xs uppercase">03 // CHRONICLE</h4>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-zinc-900 dark:text-white">Professional History</h2>
          <p className="text-sm max-w-md mx-auto text-slate-500 dark:text-slate-400">
            Practical development background compiling codebase and publishing apps to app stores.
          </p>
        </div>

        {/* Dynamic Experience Timeline switcher */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Swticher Tabs */}
          <div className="md:col-span-4 flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto pb-4 md:pb-0 scrollbar-none">
            {experiences.map((exp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveExp(idx)}
                className={`text-left px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-normal sm:whitespace-nowrap ${activeExp === idx
                  ? 'bg-accent/10 border-accent/30 text-accent font-black shadow-sm'
                  : 'bg-transparent border-slate-300 dark:border-zinc-800 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white dark:hover:bg-zinc-900/30'
                  }`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Details Column */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="border rounded-2xl p-6 sm:p-8 hover:border-slate-300 transition-all bg-white/60 dark:bg-zinc-900/40 border-slate-300 dark:border-zinc-800 border-slate-300/80 dark:border-zinc-700/80"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-5 border-slate-300 dark:border-zinc-800">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold leading-tight text-zinc-900 dark:text-white">
                      {experiences[activeExp].role}
                    </h3>
                    <p className="text-accent text-xs font-mono font-semibold mt-1">
                      {experiences[activeExp].company}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-left sm:text-right text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                    <span className="block">{experiences[activeExp].period}</span>
                    <span className="block text-slate-500 dark:text-slate-400">{experiences[activeExp].location}</span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-3.5 mb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {experiences[activeExp].bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Contribution Impact Alert */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-xs font-semibold mb-6 flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-emerald-300">Key Impact Metric:</span>
                    <span>{experiences[activeExp].impact}</span>
                  </div>
                </div>

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {experiences[activeExp].tech.map(t => (
                    <span key={t} className="text-[10px] font-semibold font-mono border px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-850 text-slate-500 dark:text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </section>

      {/* Featured Projects Grid & Showcase */}
      <section id="projects" className="py-24 border-t relative bg-slate-50/40 dark:bg-[#09090b]/40 border-slate-300 dark:border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="space-y-2">
              <h4 className="text-accent font-mono font-bold tracking-widest text-xs uppercase">04 // PRODUCTION</h4>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-zinc-900 dark:text-white">Featured Projects</h2>
            </div>

            {/* Dynamic Filter Buttons */}
            <div className="flex space-x-2 mt-4 md:mt-0 p-1 border rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-950 border-slate-300/80 dark:border-zinc-800/80 text-slate-500 dark:text-slate-400">
              {['All', 'Mobile App', 'Management System', 'Finance'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setProjectFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${projectFilter === filter
                    ? 'bg-accent text-slate-50 dark:text-slate-950 font-bold'
                    : 'hover:text-slate-800 dark:text-slate-200'
                    }`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects
              .filter(p => projectFilter === 'All' || p.category === projectFilter)
              .map((proj) => {
                const currentPlatform = projectPlatforms[proj.id] || 'iOS';

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    key={proj.id}
                    className="group premium-card rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 flex flex-col md:flex-row justify-between gap-6 cursor-pointer"
                    onClick={() => setSelectedProject(proj)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >

                    {/* Left Specs */}
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold font-mono tracking-wider text-accent uppercase">{proj.category}</span>
                          <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                            {/* Device platform switcher buttons */}
                            <button
                              onClick={() => togglePlatform(proj.id)}
                              className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all cursor-pointer ${currentPlatform === 'iOS' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-500 border border-transparent'
                                }`}
                            >
                              iOS
                            </button>
                            <button
                              onClick={() => togglePlatform(proj.id)}
                              className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all cursor-pointer ${currentPlatform === 'Android' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-500 border border-transparent'
                                }`}
                            >
                              Android
                            </button>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors font-heading leading-tight text-zinc-900 dark:text-white">{proj.title}</h3>
                        <p className="text-xs leading-relaxed line-clamp-3">{proj.desc}</p>
                      </div>

                      <div className="space-y-4">
                        {/* Specs badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tech.slice(0, 3).map(t => (
                            <span key={t} className="text-[9px] font-bold font-mono px-2 py-0.5 rounded text-accent border bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-850">
                              {t}
                            </span>
                          ))}
                          {proj.tech.length > 3 && (
                            <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-950 text-slate-500 dark:text-slate-400">
                              +{proj.tech.length - 3} more
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] text-accent font-bold font-mono inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                          <span>Details & Architecture</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Right CSS Phone Mockup (Adaptive Platform Bezels) */}
                    <div className="flex-shrink-0 flex justify-center items-center">
                      <div className={`relative bg-slate-50 dark:bg-[#09090b] shadow-2xl overflow-hidden group-hover:border-accent/30 transition-all duration-350 ${currentPlatform === 'iOS'
                        // iOS iPhone Frame with dynamic island notch
                        ? 'border-[5px] border-slate-300 dark:border-zinc-800 rounded-[24px] h-[205px] w-[115px]'
                        // Android Pixel frame with thin bezels
                        : 'border-[3px] border-slate-300 dark:border-zinc-800 rounded-[18px] h-[205px] w-[115px]'
                        }`}>

                        {/* Camera Notch/Island depends on platform */}
                        {currentPlatform === 'iOS' ? (
                          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 h-[7px] w-[35px] rounded-full z-25 flex justify-center items-center bg-slate-200 dark:bg-zinc-850">
                            <div className="w-1.5 h-1.5 rounded-full mr-1 bg-slate-100 dark:bg-zinc-950" />
                            <div className="w-0.5 h-0.5 rounded-full bg-slate-100 dark:bg-zinc-950" />
                          </div>
                        ) : (
                          <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full z-25 bg-slate-200 dark:bg-zinc-800" />
                        )}

                        {/* Status bar */}
                        <div className="px-2 pt-2 pb-0.5 flex justify-between items-center text-[5.5px] font-mono select-none text-zinc-600 dark:text-zinc-500">
                          <span>9:41</span>
                          <div className="flex items-center space-x-0.5">
                            <span>LTE</span>
                            <div className="w-2.5 h-1.5 border rounded-[1.5px] border-slate-400 dark:border-zinc-650" />
                          </div>
                        </div>

                        {/* Render custom screen preview contents */}
                        <div className="h-[178px] overflow-hidden">
                          {renderPhoneScreen(proj.mockupType, currentPlatform)}
                        </div>

                        {/* Bottom Bar indicators */}
                        {currentPlatform === 'iOS' ? (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-[2px] w-[35px] rounded-full z-25 bg-slate-200 dark:bg-zinc-800" />
                        ) : (
                          <div className="absolute bottom-0 left-0 w-full h-[6px] border-t flex justify-around items-center px-4 z-25 bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-900">
                            <div className="w-1 h-1 border-l border-t transform -rotate-45 border-slate-300 dark:border-zinc-700" />
                            <div className="w-1.5 h-1.5 border rounded-full border-slate-300 dark:border-zinc-700" />
                            <div className="w-1.5 h-1.5 border rounded-[1.5px] border-slate-300 dark:border-zinc-700" />
                          </div>
                        )}
                      </div>
                    </div>

                  </motion.div>
                );
              })}
          </div>

          {/* Mini Projects Grid */}
          <div className="mt-20 pt-16 border-t border-slate-300 dark:border-zinc-850">
            <h3 className="text-xl font-bold font-heading mb-8 flex items-center space-x-2 text-zinc-900 dark:text-white">
              <Code2 className="w-5 h-5 text-accent" />
              <span>Mini Utility Projects</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {miniProjects.map((mini, index) => (
                <div
                  key={index}
                  className="p-5 premium-card rounded-3xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono text-accent font-semibold">{mini.tech}</span>
                      <Award className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <h4 className="text-sm font-bold mb-1.5 text-zinc-900 dark:text-white">{mini.name}</h4>
                    <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">{mini.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Resume Preview Overlay Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-50/90 dark:bg-[#04060b]/90 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="border rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl z-10 bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800"
            >

              {/* Header */}
              <div className="p-6 border-b flex justify-between items-center border-slate-300 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-950">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-accent" />
                  <span className="font-bold font-heading text-zinc-900 dark:text-white">Muhammed Faizal M - CV</span>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={cvFile}
                    download="Muhammed_Faizal_CV.pdf"
                    className="p-2 border hover:border-slate-300 rounded-lg hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer flex items-center space-x-1 text-xs border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 dark:text-slate-400"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                  <button
                    onClick={() => setShowResume(false)}
                    className="p-2 border hover:border-slate-300 rounded-lg hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 dark:text-slate-400"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Document Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto text-left space-y-6 text-sm leading-relaxed font-sans scrollbar-thin text-slate-500 dark:text-slate-400">

                {/* Header */}
                <div className="text-center space-y-2 pb-6 border-b border-slate-300/80 dark:border-zinc-800/80">
                  <h1 className="text-3xl font-black font-heading tracking-tight leading-none text-zinc-900 dark:text-white">Muhammed Faizal M</h1>
                  <h3 className="text-accent text-sm font-semibold uppercase tracking-wider font-mono">Flutter Developer</h3>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>+91 8075374600</span>
                    <span>•</span>
                    <span>mhdfaizalofficial@gmail.com</span>
                    <span>•</span>
                    <span>github.com/mhdfaizal03</span>
                  </div>
                </div>

                {/* Profile statement */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-zinc-900 dark:text-white">Summary</h4>
                  <p className="text-[13px]">
                    Results-driven Flutter Developer with experience in building scalable, high-performance cross-platform mobile applications using Flutter and Dart. Strong expertise in Firebase Integration, REST API Development, Clean Architecture, and State Management (GetX, Provider, BLoC).
                  </p>
                </div>

                {/* Experience */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest font-mono font-bold border-b pb-1 text-zinc-900 dark:text-white border-slate-300 dark:border-zinc-800">Experience</h4>

                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline text-xs font-bold font-mono">
                      <span className="text-slate-800 dark:text-slate-200">Software Developer (Flutter) @ Softroniics Technologies</span>
                      <span className="text-slate-550 dark:text-slate-400 font-semibold">September 2024 – Present</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Developed scalable Flutter applications using clean architecture designs.</li>
                      <li>Implemented state management using GetX, Provider, and Bloc.</li>
                      <li>Integrated Firebase Authentication, Firestore, Cloud Messaging, and Storage.</li>
                      <li>Built secure REST APIs, improving overall app response profiles.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline text-xs font-bold font-mono">
                      <span className="text-slate-800 dark:text-slate-200">Flutter Developer Intern @ Mentorow Technologies, Kochi</span>
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">Feb 2024 – Jul 2024</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Built Flutter applications, creating reusable UI elements.</li>
                      <li>Integrated Firebase systems and worked with REST API integrations.</li>
                    </ul>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-mono font-bold border-b pb-1 text-zinc-900 dark:text-white border-slate-300 dark:border-zinc-800">Skills</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">Languages:</span>
                      <span className="ml-2 font-mono">Dart, Java, C, JavaScript</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">Frameworks:</span>
                      <span className="ml-2 font-mono">Flutter, HTML, CSS</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">State Management:</span>
                      <span className="ml-2 font-mono">GetX, Provider, BLoC</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">Databases:</span>
                      <span className="ml-2 font-mono">Firestore, Realtime DB, SQLite, Hive</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">Architectures:</span>
                      <span className="ml-2 font-mono">Clean Architecture, OOP, MVC Pattern</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">Tools:</span>
                      <span className="ml-2 font-mono">Git, GitHub, Postman, Android Studio, Figma</span>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-mono font-bold border-b pb-1 text-zinc-900 dark:text-white border-slate-300 dark:border-zinc-800">Education</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between font-mono">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Flutter Development Program @ Brototype, Trivandrum</span>
                      <span className="text-slate-500 dark:text-slate-400">Mar 2023 – Dec 2023</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Bachelor’s Degree @ Travancore College, Trivandrum</span>
                      <span className="text-slate-500 dark:text-slate-400">2018 – 2021</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Details Modal (With Clean Architecture Interactive visualizer) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-50/90 dark:bg-[#04060b]/92 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto"
            onClick={() => {
              setSelectedProject(null);
              setModalTab('overview');
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 25 }}
              className="border rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative z-10 bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Cover Graphic Banner */}
              <div className="h-4 bg-gradient-to-r from-accent via-violet-500 to-rose-400 w-full" />

              <div className="p-6 sm:p-8 space-y-6">

                {/* Header Row */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold font-mono tracking-wider text-accent uppercase leading-none">{selectedProject.category}</span>
                    <h2 className="text-2xl font-black font-heading leading-tight text-zinc-900 dark:text-white">{selectedProject.title}</h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Sub Modal Tabs */}
                    <div className="flex space-x-1 p-1 border rounded-xl text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800 text-slate-500 dark:text-slate-400">
                      <button
                        onClick={() => setModalTab('overview')}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${modalTab === 'overview' ? 'bg-accent text-slate-50 dark:text-slate-950' : 'hover:text-slate-800 dark:text-slate-200'
                          }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setModalTab('architecture')}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${modalTab === 'architecture' ? 'bg-accent text-slate-50 dark:text-slate-950' : 'hover:text-slate-800 dark:text-slate-200'
                          }`}
                      >
                        Clean Architecture
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        setModalTab('overview');
                      }}
                    className="p-2 border hover:border-slate-300 rounded-xl hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 dark:text-slate-400"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {modalTab === 'overview' ? (
                    /* Modal Overview Tab */
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                    >
                      {/* Left Info Columns */}
                      <div className="md:col-span-8 space-y-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-widest block">Project Overview</span>
                          <p className="text-[13px]">{selectedProject.detailDesc}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest block">My Role & Contribution</span>
                          <p className="text-[13px] text-slate-600 dark:text-slate-350">{selectedProject.role}</p>
                        </div>

                        {/* Impact Row */}
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold flex items-center space-x-2">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{selectedProject.impact}</span>
                        </div>

                        {/* Tech badging */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-widest block">Core Technologies</span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProject.tech.map(t => (
                              <span key={t} className="text-[10px] font-semibold font-mono border text-accent px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-850">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Right Mockup Showcase */}
                      <div className="md:col-span-4 flex flex-col items-center space-y-3">
                        <div className="flex items-center space-x-1.5 p-1 border rounded-xl bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-850">
                          <button
                            onClick={() => togglePlatform(selectedProject.id)}
                            className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all cursor-pointer ${(projectPlatforms[selectedProject.id] || 'iOS') === 'iOS' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-500 border border-transparent'
                              }`}
                          >
                            iOS
                          </button>
                          <button
                            onClick={() => togglePlatform(selectedProject.id)}
                            className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all cursor-pointer ${(projectPlatforms[selectedProject.id] || 'iOS') === 'Android' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-500 border border-transparent'
                              }`}
                          >
                            Android
                          </button>
                        </div>

                        <div className={`relative bg-slate-50 dark:bg-[#09090b] shadow-2xl overflow-hidden transition-all duration-350 ${(projectPlatforms[selectedProject.id] || 'iOS') === 'iOS'
                          ? 'border-[4.5px] border-slate-300 dark:border-zinc-800 rounded-[28px] h-[205px] w-[115px]'
                          : 'border-[2.5px] border-slate-300 dark:border-zinc-800 rounded-[18px] h-[205px] w-[115px]'
                          }`}>
                          {/* Camera Notch/Island */}
                          {(projectPlatforms[selectedProject.id] || 'iOS') === 'iOS' ? (
                            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 h-[7px] w-[35px] rounded-full z-25 flex justify-center items-center bg-white dark:bg-zinc-900">
                              <div className="w-1 h-1 rounded-full mr-1 bg-slate-50 dark:bg-[#09090b]" />
                              <div className="w-0.5 h-0.5 rounded-full bg-slate-50 dark:bg-[#09090b]" />
                            </div>
                          ) : (
                            <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full z-25 bg-slate-200 dark:bg-zinc-800" />
                          )}

                          {/* Status bar */}
                          <div className="px-2 pt-2 pb-0.5 flex justify-between items-center text-[5.5px] font-mono select-none text-slate-500 dark:text-slate-400">
                            <span>9:41</span>
                            <div className="flex items-center space-x-0.5">
                              <span>LTE</span>
                              <div className="w-2.5 h-1.5 border rounded-[1.5px] border-slate-300 dark:border-zinc-700" />
                            </div>
                          </div>

                          <div className="h-[178px] overflow-hidden">
                            {renderPhoneScreen(selectedProject.mockupType, projectPlatforms[selectedProject.id] || 'iOS')}
                          </div>

                          {/* Bottom Bar indicators */}
                          {(projectPlatforms[selectedProject.id] || 'iOS') === 'iOS' ? (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-[2px] w-[35px] rounded-full z-25 bg-slate-200 dark:bg-zinc-800" />
                          ) : (
                            <div className="absolute bottom-0 left-0 w-full h-[6px] border-t flex justify-around items-center px-4 z-25 bg-slate-50 dark:bg-[#09090b] border-slate-300 dark:border-zinc-900">
                              <div className="w-1 h-1 border-l border-t transform -rotate-45 border-slate-300 dark:border-zinc-700" />
                              <div className="w-1.5 h-1.5 border rounded-full border-slate-300 dark:border-zinc-700" />
                              <div className="w-1.5 h-1.5 border rounded-[1.5px] border-slate-300 dark:border-zinc-700" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* Modal Clean Architecture Interactive Visualizer Tab */
                    <motion.div
                      key="architecture"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-xs"
                    >
                      {/* Left Vertical Flowchart */}
                      <div className="md:col-span-5 flex flex-col items-center justify-center space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest block text-zinc-600 dark:text-zinc-500">Architecture Map</span>

                        <div className="relative flex flex-col items-center space-y-6 w-full px-8">
                          {/* Presentation Layer Card */}
                          <button
                            onClick={() => setActiveArchLayer('presentation')}
                            className={`w-full py-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer z-10 ${activeArchLayer === 'presentation' ? 'border-accent bg-accent/5' : 'border-slate-300 dark:border-zinc-800 hover:border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-950'
                              }`}
                          >
                            <span className="font-bold text-[10px] uppercase tracking-wider text-slate-700 dark:text-slate-300">Presentation</span>
                          </button>

                          {/* Arrow Down: Presentation -> Domain */}
                          <div className="absolute top-[42px] left-1/2 transform -translate-x-1/2 flex flex-col items-center z-0">
                            <svg width="2" height="24" className="text-zinc-600 dark:text-zinc-500">
                              <line x1="1" y1="0" x2="1" y2="24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animated-flow-dash" />
                            </svg>
                            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-transparent border-t-zinc-400 dark:border-t-zinc-600 -mt-[1px]"></div>
                          </div>

                          {/* Domain Layer Card */}
                          <button
                            onClick={() => setActiveArchLayer('domain')}
                            className={`w-full py-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer z-10 ${activeArchLayer === 'domain' ? 'border-accent bg-accent/5' : 'border-slate-300 dark:border-zinc-800 hover:border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900'
                              }`}
                          >
                            <span className="font-bold text-[10px] uppercase tracking-wider text-slate-700 dark:text-slate-300">Domain</span>
                          </button>

                          {/* Arrow Up: Data -> Domain */}
                          <div className="absolute top-[108px] left-1/2 transform -translate-x-1/2 flex flex-col items-center z-0">
                            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[5px] border-transparent border-b-zinc-400 dark:border-b-zinc-600 -mb-[1px]"></div>
                            <svg width="2" height="24" className="text-zinc-600 dark:text-zinc-500">
                              <line x1="1" y1="0" x2="1" y2="24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animated-flow-dash" />
                            </svg>
                          </div>

                          {/* Data Layer Card */}
                          <button
                            onClick={() => setActiveArchLayer('data')}
                            className={`w-full py-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer z-10 ${activeArchLayer === 'data' ? 'border-accent bg-accent/5' : 'border-slate-300 dark:border-zinc-800 hover:border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-950'
                              }`}
                          >
                            <span className="font-bold text-[10px] uppercase tracking-wider text-slate-700 dark:text-slate-300">Data</span>
                          </button>
                        </div>

                        <span className="text-[9px] text-center font-mono text-zinc-600 dark:text-zinc-500">
                          Click diagram segments to browse implementation details.
                        </span>
                      </div>

                      {/* Right Detail Snippets */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold font-heading text-zinc-900 dark:text-white">{archLayers[activeArchLayer].title}</h4>
                          <p className="leading-normal text-[12px] text-slate-500 dark:text-slate-400">{archLayers[activeArchLayer].desc}</p>
                        </div>

                        {/* Code box */}
                        <div className="border rounded-xl p-3.5 relative bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800">
                          <span className="absolute top-2.5 right-2.5 font-mono text-[8px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500">Dart</span>
                          <pre className="font-mono text-[9px] leading-relaxed text-slate-800 dark:text-zinc-300 overflow-x-auto text-left scrollbar-thin max-h-[160px]">
                            {highlightDartCode(archLayers[activeArchLayer].code)}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer buttons links */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-300/80 dark:border-zinc-800/80">
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 border hover:border-slate-300 rounded-xl text-xs font-bold bg-accent text-slate-50 dark:text-slate-950 hover:bg-accent-hover transition-all flex items-center space-x-1.5 cursor-pointer border-transparent"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Preview</span>
                    </a>
                  )}
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 border hover:border-slate-300 rounded-xl text-xs font-bold hover:text-zinc-900 dark:hover:text-white transition-all flex items-center space-x-1.5 cursor-pointer border-slate-300 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-950 text-slate-500 dark:text-slate-400"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsible CLI Terminal Drawer */}
      <div className="fixed bottom-4 right-4 z-40 font-mono text-xs select-text">
        <AnimatePresence>
          {terminalOpen ? (
            /* Opened Terminal CLI Window */
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="w-[calc(100vw-2rem)] max-w-sm sm:w-96 border rounded-2xl shadow-2xl overflow-hidden bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800"
            >
              {/* Window Header */}
              <div className="px-4 py-2.5 border-b flex items-center justify-between select-none relative bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
                <div className="flex items-center space-x-1.5 absolute left-4">
                  <button
                    onClick={() => setTerminalOpen(false)}
                    className="w-2.5 h-2.5 rounded-full bg-rose-500 hover:bg-rose-400 cursor-pointer"
                  />
                  <button
                    onClick={() => setTerminalOpen(false)}
                    className="w-2.5 h-2.5 rounded-full bg-amber-500 hover:bg-amber-400 cursor-pointer"
                  />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center space-x-2 w-full justify-center">
                  <TerminalIcon className="w-3.5 h-3.5 text-accent animate-pulse" />
                  <span className="text-[10px] font-bold font-mono text-zinc-700 dark:text-zinc-400">faizal-portfolio-cli.sh</span>
                </div>
              </div>

              {/* Terminal Logs Body */}
              <div className="p-4 h-56 overflow-y-auto scrollbar-thin text-left space-y-2 select-text bg-slate-100 dark:bg-zinc-950">
                {terminalHistory.map((log, idx) => (
                  <div key={idx} className={`leading-relaxed text-[11px] ${log.type === 'input' ? 'text-zinc-900 dark:text-white font-semibold' :
                    log.type === 'error' ? 'text-rose-400' :
                      log.type === 'info' ? 'text-slate-500 dark:text-slate-400' : 'text-emerald-450'
                    }`}>
                    {log.type === 'output' ? (
                      <pre className="font-mono whitespace-pre">{log.text}</pre>
                    ) : log.text}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>

              {/* Terminal Input Form */}
              <form onSubmit={handleTerminalSubmit} className="border-t p-2 flex items-center select-text border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <span className="text-accent font-bold mr-1.5 text-[11px]">visitor@faizal-cli:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type 'help'..."
                  className="bg-transparent border-none focus:outline-none text-[11px] flex-1 font-mono select-text text-zinc-900 dark:text-white"
                />
              </form>
            </motion.div>
          ) : (
            /* Closed Floating Badge button */
            <motion.button
              layoutId="terminal-toggle"
              onClick={() => setTerminalOpen(true)}
              className="p-3 border rounded-full cursor-pointer shadow-2xl flex items-center justify-center select-none bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-white hover:text-accent dark:hover:text-accent"
              whileHover={{ scale: 1.1 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              title="Open Terminal Shell"
            >
              <TerminalIcon className="w-5 h-5 text-accent" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6 bg-gradient-to-b from-transparent to-accent/5">
        <div className="max-w-4xl mx-auto">

          <div className="text-center space-y-3 mb-16">
            <h4 className="text-accent font-mono font-bold tracking-widest text-xs uppercase">05 // DIALOG</h4>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-zinc-900 dark:text-white">Connect with Faizal</h2>
            <p className="text-sm max-w-sm mx-auto text-slate-500 dark:text-slate-400">
              Have an opening, a freelance project, or just want to chat Flutter? Drop a message!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

            {/* Contact Information */}
            <div className="md:col-span-5 space-y-6">

              <div className="p-6 border rounded-2xl space-y-4 bg-slate-100/40 dark:bg-zinc-950/40 border-slate-300 dark:border-zinc-800">

                <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400">Direct Contact</h4>

                <div className="space-y-4 text-xs font-mono font-sans">
                  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-350">
                    <Phone className="w-4 h-4 text-accent" />
                    <span className="font-semibold text-slate-600 dark:text-slate-300">+91 8075374600</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-350">
                    <Mail className="w-4 h-4 text-accent" />
                    <a href="mailto:mhdfaizalofficial@gmail.com" className="hover:underline cursor-pointer">mhdfaizalofficial@gmail.com</a>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-350">
                    <Linkedin className="w-4 h-4 text-accent" />
                    <a href="https://linkedin.com/in/mhdfaizal" target="_blank" rel="noreferrer" className="hover:underline cursor-pointer">linkedin.com/in/mhdfaizal</a>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-350">
                    <Github className="w-4 h-4 text-accent" />
                    <a href="https://github.com/mhdfaizal03" target="_blank" rel="noreferrer" className="hover:underline cursor-pointer">github.com/mhdfaizal03</a>
                  </div>
                </div>

              </div>

              {/* Experience highlight card */}
              <div className="p-6 border rounded-2xl space-y-3 bg-slate-100/40 dark:bg-zinc-950/40 border-slate-300 dark:border-zinc-800">
                <div className="flex items-center space-x-2 text-accent">
                  <Award className="w-4 h-4" />
                  <span className="text-xs uppercase font-mono font-bold">Hiring Highlights</span>
                </div>
                <ul className="text-xs space-y-2">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span>Open to remote and hybrid positions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span>Able to join immediately</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span>Advanced state architectures (BLoC / GetX)</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Contact Form */}
            <div className="md:col-span-7">
              <form onSubmit={handleContactSubmit} className="border rounded-3xl p-6 sm:p-8 space-y-5 bg-slate-100/40 dark:bg-zinc-950/40 border-slate-300 dark:border-zinc-800">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-mono uppercase tracking-wider block text-slate-500 dark:text-slate-400">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 bg-white dark:bg-white/80 dark:bg-zinc-900/80 border text-xs text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none transition-all ${errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-300 dark:border-zinc-800 focus:border-accent'
                        }`}
                    />
                    {errors.name && <span className="text-[9px] font-semibold text-rose-500 font-mono block">{errors.name}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-mono uppercase tracking-wider block text-slate-500 dark:text-slate-400">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className={`w-full px-4 py-3 bg-white dark:bg-white/80 dark:bg-zinc-900/80 border text-xs text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none transition-all ${errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-300 dark:border-zinc-800 focus:border-accent'
                        }`}
                    />
                    {errors.email && <span className="text-[9px] font-semibold text-rose-500 font-mono block">{errors.email}</span>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-mono uppercase tracking-wider block text-slate-500 dark:text-slate-400">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opening"
                    className={`w-full px-4 py-3 bg-white dark:bg-white/80 dark:bg-zinc-900/80 border text-xs text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none transition-all ${errors.subject ? 'border-rose-500 focus:border-rose-500' : 'border-slate-300 dark:border-zinc-800 focus:border-accent'
                      }`}
                  />
                  {errors.subject && <span className="text-[9px] font-semibold text-rose-500 font-mono block">{errors.subject}</span>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-mono uppercase tracking-wider block text-slate-500 dark:text-slate-400">Message Details</label>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Faizal, we would love to schedule a interview..."
                    className={`w-full px-4 py-3 bg-white dark:bg-white/80 dark:bg-zinc-900/80 border text-xs text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none transition-all ${errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-slate-300 dark:border-zinc-800 focus:border-accent'
                      }`}
                  />
                  {errors.message && <span className="text-[9px] font-semibold text-rose-500 font-mono block">{errors.message}</span>}
                </div>

                {/* Form state draft indicator */}
                {Object.values(formData).some(v => v.length > 0) && (
                  <span className="text-[9px] font-bold font-mono block flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>Changes saved as draft locally</span>
                  </span>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-accent hover:bg-accent-hover font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50 text-slate-50 dark:text-slate-950"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting details...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* Floating Success Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-55 max-w-sm border border-emerald-500/35 rounded-2xl p-4 shadow-2xl flex items-start space-x-3 bg-slate-100 dark:bg-zinc-950"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Check className="w-4.5 h-4.5" />
            </div>
            <div className="space-y-1">
              <span className="font-bold text-xs block text-zinc-900 dark:text-white">Transmission Completed</span>
              <p className="text-[11px] leading-normal text-slate-500 dark:text-slate-400">
                Thank you! Your message was simulated successfully. I will get back to you soon.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 border-t text-center space-y-3 z-10 relative border-slate-300 dark:border-zinc-900 bg-slate-50/80 dark:bg-[#09090b]/80">
        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Engineered with React, TailwindCSS v4 & Framer Motion
        </p>
        <p className="text-accent/60 font-mono text-[9px]">
          © {new Date().getFullYear()} Muhammed Faizal M. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
