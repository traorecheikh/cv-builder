<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'
import { useToast } from '../composables/useToast'
import { X, Sparkles, FileText, Shield, Palette } from 'lucide-vue-next'
import { jsPDF } from 'jspdf'

const emit = defineEmits<{
  close: []
}>()

const portfolioStore = usePortfolioStore()
const { success, error } = useToast()
const selectedTemplate = ref<'modern' | 'classic' | 'ats' | 'creative'>('modern')
const isGenerating = ref(false)

const templates = [
  { id: 'modern', name: 'Moderne', description: 'Design contemporain avec couleurs de marque', icon: Sparkles },
  { id: 'classic', name: 'Classique', description: 'Design traditionnel et professionnel', icon: FileText },
  { id: 'ats', name: 'ATS', description: 'Optimisé pour les systèmes de candidature', icon: Shield },
  { id: 'creative', name: 'Créatif', description: 'Avec sidebar et icônes', icon: Palette },
]

const generateModernCV = (pdf: jsPDF) => {
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 18
  const contentWidth = pageWidth - margin * 2
  let y = margin

  // Professional header with name and title
  pdf.setTextColor(17, 113, 184) // Blue
  pdf.setFontSize(32)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`${portfolioStore.personalInfo.firstName} ${portfolioStore.personalInfo.lastName}`, margin, y)
  y += 10

  pdf.setTextColor(230, 73, 34) // Orange for subtitle
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'normal')
  pdf.text(portfolioStore.personalInfo.title, margin, y)
  y += 8

  // Contact info in a clean format
  pdf.setTextColor(100, 100, 100)
  pdf.setFontSize(9)
  const contactInfo = `${portfolioStore.personalInfo.email} | ${portfolioStore.personalInfo.phone} | ${portfolioStore.personalInfo.location}`
  pdf.text(contactInfo, margin, y)
  y += 12

  // Divider line
  pdf.setDrawColor(17, 113, 184)
  pdf.setLineWidth(0.5)
  pdf.line(margin, y, pageWidth - margin, y)
  y += 8

  // Professional Summary
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PROFIL PROFESSIONNEL', margin, y)
  y += 6

  pdf.setTextColor(40, 40, 40)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  const bioLines = pdf.splitTextToSize(portfolioStore.personalInfo.bio, contentWidth)
  pdf.text(bioLines, margin, y)
  y += bioLines.length * 4 + 8

  // Experience section
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('EXPÉRIENCE PROFESSIONNELLE', margin, y)
  y += 7

  portfolioStore.experiences.forEach((exp) => {
    if (y > pageHeight - 30) {
      pdf.addPage()
      y = margin
    }

    // Job title in bold
    pdf.setTextColor(40, 40, 40)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text(exp.role, margin, y)
    y += 4

    // Company and location
    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${exp.company} • ${exp.location}`, margin, y)
    y += 3

    // Dates
    pdf.setFontSize(8)
    pdf.text(`${exp.startDate} - ${exp.endDate}`, margin, y)
    y += 5

    // Description bullets
    pdf.setTextColor(60, 60, 60)
    pdf.setFontSize(9)
    exp.description.forEach((desc) => {
      const lines = pdf.splitTextToSize(`• ${desc}`, contentWidth - 5)
      pdf.text(lines, margin + 3, y)
      y += lines.length * 3.5
    })
    y += 4
  })

  // Education section
  if (y > 230) {
    pdf.addPage()
    y = margin
  }

  y += 4
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('FORMATION', margin, y)
  y += 7

  portfolioStore.education.forEach((edu) => {
    if (y > pageHeight - 30) {
      pdf.addPage()
      y = margin
    }

    // Degree name in bold
    pdf.setTextColor(40, 40, 40)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text(edu.degree, margin, y)
    y += 4

    // Institution and location
    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${edu.institution} • ${edu.location}`, margin, y)
    y += 3

    // Dates
    pdf.setFontSize(8)
    pdf.text(`${edu.startDate} - ${edu.endDate}`, margin, y)
    y += 5

    // Highlights if available
    if (edu.highlights && edu.highlights.length > 0) {
      pdf.setTextColor(60, 60, 60)
      pdf.setFontSize(9)
      edu.highlights.forEach((highlight) => {
        const lines = pdf.splitTextToSize(`• ${highlight}`, contentWidth - 5)
        pdf.text(lines, margin + 3, y)
        y += lines.length * 3.5
      })
    }
    y += 4
  })

  // Skills section
  if (y > 230) {
    pdf.addPage()
    y = margin
  }

  y += 4
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('COMPÉTENCES PRINCIPALES', margin, y)
  y += 7

  // Group skills by category for better presentation
  const skillCategories = [
    { name: 'Développement', skills: portfolioStore.skills.applicativeDevelopment },
    { name: 'Cloud & Sécurité', skills: portfolioStore.skills.securityCloud },
    { name: 'IA & ML', skills: portfolioStore.skills.aiML },
  ]

  skillCategories.forEach((category) => {
    if (y > pageHeight - 40) {
      pdf.addPage()
      y = margin
    }

    pdf.setTextColor(40, 40, 40)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.text(category.name + ':', margin, y)
    y += 4

    pdf.setTextColor(60, 60, 60)
    pdf.setFontSize(8.5)
    pdf.setFont('helvetica', 'normal')
    const skillsText = category.skills.slice(0, 10).join(', ')
    const skillLines = pdf.splitTextToSize(skillsText, contentWidth)
    pdf.text(skillLines, margin + 3, y)
    y += skillLines.length * 3.5 + 3
  })

  // Languages section
  if (y > 230) {
    pdf.addPage()
    y = margin
  }

  y += 4
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('LANGUES', margin, y)
  y += 7

  pdf.setTextColor(40, 40, 40)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')

  portfolioStore.languages.forEach((lang) => {
    const proficiency = `${lang.speaking} (Compréhension: ${lang.comprehension}, Écrit: ${lang.writing})`
    const langText = `${lang.language} — ${proficiency}`
    const lines = pdf.splitTextToSize(langText, contentWidth - 5)
    pdf.text(lines, margin, y)
    y += lines.length * 3.5 + 2
  })
}

