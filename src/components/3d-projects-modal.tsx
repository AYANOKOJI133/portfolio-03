'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Model3DViewer from './3d-model-viewer'

interface Project3D {
  id: number
  title: string
  description: string
  modelUrl: string
  scale?: number
  technologies: string[]
}

interface Model3DModalProps {
  project: Project3D | null
  isOpen: boolean
  onClose: () => void
}

export default function Model3DModal({ project, isOpen, onClose }: Model3DModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-6xl h-[90vh] sm:h-[85vh] bg-slate-900 border-purple-500/20 p-0 overflow-hidden flex flex-col">
        <div className="relative bg-slate-950/50 border-b border-purple-500/10 shrink-0 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-slate-800 w-8 h-8 sm:w-10 sm:h-10 z-30"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <div className="p-4 sm:p-6 pb-3 sm:pb-4 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-center sm:text-left">
                {project.title}
              </DialogTitle>
              <p className="text-gray-400 mt-2 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none text-center sm:text-left">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3 justify-center sm:justify-start">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20 shrink-0"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 relative min-h-0">
          <Model3DViewer
            modelUrl={project.modelUrl}
            scale={project.scale || 1}
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
