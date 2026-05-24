"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, Download, Calendar, MapPin, Target, Briefcase, Shield, CheckCircle, AlertCircle, ChevronDown, Lock, Cloud, Terminal, GitBranch, Layers } from 'lucide-react';

const GitHubIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);


interface Experience {
  title: string;
  company: string;
  period: string;
  description?: string;
  bullets?: string[];
  tools?: string[];
}

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

// Scroll Progress Bar
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-[60] bg-gray-200">
      <div className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 transition-[width] duration-75" style={{ width: `${progress}%` }} />
    </div>
  );
};

// Back to Top
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 w-11 h-11 bg-red-600 text-white rounded-full shadow-xl hover:bg-red-700 transition-all duration-200 flex items-center justify-center hover:scale-110 z-40 border border-red-500"
      aria-label="Back to top"
    >
      <ChevronDown className="rotate-180 w-5 h-5" />
    </button>
  );
};

// Alert
const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className={`fixed top-24 right-4 md:right-8 z-50 max-w-sm w-full animate-slide-in ${
      type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
    } border-l-4 p-4 rounded-xl shadow-2xl`}>
      <div className="flex items-start gap-3">
        {type === 'success'
          ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          : <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
        <p className={`text-sm font-medium flex-1 ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{message}</p>
        <button onClick={onClose} className={`${type === 'success' ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'} transition-colors`}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Tech Ticker
const TechTicker = () => {
  const tools = ['SonarQube', 'StackRox', 'Trivy', 'DefectDojo', 'Gitleaks', 'Terrascan', 'AWS', 'GCP', 'Azure', 'Burp Suite', 'OWASP ZAP', 'Dependency-Track', 'Kubernetes', 'Docker', 'CI/CD Pipelines', 'SAST', 'DAST', 'Penetration Testing'];
  const doubled = [...tools, ...tools];
  return (
    <div className="w-full overflow-hidden py-3 border-y border-gray-100 bg-gray-50/80">
      <div className="flex gap-8 animate-ticker whitespace-nowrap">
        {doubled.map((tool, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 tracking-widest uppercase flex-shrink-0">
            <span className="w-1 h-1 rounded-full bg-red-500 inline-block"></span>
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};

// Header
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-lg tracking-tight">Narayanan K</span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-md border border-red-100">DevSecOps</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {['Home', 'About', 'Experience', 'Contact'].map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item}
                  {isActive && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full"></span>}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:narayanan.k.infosec@gmail.com"
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Hire Me
            </a>
          </div>

          <button
            className="md:hidden text-gray-700 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-100 animate-slide-down pt-3">
            {['Home', 'About', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="flex w-full items-center gap-3 py-2.5 px-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                {item}
              </button>
            ))}
            <div className="pt-3 border-t border-gray-100 mt-2">
              <a href="mailto:narayanan.k.infosec@gmail.com" className="block w-full text-center py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold">
                Hire Me
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// Animated counter hook
const useCounter = (target: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};

// Stat Card
const StatCard = ({ icon: Icon, count, suffix = '', label, bgColor, iconColor, borderColor }: {
  icon: React.ElementType; count: number; suffix?: string; label: string;
  bgColor: string; iconColor: string; borderColor: string;
}) => {
  const { count: animated, ref } = useCounter(count);
  return (
    <div ref={ref} className={`bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 border-t-2 ${borderColor} group`}>
      <div className={`w-11 h-11 ${bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
        {animated}{suffix}
      </div>
      <p className="text-xs sm:text-sm text-gray-500 font-medium">{label}</p>
    </div>
  );
};

// Home
const Home = () => {
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleDownloadCV = () => {
    try {
      const link = document.createElement('a');
      link.href = '/assets/Narayanan-2026.pdf';
      link.download = 'narayanan-devsecops-cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setAlert({ type: 'success', message: 'CV download started successfully!' });
    } catch {
      setAlert({ type: 'error', message: 'Failed to download CV. Please try again.' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center bg-white pt-16 relative overflow-hidden"
    >
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(209,213,219,0.5) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-red-50/60 pointer-events-none" />
      {/* Decorative blobs */}
      <div className="absolute top-32 right-0 w-96 h-96 bg-red-50 rounded-full opacity-40 blur-3xl pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-gray-100 rounded-full opacity-50 blur-3xl pointer-events-none -translate-x-1/3" />

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-green-200 text-gray-700 rounded-full shadow-sm text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Available for new opportunities
              </div>

              <div>
                <p className="text-red-600 font-semibold text-sm tracking-widest uppercase mb-3">DevSecOps & Security Engineer</p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight">
                  Narayanan<span className="text-red-600">.</span>
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-lg">
                  4+ years securing applications, cloud infrastructure, and CI/CD pipelines — across AWS, GCP, and Azure.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-7 py-3.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-200 hover:scale-[1.02] text-sm"
                >
                  View Experience
                </button>
                <button
                  onClick={handleDownloadCV}
                  className="px-7 py-3.5 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <Download size={16} />
                  Download CV
                </button>
              </div>

              <div className="flex items-center gap-5 pt-1">
                <a href="https://github.com/Narayanan-K-InFoSeC" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-all duration-200 hover:scale-110">
                  <GitHubIcon size={22} />
                </a>
                <a href="https://www.linkedin.com/in/narayanan-k1/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-all duration-200 hover:scale-110">
                  <LinkedInIcon size={22} />
                </a>
                <a href="mailto:narayanan.k.infosec@gmail.com" className="text-gray-400 hover:text-red-600 transition-all duration-200 hover:scale-110">
                  <Mail size={22} />
                </a>
                <span className="w-px h-5 bg-gray-200"></span>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MapPin size={13} />
                  <span>Chennai, India</span>
                </div>
              </div>
            </div>

            {/* Right – Stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={Briefcase} count={4} suffix="+" label="Years Experience" bgColor="bg-red-50" iconColor="text-red-600" borderColor="border-red-500" />
              <StatCard icon={Shield} count={10} suffix="+" label="Security Tools" bgColor="bg-purple-50" iconColor="text-purple-600" borderColor="border-purple-500" />
            </div>
          </div>
        </div>
      </div>

      <TechTicker />

      <div className="flex justify-center py-6">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-gray-300 hover:text-red-500 transition-colors duration-200 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} />
        </button>
      </div>
    </section>
  );
};

// Section Header
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-14 sm:mb-16">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h2>
    <div className="flex items-center justify-center gap-3 mb-5">
      <div className="w-8 h-0.5 bg-gray-200 rounded-full"></div>
      <div className="w-8 h-0.5 bg-red-600 rounded-full"></div>
      <div className="w-8 h-0.5 bg-gray-200 rounded-full"></div>
    </div>
    <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">{subtitle}</p>
  </div>
);

// About
const About = () => {
  const skillGroups = [
    {
      icon: Lock,
      label: 'Application Security',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-100',
      skills: ['Web Pentesting', 'Mobile Security', 'API Security', 'OWASP Top 10', 'Burp Suite', 'SAST / DAST'],
    },
    {
      icon: Cloud,
      label: 'Cloud Security',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      skills: ['AWS Security', 'GCP Security', 'Azure Security', 'IAM Hardening', 'Terrascan', 'Cloud Compliance'],
    },
    {
      icon: Terminal,
      label: 'DevSecOps',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      skills: ['SonarQube', 'Gitleaks', 'StackRox', 'Trivy', 'DefectDojo', 'Dependency-Track'],
    },
    {
      icon: GitBranch,
      label: 'CI/CD & Automation',
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-100',
      skills: ['Secure Pipelines', 'Container Security', 'Kubernetes', 'Docker', 'Threat Modeling', 'Vuln Management'],
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="About Me"
            subtitle="Passionate security engineer with expertise in building secure, scalable applications and contributing to the cybersecurity community."
          />

          <div className="grid lg:grid-cols-3 gap-8 mb-14">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm border border-gray-100 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Professional Summary</h3>
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                  <p>
                    DevSecOps Analyst and Security Engineer with <strong className="text-gray-900">4+ years</strong> of experience securing applications and cloud infrastructure.
                    I specialize in Web, Mobile, and API Penetration Testing, Vulnerability Management, and Secure SDLC integration,
                    with hands-on expertise in CI/CD security automation across AWS, GCP, and Azure.
                  </p>
                  <p>
                    My work blends offensive and defensive security — from identifying vulnerabilities and simulating real-world attacks
                    to building automated, resilient defenses that reduce risk and improve operational efficiency.
                  </p>
                  <p>
                    Currently working as an <strong className="text-gray-900">L3 DevSecOps Analyst at M2P Fintech</strong>, driving end-to-end security automation,
                    building secure CI/CD pipelines, and implementing solutions that enhance application, cloud, and container security.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                  <Layers className="w-4 h-4 text-red-600" />
                  Quick Info
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: MapPin, text: 'Chennai, India', color: 'text-red-500' },
                    { icon: Calendar, text: 'Available: Immediately', color: 'text-green-500' },
                    { icon: Target, text: 'Focus: Security & Performance', color: 'text-blue-500' },
                  ].map(({ icon: Icon, text, color }) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                      <Icon size={14} className={`${color} flex-shrink-0`} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillGroups.map(({ icon: Icon, label, color, bg, border, skills }) => (
              <div key={label} className={`bg-white rounded-2xl p-5 shadow-sm border ${border} hover:shadow-md transition-shadow duration-300`}>
                <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-3">{label}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(skill => (
                    <span key={skill} className={`text-xs px-2 py-1 ${bg} ${color} rounded-md font-medium border ${border}`}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// Experience
const Experience = () => {
  const experiences: Experience[] = [
    {
      title: "DevSecOps Analyst — L3",
      company: "M2P Fintech Pvt Ltd",
      period: "2024 – Present",
      bullets: [
        "Integrated SAST, DAST, and SCA for Web and API security into CI/CD pipelines using SonarQube and Dependency-Track, reducing vulnerabilities by 40% during early stages of the SDLC.",
        "Implemented Kubernetes and container security with RHACS (StackRox), enabling runtime detection, policy management, and compliance enforcement, enhancing compliance posture by 50%.",
        "Managed vulnerabilities with DefectDojo and enforced secret scanning using Gitleaks and TruffleHog, reducing false positives by 35%.",
        "Incorporated MobSF and Trivy into CI/CD pipelines, automating mobile security scans and generating SCA and SAST findings to strengthen application security.",
        "Deployed security tools using Helm and ArgoCD, and synthesized monitoring with Grafana and Prometheus to ensure observability, availability, and continuous security insights.",
        "Developed a full-stack M2P Compliance Dashboard using Next.js and TypeScript APIs, delivering a single-page solution that reduced manual follow-up work by 80% for Security Analysts and the GRC team.",
      ],
      tools: ['SonarQube', 'StackRox', 'Trivy', 'DefectDojo', 'Gitleaks', 'TruffleHog', 'MobSF', 'Dependency-Track', 'Helm', 'ArgoCD', 'Grafana', 'Prometheus'],
    },
    {
      title: "Security Engineer — L1 & L2",
      company: "Pepul Pvt Ltd",
      period: "2021 – 2024",
      bullets: [
        "Conducted VAPT on web, mobile, and API applications, identifying and facilitating remediation of 150+ security issues.",
        "Performed secure code reviews and applied security controls, preventing 25+ high-risk vulnerabilities before production deployment.",
        "Executed network security controls and system hardening measures, reducing attack surface by 30% across corporate systems.",
        "Provided security awareness training and guidance to development teams, improving secure coding adherence by 25%.",
        "Actively monitored and responded to emerging threats, ensuring zero critical security incidents over a 12-month period.",
        "Promoted a security-first culture by collaborating with development teams to ensure 100% of critical patches were applied within SLA.",
      ],
      tools: ['Burp Suite', 'OWASP ZAP', 'API Security', 'Threat Modeling', 'SAST', 'DAST'],
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Experience"
          subtitle="Professional journey building secure, innovative solutions across fintech and social media industries."
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-red-300 via-red-200 to-transparent hidden sm:block"></div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative sm:pl-16">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-6 hidden sm:flex w-12 h-12 bg-white border-2 border-red-200 rounded-full items-center justify-center shadow-sm">
                    <Briefcase className="w-5 h-5 text-red-600" />
                  </div>

                  <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                          {index === 0 && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-red-600 font-semibold text-sm">{exp.company} · Chennai, IN</p>
                      </div>
                      <span className="flex-shrink-0 text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg w-fit">{exp.period}</span>
                    </div>
                    {exp.bullets ? (
                      <ul className="space-y-2 mb-4">
                        {exp.bullets.map((point, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">{exp.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {exp.tools?.map(tool => (
                        <span key={tool} className="text-xs px-2.5 py-1 bg-red-50 text-red-700 border border-red-100 rounded-md font-medium">{tool}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



// Contact
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { setAlert({ type: 'error', message: 'Please enter your name' }); return; }
    if (!formData.email.trim() || !validateEmail(formData.email)) { setAlert({ type: 'error', message: 'Please enter a valid email address' }); return; }
    if (!formData.message.trim() || formData.message.trim().length < 10) { setAlert({ type: 'error', message: 'Message must be at least 10 characters' }); return; }
    setIsSubmitting(true);
    try {
      window.location.href = `mailto:narayanan.k.infosec@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contact Form Submission')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      setFormData({ name: '', email: '', subject: '', message: '' });
      setAlert({ type: 'success', message: 'Opening your email client. Thank you for reaching out!' });
    } catch {
      setAlert({ type: 'error', message: 'Failed to send. Please email directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition-all duration-200 text-sm bg-gray-50 placeholder-gray-400 hover:border-gray-300";

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get In Touch"
          subtitle="Ready to collaborate on your next security project? Let's discuss how we can work together."
        />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 sm:gap-12">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Let's Connect</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Available for consulting, full-time roles, and open source collaboration.</p>
            </div>

            <div className="space-y-3">
              {[
                { href: "mailto:narayanan.k.infosec@gmail.com", icon: Mail, label: "Email", value: "narayanan.k.infosec@gmail.com", color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
                { href: "https://github.com/Narayanan-K-InFoSeC", icon: null, label: "GitHub", value: "Narayanan-K-InFoSeC", color: "text-gray-700", bg: "bg-gray-50", border: "border-gray-100" },
                { href: "https://www.linkedin.com/in/narayanan-k1/", icon: null, label: "LinkedIn", value: "narayanan-k1", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
              ].map(({ href, icon: Icon, label, value, color, bg, border }) => (
                <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 bg-white rounded-2xl border ${border} hover:shadow-md transition-all duration-200 group`}>
                  <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center border ${border} group-hover:scale-110 transition-transform duration-200`}>
                    {Icon ? <Icon className={`w-5 h-5 ${color}`} /> : label === 'GitHub' ? <GitHubIcon size={18} className={color} /> : <LinkedInIcon size={18} className={color} />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                    <p className={`text-sm font-medium ${color} break-all`}>{value}</p>
                  </div>
                </a>
              ))}

              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center border border-green-100">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Location</p>
                  <p className="text-sm font-medium text-gray-700">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-gray-500">Typically responds within</span>
              </div>
              <p className="text-sm font-bold text-gray-900 pl-4">24 hours</p>
            </div>
          </div>

          {/* Right – Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h3>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass} placeholder="Your name" disabled={isSubmitting} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass} placeholder="your@email.com" disabled={isSubmitting} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className={inputClass} placeholder="Project discussion, consultation..." disabled={isSubmitting} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Message *</label>
                <textarea name="message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                  rows={5} className={`${inputClass} resize-none`} placeholder="Tell me about your project..." disabled={isSubmitting} />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-3.5 bg-red-600 text-white rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-red-700 hover:shadow-lg hover:shadow-red-200 hover:scale-[1.01]'
                }`}
              >
                {isSubmitting ? 'Opening email client...' : 'Send Message →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b border-gray-800">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">Narayanan K</span>
            </div>
            <p className="text-sm leading-relaxed">Building secure digital solutions for a connected world. DevSecOps & Security Engineering specialist based in Chennai, India.</p>
            <div className="flex gap-4">
              <a href="https://github.com/Narayanan-K-InFoSeC" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 hover:scale-110 transform">
                <GitHubIcon size={20} />
              </a>
              <a href="https://www.linkedin.com/in/narayanan-k1/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform">
                <LinkedInIcon size={20} />
              </a>
              <a href="mailto:narayanan.k.infosec@gmail.com" className="hover:text-red-400 transition-colors duration-200 hover:scale-110 transform">
                <Mail size={20} />
              </a>
            </div>
          </div>

{/* Availability */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Availability</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Open to new opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-gray-500" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-gray-500" />
                <a href="mailto:narayanan.k.infosec@gmail.com" className="hover:text-white transition-colors break-all text-xs">
                  narayanan.k.infosec@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© 2026 Narayanan K. All rights reserved.</p>
          <p>Made with ❤️ in Chennai, India</p>
        </div>
      </div>
    </footer>
  );
};

// Main
export default function Page() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <ScrollProgress />
      <BackToTop />
      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .animate-slide-down { animation: slide-down 0.25s ease-out; }
        .animate-ticker { animation: ticker 30s linear infinite; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Header />
      <Home />
      <About />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