const generateClassicCV = (pdf: jsPDF) => {
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 18
  const contentWidth = pageWidth - margin * 2
  let y = 20

  // Professional header - left aligned
  pdf.setTextColor(17, 113, 184) // Blue
  pdf.setFontSize(28)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`${portfolioStore.personalInfo.firstName} ${portfolioStore.personalInfo.lastName}`, margin, y)
  y += 9

  pdf.setTextColor(40, 40, 40)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  pdf.text(portfolioStore.personalInfo.title, margin, y)
  y += 7

  // Contact info
  pdf.setTextColor(100, 100, 100)
  pdf.setFontSize(8.5)
  const contactInfo = `${portfolioStore.personalInfo.email} | ${portfolioStore.personalInfo.phone} | ${portfolioStore.personalInfo.location}`
  pdf.text(contactInfo, margin, y)
  y += 10

  // Divider line
  pdf.setDrawColor(17, 113, 184)
  pdf.setLineWidth(0.3)
  pdf.line(margin, y, pageWidth - margin, y)
  y += 9

  // Professional Summary
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PROFIL PROFESSIONNEL', margin, y)
  y += 6

  pdf.setTextColor(40, 40, 40)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  const bioLines = pdf.splitTextToSize(portfolioStore.personalInfo.bio, contentWidth)
  pdf.text(bioLines, margin, y)
  y += bioLines.length * 4 + 8

  // Experience section
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('EXPÉRIENCE PROFESSIONNELLE', margin, y)
  y += 7

  portfolioStore.experiences.forEach((exp) => {
    if (y > pageHeight - 30) {
      pdf.addPage()
      y = margin
    }

    pdf.setTextColor(40, 40, 40)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text(exp.role, margin, y)
    y += 4

    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${exp.company} • ${exp.location}`, margin, y)
    y += 3

    pdf.setFontSize(8)
    pdf.text(`${exp.startDate} - ${exp.endDate}`, margin, y)
    y += 5

    pdf.setTextColor(60, 60, 60)
    pdf.setFontSize(9)
    exp.description.forEach((desc) => {
      const lines = pdf.splitTextToSize(`• ${desc}`, contentWidth - 5)
      pdf.text(lines, margin + 3, y)
      y += lines.length * 3.5
    })
    y += 4
  })

  // Education section
  if (y > 230) {
    pdf.addPage()
    y = margin
  }

  y += 4
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('FORMATION', margin, y)
  y += 7

  portfolioStore.education.forEach((edu) => {
    if (y > pageHeight - 30) {
      pdf.addPage()
      y = margin
    }

    pdf.setTextColor(40, 40, 40)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text(edu.degree, margin, y)
    y += 4

    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${edu.institution} • ${edu.location}`, margin, y)
    y += 3

    pdf.setFontSize(8)
    pdf.text(`${edu.startDate} - ${edu.endDate}`, margin, y)
    y += 5

    if (edu.highlights && edu.highlights.length > 0) {
      pdf.setTextColor(60, 60, 60)
      pdf.setFontSize(9)
      edu.highlights.forEach((highlight) => {
        const lines = pdf.splitTextToSize(`• ${highlight}`, contentWidth - 5)
        pdf.text(lines, margin + 3, y)
        y += lines.length * 3.5
      })
    }
    y += 4
  })

  // Skills section
  if (y > 230) {
    pdf.addPage()
    y = margin
  }

  y += 4
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('COMPÉTENCES', margin, y)
  y += 7

  pdf.setTextColor(60, 60, 60)
  pdf.setFontSize(8.5)
  pdf.setFont('helvetica', 'normal')
  const skillsText = portfolioStore.skills.applicativeDevelopment.slice(0, 12).join(', ')
  const skillLines = pdf.splitTextToSize(skillsText, contentWidth)
  pdf.text(skillLines, margin, y)
}

