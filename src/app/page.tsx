'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/use-toast'
import { Github, Linkedin, Mail, ExternalLink, Code, Menu, X, Phone, FileText, Instagram, ChevronDown, Sparkles, Award, Target, Zap, Cpu, Brain, GitBranch, Box, FileCode, Globe, Layers, Languages, Download, Briefcase, Rocket } from 'lucide-react'
import Model3DModal from '@/components/3d-projects-modal'

type ProjectCategory = 'all' | 'web' | 'c' | 'game' | 'design'

interface Project {
  id: number
  title: string
  category: ProjectCategory
  description: string
  liveLink?: string
  codeLink?: string
  image: string
  technologies: string[]
}

interface SocialLink {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  color: string
}

const profile = {
  name: 'ADIL ERRABHY',
  roles: ['C Programming Enthusiast', 'Web Developer', 'Engineering Student'],
  bio: 'I\'m a 19-year-old engineering student at ENSA Agadir, passionate about programming with a deep focus on C and Python. I\'ve built +17 small games in C and developed web applications using HTML, CSS, and JavaScript. I\'m currently advancing my skills in web development and game development, with a strong emphasis on building interactive and performance-oriented projects.',
  image: '/profile-photo.png',
  skills: [
    { name: 'C Programming', level: 60, icon: <Code className="w-6 h-6" /> },
    { name: 'HTML / CSS', level: 60, icon: <Globe className="w-6 h-6" /> },
    { name: 'JavaScript', level: 60, icon: <FileCode className="w-6 h-6" /> },
    { name: 'Python', level: 60, icon: <Layers className="w-6 h-6" /> },
    { name: 'Problem Solving', level: 70, icon: <Brain className="w-6 h-6" /> },
    { name: 'Git / GitHub', level: 75, icon: <GitBranch className="w-6 h-6" /> },
    { name: 'Arduino', level: 65, icon: <Cpu className="w-6 h-6" /> },
    { name: 'LaTeX', level: 70, icon: <FileText className="w-6 h-6" /> },
    { name: '3D Modeling', level: 70, icon: <Box className="w-6 h-6" /> },
    { name: 'Data Structures', level: 40, icon: <Target className="w-6 h-6" /> },
  ],
  stats: [
    { value: '5+', label: '3D models', icon: <Box className="w-5 h-5" /> },
    { value: '5+', label: 'Web Projects', icon: <Code className="w-5 h-5" /> },
    { value: '19', label: 'Years Old', icon: <Target className="w-5 h-5" /> },
    { value: 'ENSA', label: 'CP2 Student', icon: <Zap className="w-5 h-5" /> },
  ],
  socials: [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'adilerrabhy133@gmail.com', href: 'mailto:adilerrabhy133@gmail.com', color: 'text-blue-400' },
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', value: 'github.com/AYANOKOJI133', href: 'https://github.com/AYANOKOJI133', color: 'text-purple-400' },
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', value: 'linkedin.com/in/adil-errabhy', href: 'https://www.linkedin.com/in/adil-errabhy-81307932a/', color: 'text-blue-500' },
  ],
  languages: [
    { name: 'Arabic', level: 100, icon: <Languages className="w-6 h-6" /> },
    { name: 'English', level: 80, icon: <Languages className="w-6 h-6" /> },
    { name: 'French', level: 80, icon: <Languages className="w-6 h-6" /> },
    { name: 'Spanish', level: 30, icon: <Languages className="w-6 h-6" /> },
  ],
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Err Craft',
    category: 'game',
    description: 'Err Craft is a browser-based 3D voxel sandbox game built with Three.js, featuring procedural world generation, block-based building, and RPG-style combat. It demonstrates advanced game logic, real-time 3D rendering, and physics simulation entirely within the web browser.',
    codeLink: 'https://github.com/AYANOKOJI133/minecraft.git',
    liveLink: 'https://ayanokoji133.github.io/minecraft/',
    image: '/err-craft.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Three.js', 'Game Logic', 'AI'],
  },
  {
    id: 2,
    title: 'Cyber Chess',
    category: 'game',
    description: 'Cyber Chess is a browser-based chess game with a neon cyberpunk aesthetic. It supports all standard chess rules, including Castling, En Passant, and Pawn Promotion. Players can play in local 2-Player mode or against an AI opponent, with sound effects, move history tracking, and a responsive, mobile-friendly interface.',
    codeLink: 'https://github.com/AYANOKOJI133/chess.git',
    liveLink: 'https://ayanokoji133.github.io/chess/',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&h=400&fit=crop',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Web Audio API', 'UI/UX'],
  },
  {
    id: 3,
    title: 'C Games Collection',
    category: 'c',
    description: 'A collection of 17 small games built entirely in C, demonstrating various programming concepts, game logic, and console graphics.',
    codeLink: 'https://github.com/AYANOKOJI133/C-games.git',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    technologies: ['C', 'Game Logic', 'Console I/O', 'Data Structures'],
  },
  {
    id: 4,
    title: 'Adil-Err Personal Website',
    category: 'web',
    description: 'Err Portfolio is a personal website that showcases my projects, skills, and achievements. It features a modern responsive design, interactive UI components, and a clean layout to present my programming and game development work professionally.',
    codeLink: 'https://github.com/AYANOKOJI133/adil-err-personal-website.git',
    liveLink: 'https://adil-err-personal-website.vercel.app/?chapter=1',
    image: '/adil-err-personal-website.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX'],
  },
  {
    id: 5,
    title: 'Cyber_Type',
    category: 'game',
    description: 'FastTyping is a browser-based typing speed trainer that helps users improve accuracy and words-per-minute (WPM) through real-time feedback. It features dynamic text challenges, live error highlighting, countdown timers, performance statistics, and a clean, responsive interface optimized for both desktop and mobile devices.',
    codeLink: 'https://github.com/AYANOKOJI133/fast-typing.git',
    liveLink: 'https://ayanokoji133.github.io/fast-typing/',
    image: '/models/fast-typing.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX'],
  },
  {
    id: 6,
    title: 'Cyber_Maze',
    category: 'game',
    description: 'RoboMaze is a browser-based maze game where players control a robotic explorer through industrial-style labyrinths inspired by mechatronics environments. It features smooth keyboard controls, animated mechanical obstacles, sensor-themed traps, timed challenges, and progressively harder levels in a responsive web interface.',
    codeLink: 'https://github.com/AYANOKOJI133/cyber-maze.git',
    liveLink: 'https://ayanokoji133.github.io/cyber-maze/',
    image: '/models/Cyber-maze.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX'],
  },
]

