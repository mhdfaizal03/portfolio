// Theme Presets - High-Performance Productivity Palette
export const THEMES = [
  { name: 'Emerald', rgb: '16, 185, 129', hex: '#10b981', class: 'bg-emerald-500' },
  { name: 'Azure', rgb: '14, 165, 233', hex: '#0ea5e9', class: 'bg-sky-500' },
  { name: 'Amber', rgb: '245, 158, 11', hex: '#f59e0b', class: 'bg-amber-500' },
  { name: 'Crimson', rgb: '244, 63, 94', hex: '#f43f5e', class: 'bg-rose-500' },
  { name: 'Monochrome', rgb: '203, 213, 225', hex: '#cbd5e1', class: 'bg-slate-300 dark:bg-slate-200' },
];

export const NAV_ITEMS = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

// Major Projects Data
export const PROJECTS_DATA = [
  {
    id: "behold",
    title: "Behold Platform (behold.co.in)",
    category: "Web Platform",
    desc: "Modern digital brand platform & solutions portal engineered for premium user engagement and fast rendering.",
    detailDesc: "Behold (behold.co.in) is a comprehensive web platform built for high-speed performance, interactive UI/UX, and modern digital engagement. Engineered with responsive architecture, optimized asset pipelines, smooth micro-animations, and clean modular structure to showcase enterprise-grade digital solutions.",
    tech: ["React", "Web Architecture", "Responsive UI", "Tailwind CSS", "REST APIs", "Modern UX"],
    impact: "Delivered production web experience with sub-second load profiles and 100% cross-device responsive compatibility.",
    role: "Lead Frontend & Web Developer (Architected responsive UI components, state workflows, and performance optimization)",
    github: "https://github.com/mhdfaizal03",
    live: "https://behold.co.in",
    mockupType: "behold",
    platforms: ["Web", "Mobile"]
  },
  {
    id: "lms",
    title: "Softroniics LMS",
    category: "Education / LMS",
    desc: "Enterprise Learning Management System with structured course modules, live attendance tracking, and assessments.",
    detailDesc: "Softroniics LMS is a production-grade mobile learning platform developed for institutional training and student progress tracking. Features modular lecture streaming, assignment submission portals, real-time attendance rosters, educator evaluation dashboards, and instant push notifications for exam schedules.",
    tech: ["Flutter", "Clean Architecture", "REST API", "Firebase Auth", "GetX State", "Video Streaming"],
    impact: "Deployed for daily institutional use across multiple training cohorts, boosting student engagement and evaluation efficiency by 40%.",
    role: "Lead Flutter Developer (Designed Clean Architecture layers, consumed RESTful educational APIs, and built student portals)",
    github: "https://github.com/mhdfaizal03",
    live: "https://github.com/mhdfaizal03",
    mockupType: "lms",
    platforms: ["iOS", "Android"]
  },
  {
    id: "ncc",
    title: "NCC Management System",
    category: "Management System",
    desc: "Communication, parade roster, and attendance tracking system for Battalion Cadets & Officers.",
    detailDesc: "Designed to modernise battalion operations, the NCC Management System handles officer-guided attendance logs, real-time Cadet-to-Officer announcements, drill schedule rosters, role-based access control, and persistent offline database syncing for remote field conditions.",
    tech: ["Flutter", "Firebase Firestore", "Authentication System", "Cloud Messaging", "Role-Based Access"],
    impact: "Reduced operational coordination delays by 80%, handling check-in records and notice distribution for over 500 cadets.",
    role: "Full-Stack Mobile Engineer (Structured Firestore schema, security rules, officer/cadet dashboards, and push notifications)",
    github: "https://github.com/mhdfaizal03",
    live: "https://github.com/mhdfaizal03",
    mockupType: "ncc",
    platforms: ["iOS", "Android"]
  },
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
    mockupType: "blessing",
    platforms: ["iOS", "Android"]
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
    mockupType: "expenxo",
    platforms: ["iOS", "Android"]
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
    mockupType: "chatifly",
    platforms: ["iOS", "Android"]
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
    mockupType: "autoresq",
    platforms: ["iOS", "Android"]
  }
];

// Mini Projects Data
export const MINI_PROJECTS = [
  { name: "Musico", desc: "A sleek local audio player interface with responsive controls.", tech: "Flutter" },
  { name: "QR Scanner", desc: "Fast QR code scanning, generator, and URL redirection utility.", tech: "Flutter / Mobile" },
  { name: "Language Translator", desc: "Local database dictionary translations using Google APIs.", tech: "Flutter / REST API" },
  { name: "Weather App", desc: "Location forecast app displaying weather attributes in custom metrics.", tech: "Flutter / APIs" },
  { name: "Encrypta", desc: "Cryptographic text hasher storing algorithms using AES keys.", tech: "Dart" },
  { name: "Currency Converter", desc: "Dynamic foreign exchange calculator syncing live rates.", tech: "Flutter / JSON" },
  { name: "Bingo Game", desc: "Classic bingo board game with local state and multiplier calculations.", tech: "Flutter" }
];

// Experience Data
export const EXPERIENCES_DATA = [
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

export const STATS_DATA = [
  { value: "1.5+", label: "Years Exp" },
  { value: "15+", label: "Projects Completed" },
  { value: "7+", label: "Apps & Platforms" },
  { value: "99%", label: "Code Quality Rating" }
];

// Clean Architecture Layer Mock Code Snippets
export const ARCH_LAYERS = {
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