const generateATSCV = (pdf: jsPDF) => {
  const pageWidth = pdf.internal.pageSize.getWidth()
  let y = 20

  // Simple header - no colors, no graphics, ATS-friendly
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`${portfolioStore.personalInfo.firstName} ${portfolioStore.personalInfo.lastName}`, 20, y)
  y += 7

  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'normal')
  pdf.text(portfolioStore.personalInfo.title, 20, y)
  y += 6

  pdf.setFontSize(9)
  pdf.text(portfolioStore.personalInfo.email, 20, y)
  y += 4
  pdf.text(portfolioStore.personalInfo.phone, 20, y)
  y += 4
  pdf.text(portfolioStore.personalInfo.location, 20, y)
  y += 10

  // Profile
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PROFESSIONAL SUMMARY', 20, y)
  y += 6
  
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  const bioLines = pdf.splitTextToSize(portfolioStore.personalInfo.bio, pageWidth - 40)
  pdf.text(bioLines, 20, y)
  y += bioLines.length * 5 + 8

  // Experience
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('WORK EXPERIENCE', 20, y)
  y += 6
  
  portfolioStore.experiences.forEach((exp) => {
    if (y > 260) {
      pdf.addPage()
      y = 20
    }
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text(exp.role, 20, y)
    y += 5
    
    pdf.setFont('helvetica', 'normal')
    pdf.text(exp.company, 20, y)
    y += 4
    
    pdf.setFontSize(9)
    pdf.text(`${exp.startDate} - ${exp.endDate} | ${exp.location}`, 20, y)
    y += 5
    
    exp.description.forEach((desc) => {
      const lines = pdf.splitTextToSize(`- ${desc}`, pageWidth - 45)
      pdf.text(lines, 25, y)
      y += lines.length * 4 + 1
    })
    y += 4
  })

  // Education
  if (y > 240) {
    pdf.addPage()
    y = 20
  }
  
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('EDUCATION', 20, y)
  y += 6
  
  portfolioStore.education.forEach((edu) => {
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text(edu.degree, 20, y)
    y += 5
    
    pdf.setFont('helvetica', 'normal')
    pdf.text(edu.institution, 20, y)
    y += 4
    
    pdf.setFontSize(9)
    pdf.text(`${edu.startDate} - ${edu.endDate}`, 20, y)
    y += 6
  })

  // Skills
  if (y > 220) {
    pdf.addPage()
    y = 20
  }
  
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('SKILLS', 20, y)
  y += 6
  
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  
  // List skills clearly for ATS parsing
  portfolioStore.skills.applicativeDevelopment.slice(0, 12).forEach((skill) => {
    pdf.text(`- ${skill}`, 20, y)
    y += 4
  })
}

