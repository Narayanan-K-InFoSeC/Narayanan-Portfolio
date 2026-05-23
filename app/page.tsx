"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, ExternalLink, Download, Code, Calendar, MapPin, Users, Target, Award, Briefcase, Shield, Star, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';

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

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  category: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
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
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-gray-100">
      <div
        className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Back to Top Button
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 w-10 h-10 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-200 flex items-center justify-center transform hover:scale-110 z-40"
      aria-label="Back to top"
    >
      <ChevronDown className="rotate-180 w-5 h-5" />
    </button>
  );
};

// Alert Component
const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-24 right-4 md:right-8 z-50 max-w-md w-full mx-4 md:mx-0 animate-slide-in ${
      type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
    } border-l-4 p-4 rounded-lg shadow-lg`}>
      <div className="flex items-start gap-3">
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <p className={`text-sm font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className={`${type === 'success' ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'} transition-colors`}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// Header Component
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
    const sections = ['home', 'about', 'projects', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg border-b border-gray-100' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="text-xl sm:text-2xl font-bold text-gray-800">Portfolio</div>
            <span className="text-gray-300 font-light">|</span>
            <div className="text-red-600 font-bold text-lg sm:text-xl">Narayanan K</div>
          </div>

          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {['Home', 'About', 'Projects', 'Experience', 'Certifications', 'Contact'].map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-colors duration-200 font-medium relative group ${
                    isActive ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-200 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              );
            })}
          </div>

          <button
            className="md:hidden text-gray-800 hover:text-red-600 transition-colors duration-200 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 animate-slide-down">
            {['Home', 'About', 'Projects', 'Experience', 'Certifications', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left py-3 px-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

// Home Component
const Home = () => {
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleDownloadCV = () => {
    try {
      const cvPath = '/assets/Narayanan-2026.pdf';
      const link = document.createElement('a');
      link.href = cvPath;
      link.download = 'narayanan-devsecops-cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setAlert({ type: 'success', message: 'CV download started successfully!' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to download CV. Please try again.' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50 pt-20 relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(209,213,219,0.55) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white/60 to-red-50/80 pointer-events-none" />
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm sm:text-base font-medium tracking-wide">Available for Work</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 leading-tight">
                NARAYANAN
                <span className="block text-red-600 mt-2">DEVSECOPS</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                DevSecOps & Security Engineer | 4+ Years in Application Security (Web, Mobile, API), Cloud Security (AWS/GCP/Azure), and Container Security with StackRox Expertise
                Based in Chennai, India.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  View Projects
                </button>
                <button 
                  onClick={handleDownloadCV}
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-red-600 hover:text-red-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Download size={18} className="sm:w-5 sm:h-5" />
                  Download CV
                </button>
              </div>
              
              <div className="flex space-x-4 sm:space-x-6">
                <a href="https://github.com/Narayanan-K-InFoSeC" className="text-gray-400 hover:text-red-600 transform hover:scale-110 transition-all duration-200">
                  <GitHubIcon size={22} className="sm:w-6 sm:h-6" />
                </a>
                <a href="https://www.linkedin.com/in/narayanan-k1/" className="text-gray-400 hover:text-blue-600 transform hover:scale-110 transition-all duration-200">
                  <LinkedInIcon size={22} className="sm:w-6 sm:h-6" />
                </a>
                <a href="mailto:narayanan.k.infosec@gmail.com" className="text-gray-400 hover:text-red-600 transform hover:scale-110 transition-all duration-200">
                  <Mail size={22} className="sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: Briefcase, count: "4+", label: "Years Experience", bgColor: "bg-red-50", iconColor: "text-red-600", borderColor: "border-red-200" },
                { icon: Code, count: "2+", label: "Projects Completed", bgColor: "bg-blue-50", iconColor: "text-blue-600", borderColor: "border-blue-200" },
                { icon: Users, count: "0", label: "Happy User's", bgColor: "bg-green-50", iconColor: "text-green-600", borderColor: "border-green-200" },
                { icon: Award, count: "0", label: "Certifications", bgColor: "bg-purple-50", iconColor: "text-purple-600", borderColor: "border-purple-200" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-2 ${stat.borderColor}`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
                    <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">{stat.count}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-gray-400 hover:text-red-600 transition-colors duration-200"
          aria-label="Scroll to about"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

// About Component
const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Passionate security engineer with expertise in building secure, scalable applications and contributing to the cybersecurity community.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  DevSecOps Analyst and Security Engineer with <strong>4+ years</strong> of experience securing applications and cloud infrastructure. 
                  I specialize in Web, Mobile, and API Penetration Testing, Vulnerability Management, and Secure SDLC integration, 
                  with hands-on expertise in CI/CD security automation across AWS, GCP, and Azure.
                </p>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  My work blends offensive and defensive security, from identifying vulnerabilities and simulating real-world attacks to building automated, 
                  resilient defenses that reduce risk and improve operational efficiency.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                 Currently, I am working as an <strong>L3 DevSecOps Analyst at M2P</strong>, driving end-to-end security automation, building secure CI/CD pipelines, 
                 and implementing solutions that enhance application, cloud, and container security.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-base sm:text-lg">
                  <Shield className="w-5 h-5 text-red-600" />
                  Quick Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-red-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">Chennai, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-green-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">Available: Immediately</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target size={16} className="text-blue-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">Focus: Security & Performance</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-base sm:text-lg">
                  <Star className="w-5 h-5 text-blue-600" />
                  Community
                </h4>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">BSides Chennai Member</span>
                    <span className="text-blue-600 font-medium">2024-Present</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Null Chennai Member</span>
                    <span className="text-blue-600 font-medium">2024-Present</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Open Source Contributor</span>
                    <span className="text-blue-600 font-medium">2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Component
const Projects = () => {
  const [filter, setFilter] = useState('All');
  
  const projects: Project[] = [
    {
      id: 1,
      title: "JWT Authentication with CSRF Protection",
      description: "Designed and enforced JWT-based authentication with RSA key signing, enhancing token security and integrity Fused CSRF protection for state-changing requests, reducing the risk of cross-site request forgery attacks by 100% on protected endpoints.",
      tech: ["Node.js", "MongoDB", "RSA"],
      github: "https://github.com/Narayanan-K-InFoSeC/JWT_CSRF_Advanced",
      category: "Security"
    },
    {
      id: 2,
      title: "File Upload Security Best Practices",
      description: "This is a secure file upload API built using Node.js and Express, following best practices to handle file uploads with proper validation and security measures.",
      tech: ["Node.js"],
      github: "https://github.com/Narayanan-K-InFoSeC/File_Upload_Security_Best_Practices",
      category: "Security"
    },
  ];

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            A collection of projects showcasing expertise in web development, cybersecurity, and modern technologies.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-200 text-sm sm:text-base ${
                filter === category
                  ? 'bg-red-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 shadow-sm hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              <div className={`h-1.5 ${
                project.category === 'Security' ? 'bg-gradient-to-r from-red-600 to-orange-600' :
                project.category === 'Web Development' ? 'bg-gradient-to-r from-blue-600 to-purple-600' :
                'bg-gradient-to-r from-green-600 to-teal-600'
              }`}></div>
              
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 pr-2">{project.title}</h3>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    project.category === 'Security' ? 'bg-red-100 text-red-700' :
                    project.category === 'Web Development' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {project.category}
                  </span>
                </div>
                
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm font-medium"
                    >
                      <GitHubIcon size={16} />
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200 text-sm font-medium"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button
            className="px-6 sm:px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            onClick={() => window.open('https://github.com/Narayanan-K-InFoSeC', '_blank', 'noopener,noreferrer')}
          >
            View All Projects
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

// Experience Component
const Experience = () => {
  const experiences: Experience[] = [
    {
      title: "DevSecOps Analyst | L3",
      company: "M2P Fintech Pvt Ltd - Chennai, IN",
      period: "2024 - Present",
      description: "DevSecOps Analyst with proven expertise in embedding security best practices throughout the software development lifecycle (SDLC). Proficient in leveraging industry-leading tools such as SonarQube, Gitleaks, Dependency-Track, DefectDojo, StackRox, Terrascan, and Trivy to drive secure coding, vulnerability management, and compliance automation. Skilled at strengthening pipelines with end-to-end security controls, ensuring both code quality and application resilience."
    },
    {
      title: "Security Engineer | L1 & L2",
      company: "Pepul Pvt Ltd - Chennai, IN",
      period: "2021 - 2024",
      description: "Offensive Security Engineer | Pepul Pvt Ltd - Chennai, IN Adaptable professional with 3+ years of experience specializing in DevSecOps and Offensive Security Engineering. Proficient in API Security Architecture, Penetration Testing, and Vulnerability Analysis within the cybersecurity domain. A skilled DevSecOps practitioner, adept at seamlessly integrating security measures into the software development lifecycle. Expertise includes implementing robust security practices, conducting thorough vulnerability assessments, and employing threat modeling to enhance overall application security. Known for effectively bridging non-technical stakeholders with technological complexities, fostering improved security and quality integration. Committed to promoting professional development and staying at the forefront of emerging DevSecOps trends."
    },
  ];

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Experience</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Professional journey building secure, innovative solutions across various industries.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  
                  <div className="flex-grow bg-gradient-to-br from-gray-50 to-red-50 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800">{exp.title}</h3>
                          {index === 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-red-600 font-medium text-sm sm:text-base">{exp.company}</p>
                      </div>
                      <span className="text-gray-500 text-xs sm:text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm inline-block w-fit">{exp.period}</span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
                
                {index < experiences.length - 1 && (
                  <div className="absolute left-5 sm:left-6 top-12 sm:top-14 w-0.5 h-12 sm:h-16 bg-gradient-to-b from-gray-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Certifications Component
const Certifications = () => {
  const upcoming = [
    { num: "01", name: "AWS Certified Security Specialty", issuer: "Amazon Web Services", abbr: "AWS", accent: "from-orange-500 to-amber-500", bg: "from-orange-50 to-amber-50", border: "border-orange-200", text: "text-orange-600" },
    { num: "02", name: "ISC2 CCSP", issuer: "ISC2 — Certified Cloud Security Professional", abbr: "ISC²", accent: "from-purple-500 to-violet-500", bg: "from-purple-50 to-violet-50", border: "border-purple-200", text: "text-purple-600" },
    { num: "03", name: "ISC2 CISSP", issuer: "ISC2 — Certified Information Systems Security Professional", abbr: "ISC²", accent: "from-purple-600 to-indigo-500", bg: "from-indigo-50 to-purple-50", border: "border-indigo-200", text: "text-indigo-600" },
    { num: "04", name: "OSCP+", issuer: "Offensive Security Certified Professional+", abbr: "OffSec", accent: "from-red-600 to-rose-500", bg: "from-red-50 to-rose-50", border: "border-red-200", text: "text-red-600" },
  ];

  return (
    <section id="certifications" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Continuous learning path in cloud security, offensive security, and industry-recognised credentials.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[
              { value: "5", label: "Total Planned", color: "text-gray-800", bg: "bg-white", border: "border-gray-100" },
              { value: "1", label: "In Progress", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
              { value: "4", label: "Upcoming", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} border ${s.border} rounded-xl p-4 sm:p-5 text-center shadow-sm`}>
                <div className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* In Progress — Featured card */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-gray-700 uppercase tracking-widest">Currently Working On</h3>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-6 sm:p-8 shadow-xl overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24 pointer-events-none" />

              <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Logo badge */}
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                  <span className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">GCP</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-semibold border border-white/30">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      In Progress
                    </span>
                    <span className="text-blue-200 text-xs font-medium">Google Cloud</span>
                  </div>
                  <h4 className="text-white font-bold text-lg sm:text-2xl leading-tight">
                    GCP Professional Cloud Security Engineer
                  </h4>
                  <p className="text-blue-200 text-sm mt-1">Professional-level cloud security certification by Google</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-200 text-xs font-medium">Study Progress</span>
                  <span className="text-white text-xs font-semibold">Active</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-emerald-300 rounded-full w-[45%] shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming — Numbered roadmap grid */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-gray-700 uppercase tracking-widest">Upcoming Roadmap</h3>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {upcoming.map((cert) => (
                <div
                  key={cert.num}
                  className={`group relative bg-gradient-to-br ${cert.bg} border ${cert.border} rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                >
                  {/* Number watermark */}
                  <span className="absolute top-3 right-4 text-5xl font-black text-gray-100 select-none leading-none pointer-events-none">
                    {cert.num}
                  </span>

                  <div className="relative flex items-start gap-4">
                    {/* Abbr badge */}
                    <div className={`flex-shrink-0 w-11 h-11 bg-gradient-to-br ${cert.accent} rounded-xl flex items-center justify-center shadow-md`}>
                      <span className="text-white font-extrabold text-xs leading-none text-center px-1">{cert.abbr}</span>
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/70 border border-gray-200 rounded-full text-xs font-medium text-gray-500">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                          Upcoming
                        </span>
                      </div>
                      <p className={`font-bold text-base sm:text-lg leading-snug ${cert.text}`}>{cert.name}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{cert.issuer}</p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${cert.accent} group-hover:w-full transition-all duration-500 rounded-full`} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setAlert({ type: 'error', message: 'Please enter your name' });
      return;
    }
    
    if (!formData.email.trim()) {
      setAlert({ type: 'error', message: 'Please enter your email address' });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setAlert({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }
    
    if (!formData.message.trim()) {
      setAlert({ type: 'error', message: 'Please enter a message' });
      return;
    }

    if (formData.message.trim().length < 10) {
      setAlert({ type: 'error', message: 'Message must be at least 10 characters long' });
      return;
    }

    setIsSubmitting(true);

    try {
      const mailtoUrl = `mailto:narayanan.k.infosec@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contact Form Submission')}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoUrl;
      
      // Clear the form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setAlert({ type: 'success', message: 'Opening your email client. Thank you for reaching out!' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to send message. Please try again or email directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Ready to collaborate on your next open source project? Let&apos;s discuss how we can work together.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Let&apos;s Connect</h3>
            
            <div className="space-y-5 sm:space-y-6 mb-6 sm:mb-8">
              <a href="mailto:narayanan.k.infosec@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-100 to-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm sm:text-base">Email</p>
                  <p className="text-gray-600 text-sm sm:text-base break-all">narayanan.k.infosec@gmail.com</p>
                </div>
              </a>
              
              <a href="https://github.com/Narayanan-K-InFoSeC" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <GitHubIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm sm:text-base">GitHub</p>
                  <p className="text-gray-600 text-sm sm:text-base break-all">github.com/Narayanan-K-InFoSeC</p>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/narayanan-k1/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <LinkedInIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm sm:text-base">LinkedIn</p>
                  <p className="text-gray-600 text-sm sm:text-base break-all">linkedin.com/in/narayanan-k1/</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center shadow-md">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm sm:text-base">Location</p>
                  <p className="text-gray-600 text-sm sm:text-base">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
            
            <div className="space-y-5 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="Your name"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  placeholder="Project discussion"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project or how I can help..."
                  disabled={isSubmitting}
                />
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg text-sm sm:text-base ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-red-700 hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-xl sm:text-2xl font-bold text-white">Portfolio</div>
            <div className="text-red-600 font-bold text-lg sm:text-xl">Narayanan K</div>
          </div>
          
          <p className="text-gray-400 mb-6 text-sm sm:text-base px-4">
            Building secure digital solutions for a connected world.
          </p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://github.com/Narayanan-K-InFoSeC" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-all duration-200 transform hover:scale-110">
              <GitHubIcon size={22} className="sm:w-6 sm:h-6" />
            </a>
            <a href="https://www.linkedin.com/in/narayanan-k1/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-all duration-200 transform hover:scale-110">
              <LinkedInIcon size={22} className="sm:w-6 sm:h-6" />
            </a>
            <a href="mailto:narayanan.k.infosec@gmail.com" className="text-gray-400 hover:text-red-600 transition-all duration-200 transform hover:scale-110">
              <Mail size={22} className="sm:w-6 sm:h-6" />
            </a>
          </div>
          
          <div className="border-t border-gray-700 pt-6 sm:pt-8">
            <p className="text-gray-500 text-xs sm:text-sm px-4">
              © 2026 Narayanan K. Made with ❤️ in Chennai, India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function Page() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <ScrollProgress />
      <BackToTop />
      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <Header />
      <Home />
      <About />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}