const projects3D = [
  {
    id: 101,
    title: 'Noor Mosaic Lantern',
    description: 'A decorative Moroccan-inspired lantern featuring geometric Islamic patterns with colorful glass inserts, designed to cast artistic light reflections in interior spaces.',
    modelUrl: '/models/001.glb',
    image: '/models/001.png', 
    scale: 1,
    technologies: ['Blender', '3D Modeling', 'Texturing'],
  },
  {
    id: 102,
    title: 'Geometric Stone Light Block',
    description: 'A modern stone-textured cube with carved geometric openings, combining traditional Islamic motifs with minimalist architectural design.',
    modelUrl: '/models/002.glb',
    image: '/models/002.png', 
    scale: 1,
    technologies: ['Blender', '3D Modeling', 'Texturing'],
  },
  {
    id: 103,
    title: 'Illuminated Arch Wall Niche',
    description: 'A wall-mounted decorative light inspired by Moroccan arches, featuring a glowing geometric centerpiece that blends tradition with modern lighting design.',
    modelUrl: '/models/003.glb',
    image: '/models/003.png', 
    scale: 1,
    technologies: ['Blender', '3D Modeling', 'Texturing'],
  },
  {
    id: 104,
    title: 'CRRT Tech Logo Scene',
    description: 'A futuristic 3D branding scene combining a robotic hand with a clean tech logo, symbolizing innovation, AI, and modern digital engineering.',
    modelUrl: '/models/004.glb',
    image: '/models/004.png', 
    scale: 1,
    technologies: ['Blender', '3D Modeling', 'Texturing'],
  },
  {
    id: 105,
    title: 'Carved Islamic Stone Panel',
    description: 'A detailed stone relief panel featuring traditional Islamic geometric and floral patterns, designed as architectural wall art or heritage decor.',
    modelUrl: '/models/005.glb',
    image: '/models/005.png', 
    scale: 1,
    technologies: ['Blender', '3D Modeling', 'Texturing'],
  },
  {
    id: 106,
    title: 'Marble Petal Stone Sculpture',
    description: 'An abstract marble-inspired stone sculpture featuring smooth layered curves and polished surfaces, designed to reflect light naturally while emphasizing organic flow and modern minimalism.',
    modelUrl: '/models/006.glb',
    image: '/models/006.png', 
    scale: 1,
    technologies: ['Blender', '3D Modeling', 'Texturing'],
  },
]