const generateCreativeCV = (pdf: jsPDF) => {
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const sidebarWidth = 70

  // Sidebar - professional color
  pdf.setFillColor(17, 113, 184) // Enterprise Blue
  pdf.rect(0, 0, sidebarWidth, 297, 'F')

  // Profile section in sidebar
  let sideY = 18

  // Initials circle - Orange accent
  pdf.setFillColor(230, 73, 34) // Enterprise Orange
  pdf.circle(sidebarWidth / 2, sideY + 12, 14, 'F')

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(18)
  pdf.setFont('helvetica', 'bold')
  const initials = `${portfolioStore.personalInfo.firstName.charAt(0)}${portfolioStore.personalInfo.lastName.charAt(0)}`
  pdf.text(initials, sidebarWidth / 2, sideY + 16, { align: 'center' })

  sideY += 40

  // Contact in sidebar
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('CONTACT', 8, sideY)
  sideY += 5

  pdf.setFontSize(6.5)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(220, 230, 240)
  const emailLines = pdf.splitTextToSize(portfolioStore.personalInfo.email, sidebarWidth - 14)
  pdf.text(emailLines, 8, sideY)
  sideY += emailLines.length * 2.8 + 3

  const phoneLines = pdf.splitTextToSize(portfolioStore.personalInfo.phone, sidebarWidth - 14)
  pdf.text(phoneLines, 8, sideY)
  sideY += phoneLines.length * 2.8 + 3

  const locLines = pdf.splitTextToSize(portfolioStore.personalInfo.location, sidebarWidth - 14)
  pdf.text(locLines, 8, sideY)
  sideY += locLines.length * 2.8 + 10

  // Skills in sidebar
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('COMPÉTENCES', 8, sideY)
  sideY += 5

  pdf.setFontSize(6.5)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(220, 230, 240)
  portfolioStore.skills.applicativeDevelopment.slice(0, 12).forEach((skill) => {
    const skillLines = pdf.splitTextToSize(`• ${skill}`, sidebarWidth - 14)
    pdf.text(skillLines, 8, sideY)
    sideY += skillLines.length * 2.8 + 0.5
  })

  sideY += 3

  // Languages in sidebar
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('LANGUES', 8, sideY)
  sideY += 5

  pdf.setFontSize(6.5)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(220, 230, 240)
  portfolioStore.languages.forEach((lang) => {
    const langLines = pdf.splitTextToSize(`${lang.language}: ${lang.speaking}`, sidebarWidth - 14)
    pdf.text(langLines, 8, sideY)
    sideY += langLines.length * 2.8 + 1.5
  })

  // Main content area
  pdf.setTextColor(40, 40, 40)
  let y = 20
  const leftMargin = sidebarWidth + 12
  const contentWidth = pageWidth - leftMargin - 10

  // Name and title
  pdf.setFontSize(24)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184) // Blue
  pdf.text(`${portfolioStore.personalInfo.firstName} ${portfolioStore.personalInfo.lastName}`, leftMargin, y)
  y += 9

  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(230, 73, 34) // Orange
  pdf.text(portfolioStore.personalInfo.title, leftMargin, y)
  y += 10

  // Profile
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PROFIL PROFESSIONNEL', leftMargin, y)
  y += 5

  pdf.setTextColor(60, 60, 60)
  pdf.setFontSize(8.5)
  pdf.setFont('helvetica', 'normal')
  const bioLines = pdf.splitTextToSize(portfolioStore.personalInfo.bio, contentWidth)
  pdf.text(bioLines, leftMargin, y)
  y += bioLines.length * 3.5 + 8

  // Experience
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('EXPÉRIENCE PROFESSIONNELLE', leftMargin, y)
  y += 5

  portfolioStore.experiences.forEach((exp) => {
    if (y > pageHeight - 20) {
      pdf.addPage()

      // Redraw sidebar on new page
      pdf.setFillColor(17, 113, 184)
      pdf.rect(0, 0, sidebarWidth, 297, 'F')

      y = 20
    }

    pdf.setTextColor(40, 40, 40)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.text(exp.role, leftMargin, y)
    y += 4

    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${exp.company} • ${exp.location} | ${exp.startDate} - ${exp.endDate}`, leftMargin, y)
    y += 4

    pdf.setTextColor(60, 60, 60)
    pdf.setFontSize(8.5)
    exp.description.forEach((desc) => {
      const lines = pdf.splitTextToSize(`• ${desc}`, contentWidth - 3)
      pdf.text(lines, leftMargin + 2, y)
      y += lines.length * 3.2
    })
    y += 3
  })

  // Education
  if (y > pageHeight - 30) {
    pdf.addPage()
    pdf.setFillColor(17, 113, 184)
    pdf.rect(0, 0, sidebarWidth, 297, 'F')
    y = 20
  }

  y += 2
  pdf.setTextColor(17, 113, 184)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('FORMATION', leftMargin, y)
  y += 5

  portfolioStore.education.forEach((edu) => {
    if (y > pageHeight - 20) {
      pdf.addPage()
      pdf.setFillColor(17, 113, 184)
      pdf.rect(0, 0, sidebarWidth, 297, 'F')
      y = 20
    }

    pdf.setTextColor(40, 40, 40)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.text(edu.degree, leftMargin, y)
    y += 4

    pdf.setTextColor(100, 100, 100)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${edu.institution} • ${edu.location} | ${edu.startDate} - ${edu.endDate}`, leftMargin, y)
    y += 4

    if (edu.highlights && edu.highlights.length > 0) {
      pdf.setTextColor(60, 60, 60)
      pdf.setFontSize(8.5)
      edu.highlights.forEach((highlight) => {
        const lines = pdf.splitTextToSize(`• ${highlight}`, contentWidth - 3)
        pdf.text(lines, leftMargin + 2, y)
        y += lines.length * 3.2
      })
    }
    y += 2
  })
}

