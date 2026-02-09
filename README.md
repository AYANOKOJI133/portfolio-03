# 🚀 ADIL ERRABHY - Portfolio Website

A modern, production-ready portfolio website showcasing my skills in C Programming, Web Development, and 3D Modeling. Built with cutting-edge technologies to demonstrate my technical abilities and creative projects.

## ✨ Technology Stack

This portfolio is built with:

### 🎯 Core Framework
- **⚡ Next.js 16** - Modern React framework with App Router for fast, SEO-friendly pages
- **📘 TypeScript 5** - Type-safe development for robust, maintainable code
- **🎨 Tailwind CSS 4** - Utility-first CSS framework for beautiful, responsive design

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - High-quality, accessible components built on Radix UI
- **🎯 Lucide React** - Beautiful & consistent icon library
- **🌈 Framer Motion** - Smooth animations for engaging user experience
- **🎨 Next Themes** - Dark mode support for comfortable viewing

### 🎨 3D Graphics & Visualization
- **🎮 React Three Fiber** - React renderer for Three.js, enabling interactive 3D graphics
- **🎨 @react-three/drei** - Useful helpers for 3D scenes (OrbitControls, Environment, etc.)
- **📦 Three.js** - Powerful 3D library for rendering models in the browser
- **🎯 GLTF/GLB Support** - Display 3D models created in Blender

### 📋 Forms & Validation
- **🎣 React Hook Form** - Performant forms with easy validation
- **✅ Zod** - TypeScript-first schema validation

### 🔄 State Management & Data Fetching
- **🐻 Zustand** - Simple, scalable state management
- **🔄 TanStack Query** - Powerful data synchronization for React
- **🌐 Fetch** - Modern HTTP requests

### 🗄️ Database & Backend
- **🗄️ Prisma** - Type-safe database ORM
- **🔐 NextAuth.js** - Authentication solution (if needed for future features)

## 🎯 Project Features

- **🏎️ Fast & Responsive** - Optimized for performance across all devices
- **🎨 Beautiful UI** - Modern design with shadcn/ui components and smooth animations
- **🔒 Type Safe** - Full TypeScript configuration with Zod validation
- **📱 Mobile First** - Responsive design with smooth transitions
- **🎮 3D Interactive** - Interactive 3D model viewer with rotate, zoom, and pan controls
- **🌐 SEO Friendly** - Optimized metadata and OpenGraph tags
- **🎨 Dark Mode** - Automatic theme switching for comfortable viewing

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run linter
bun run lint
```

Open [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Main portfolio page
│   ├── layout.tsx      # Root layout with metadata
│   └── api/            # API routes (contact form, etc.)
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   ├── 3d-model-viewer.tsx  # 3D model display component
│   ├── 3d-projects-modal.tsx # 3D project popup modal
│   └── three-provider.tsx    # Three.js configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
│   ├── glTF-loader.ts  # 3D model loading utilities
│   └── db.ts           # Database client
public/
├── models/             # 3D model files (.glb, .glb)
└── [assets]            # Images and static files
```

## 🎨 Portfolio Sections

### 🏠 Hero Section
- Animated particle background
- Typewriter effect for roles
- Call-to-action buttons

### 👤 About Section
- Personal introduction
- Skills overview with progress bars
- Language proficiency
- Key statistics and achievements

### 💼 Projects Section
- Filterable project gallery (Web Dev, C Programming, Game Dev)
- Live demo links
- Technology badges
- Responsive card layout

### 🎮 3D Projects Section
- Interactive 3D model viewer
- Models created in Blender
- Rotate, zoom, and pan controls
- Modal popup for detailed view

### 📬 Contact Section
- Social media links
- Email contact information
- Internship opportunities message

## 🎨 How to Add Your 3D Models

1. Create your 3D model in Blender
2. Export as `.glb` or `.gltf` format
3. Place the file in `/public/models/`
4. Add a thumbnail image (PNG/JPG) in the same folder
5. Update the `projects3D` array in `src/app/page.tsx`

Example:
```typescript
{
  id: 101,
  title: 'Your 3D Model',
  description: 'Description of your 3D project',
  modelUrl: '/models/your-model.glb',
  image: '/models/your-model.png',
  scale: 1,
  technologies: ['Blender', '3D Modeling', 'Texturing'],
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy!

### Other Platforms
This project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- Digital Ocean App Platform

## 📧 Contact

- **Email**: adilerrabhy133@gmail.com
- **GitHub**: https://github.com/AYANOKOJI133
- **LinkedIn**: https://www.linkedin.com/in/adil-errabhy-81307932a/

---

Built with ❤️ by **ADIL ERRABHY** - C Programming Enthusiast & Engineering Student at ENSA Agadir