interface Project3D {
  id: number
  title: string
  description: string
  modelUrl: string
  image?: string  // Optional thumbnail image
  scale?: number
  technologies: string[]
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [typewriterText, setTypewriterText] = useState('')
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  const [selected3DProject, setSelected3DProject] = useState<Project3D | null>(null)
  const [is3DModalOpen, setIs3DModalOpen] = useState(false)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Typewriter effect
  useEffect(() => {
    const currentRole = profile.roles[currentRoleIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          setTypewriterText(currentRole.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setIsDeleting(true)
        }
      } else {
        if (charIndex > 0) {
          setTypewriterText(currentRole.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setCurrentRoleIndex((currentRoleIndex + 1) % profile.roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentRoleIndex])

  // Particle background effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = []
    const particleCount = 80

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(139, 92, 246, 0.5)'
        ctx.fill()

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 150)})`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles()
    })

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', '3d-projects', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories: { value: ProjectCategory; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'game', label: 'Game Dev' },
    { value: 'c', label: 'C Programming' },
    { value: 'web', label: 'Web Dev' },
    { value: 'design', label: 'LaTeX' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                &lt;AE/&gt;
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'projects', label: 'Projects' },
                { id: '3d-projects', label: '3D Projects' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors relative ${
                    activeSection === item.id
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-5 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'projects', label: 'Projects' },
                { id: '3d-projects', label: '3D Projects' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-4 pt-16 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Welcome to my creative space</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>

          <div className="h-16 mb-8">
            <p className="text-xl sm:text-2xl text-gray-300 font-mono">
              I'm a{' '}
              <span className="text-cyan-400 font-semibold">{typewriterText}</span>
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold px-8 py-6 text-base rounded-full shadow-lg shadow-purple-500/25 transition-all hover:scale-105"
            >
              View My Work
              <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-2 border-purple-500/50 hover:bg-purple-500/20 hover:border-purple-500 text-white font-semibold px-8 py-6 text-base rounded-full transition-all hover:scale-105 bg-slate-900/50"
            >
              Get In Touch
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-cyan-400">Me</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
              Passionate about creating exceptional digital experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative mx-auto lg:mx-0">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-80 h-80 object-cover rounded-2xl shadow-2xl mx-auto"
                />
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">I build things for the web</h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                I'm a passionate developer with a deep focus on C programming and web development. 
                I love creating efficient, scalable solutions and learning new technologies.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Currently studying at ENSA Agadir (CP2), I'm dedicated to mastering 
                advanced C programming concepts while expanding my web development skills.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {profile.stats.map((stat, index) => (
                  <div key={index} className="bg-slate-900/50 border border-purple-500/20 rounded-xl p-4 text-center hover:border-purple-500/40 transition-colors">
                    <div className="flex justify-center mb-2 text-purple-400">
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="pt-6">
                <h4 className="text-lg sm:text-xl font-semibold mb-4 text-white">Languages</h4>
                <div className="grid grid-cols-2 gap-4">
                  {profile.languages.map((language, index) => (
                    <div key={index} className="bg-slate-900/50 border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/40 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-purple-400">{language.icon}</span>
                        <span className="text-lg font-semibold text-white">{language.name}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${language.level}%` }}
                        />
                      </div>
                      <p className="text-right text-sm text-gray-400 mt-2">{language.level}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-20">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">My Skills</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {profile.skills.map((skill, index) => (
                <div key={index} className="bg-slate-900/50 border border-purple-500/20 rounded-xl p-4 sm:p-6 hover:border-purple-500/40 transition-all h-full flex flex-col sm:block">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4 flex-1 sm:flex-none items-center justify-center sm:justify-start">
                    <span className="text-purple-400 sm:text-2xl shrink-0">{skill.icon}</span>
                    <span className="text-base sm:text-lg font-semibold text-white line-clamp-2 sm:line-clamp-1">{skill.name}</span>
                  </div>
                  <div className="mt-auto w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-right text-sm text-gray-400 mt-2">{skill.level}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              My <span className="text-cyan-400">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A showcase of my best work and personal projects
            </p>
          </div>

          {/* Filter and Search */}
          <div className="mb-10 space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.value)}
                  className={
                    selectedCategory === category.value
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'border-purple-500/50 text-gray-300 hover:bg-purple-500/10'
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
            <div className="max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900/50 border-purple-500/20 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105 overflow-hidden cursor-pointer group"
                onClick={() => {
                  if (project.liveLink) {
                    window.open(project.liveLink, '_blank', 'noopener,noreferrer')
                  }
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  {project.liveLink && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs sm:text-sm">
                        Live Demo
                      </Badge>
                    </div>
                  )}
                  {project.liveLink && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/90 text-white rounded-full font-medium">
                          <ExternalLink className="w-4 h-4" />
                          View Live Demo
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg sm:text-xl text-white group-hover:text-cyan-400 transition-colors">{project.title}</CardTitle>
                  <CardDescription className="text-gray-400 text-sm line-clamp-3 sm:line-clamp-none">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        View Code <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No projects found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <Separator className="bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* 3D Projects Section */}
      <section
        id="3d-projects"
        className="py-20 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              My <span className="text-cyan-400">3D Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Interactive 3D models created with Blender. Click on any project to explore it in 3D!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects3D.map((project) => (
              <Card
                key={project.id}
                className="bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105 overflow-hidden cursor-pointer group"
                onClick={() => {
                  setSelected3DProject(project)
                  setIs3DModalOpen(true)
                }}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Box className="w-24 h-24 text-purple-500/50 group-hover:text-purple-500/80 transition-colors group-hover:scale-110 transform" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs sm:text-sm">
                      Interactive 3D
                    </Badge>
                  </div>
                  {/* Hover overlay - View 3D Model */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/90 text-white rounded-full font-medium">
                        <Box className="w-4 h-4" />
                        View 3D Model
                      </span>
                    </div>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg sm:text-xl text-white">{project.title}</CardTitle>
                  <CardDescription className="text-gray-400 text-sm line-clamp-3 sm:line-clamp-none">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {projects3D.length === 0 && (
            <div className="text-center py-12">
              <Box className="w-24 h-24 mx-auto text-purple-500/30 mb-4" />
              <p className="text-gray-400 text-lg mb-2">No 3D projects yet</p>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Export your Blender projects as .glb files and add them to the <code className="bg-purple-500/10 px-2 py-1 rounded">/public/models</code> folder, then update the <code className="bg-purple-500/10 px-2 py-1 rounded">projects3D</code> array in <code className="bg-purple-500/10 px-2 py-1 rounded">src/app/page.tsx</code>
              </p>
            </div>
          )}
        </div>
      </section>

      <Separator className="bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Get In <span className="text-cyan-400">Touch</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl font-bold text-white text-center">Open to Internship Opportunities!</h3>
            <p className="text-gray-300 text-lg leading-relaxed text-center">
              I'm currently seeking an internship in software engineering, mechatronics, or technical fields where I can apply my skills, learn from experienced engineers, and contribute to meaningful projects.
            </p>

            <div className="space-y-4">
              {profile.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-slate-900/50 border border-purple-500/20 hover:border-purple-500/50 p-4 rounded-xl transition-all hover:scale-105 group"
                >
                  <span className={social.color}>{social.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">{social.label}</p>
                    <p className="text-white font-medium">{social.value}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/80 backdrop-blur-lg border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                &lt;AE/&gt;
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Built with passion and code by {profile.name}
            </p>
            <div className="flex justify-center gap-6">
              {profile.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:scale-110 transition-transform ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-6">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* 3D Model Modal */}
      <Model3DModal
        project={selected3DProject}
        isOpen={is3DModalOpen}
        onClose={() => {
          setIs3DModalOpen(false)
          setSelected3DProject(null)
        }}
      />
    </div>
  )
}