const generatePDF = () => {
  isGenerating.value = true
  try {
    const pdf = new jsPDF('p', 'mm', 'a4')

    switch (selectedTemplate.value) {
      case 'modern':
        generateModernCV(pdf)
        break
      case 'classic':
        generateClassicCV(pdf)
        break
      case 'ats':
        generateATSCV(pdf)
        break
      case 'creative':
        generateCreativeCV(pdf)
        break
    }

    pdf.save(`${portfolioStore.personalInfo.firstName}_${portfolioStore.personalInfo.lastName}_CV_${selectedTemplate.value}.pdf`)
    success('CV téléchargé avec succès!')
    emit('close')
  } catch (err) {
    console.error('Erreur lors de la génération du PDF:', err)
    error('Erreur: ' + (err as Error).message)
  } finally {
    isGenerating.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-lg" @click="emit('close')">
    <div
      class="bg-bg-secondary rounded-xl shadow-card max-w-2xl w-full max-h-96 overflow-y-auto border border-bg-tertiary"
      @click.stop
    >
      <!-- Header -->
      <div class="sticky top-0 bg-bg-secondary border-b border-bg-tertiary px-2xl py-lg flex items-center justify-between z-10">
        <h2 class="text-2xl font-bold text-text-primary">Télécharger Mon CV</h2>
        <button
          @click="emit('close')"
          class="p-sm hover:bg-bg-tertiary rounded-lg transition-colors duration-300"
        >
          <X class="w-6 h-6 text-text-secondary" />
        </button>
      </div>

      <!-- Templates Grid -->
      <div class="p-2xl">
        <p class="text-text-secondary mb-2xl text-sm font-medium">Choisissez un style de CV professionnel :</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-lg mb-2xl">
          <label
            v-for="template in templates"
            :key="template.id"
            class="cursor-pointer group"
          >
            <input
              type="radio"
              :value="template.id"
              v-model="selectedTemplate"
              class="sr-only"
            />
            <div
              :class="[
                'p-lg border-2 rounded-lg transition-all duration-300 hover:shadow-soft',
                selectedTemplate === template.id
                  ? 'border-primary-blue bg-bg-tertiary shadow-soft'
                  : 'border-bg-tertiary hover:border-primary-blue/50',
              ]"
            >
              <div class="flex items-start gap-md mb-md">
                <div
                  :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300',
                    selectedTemplate === template.id
                      ? 'bg-primary-blue text-white'
                      : 'bg-bg-tertiary text-primary-blue group-hover:bg-primary-blue/10',
                  ]"
                >
                  <component :is="template.icon" class="w-5 h-5" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-text-primary mb-xs">{{ template.name }}</h3>
                  <p class="text-xs text-text-tertiary leading-relaxed">{{ template.description }}</p>
                </div>
              </div>
            </div>
          </label>
        </div>

        <!-- Download Button -->
        <button
          @click="generatePDF"
          :disabled="isGenerating"
          class="w-full py-lg bg-primary-orange text-white font-semibold rounded-lg hover:opacity-90 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-soft hover:shadow-card disabled:hover:shadow-soft flex items-center justify-center gap-md"
        >
          <span v-if="isGenerating" class="inline-block animate-spin">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {{ isGenerating ? 'Génération en cours...' : 'Télécharger le CV' }}
        </button>
      </div>
    </div>
  </div>
</template>
