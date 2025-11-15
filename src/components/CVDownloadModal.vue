<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'
import { X } from 'lucide-vue-next'
import { jsPDF } from 'jspdf'

const emit = defineEmits<{
  close: []
}>()

const portfolioStore = usePortfolioStore()
const selectedTemplate = ref<'modern' | 'classic' | 'ats' | 'creative'>('modern')
const isGenerating = ref(false)

const templates = [
  { id: 'modern', name: 'Moderne', description: 'Design contemporain avec couleurs de marque' },
  { id: 'classic', name: 'Classique', description: 'Design traditionnel et professionnel' },
  { id: 'ats', name: 'ATS', description: 'Optimisé pour les systèmes de candidature' },
  { id: 'creative', name: 'Créatif', description: 'Avec sidebar et icônes' },
]

const generateModernCV = (pdf: jsPDF) => {
  const pageWidth = pdf.internal.pageSize.getWidth()
  let y = 0

  // Blue header bar
  pdf.setFillColor(17, 113, 184)
  pdf.rect(0, 0, pageWidth, 60, 'F')
  
  // Name and title in white
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(28)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`${portfolioStore.personalInfo.firstName} ${portfolioStore.personalInfo.lastName}`, 20, 25)
  
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'normal')
  pdf.text(portfolioStore.personalInfo.title, 20, 35)
  
  // Contact info in header
  pdf.setFontSize(9)
  pdf.text(`${portfolioStore.personalInfo.email} • ${portfolioStore.personalInfo.phone} • ${portfolioStore.personalInfo.location}`, 20, 45)
  
  // Reset to black for body
  pdf.setTextColor(0, 0, 0)
  y = 75

  // Profile section
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184)
  pdf.text('PROFIL', 20, y)
  y += 7
  
  pdf.setTextColor(0, 0, 0)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  const bioLines = pdf.splitTextToSize(portfolioStore.personalInfo.bio, pageWidth - 40)
  pdf.text(bioLines, 20, y)
  y += bioLines.length * 5 + 10

  // Experience section
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184)
  pdf.text('EXPÉRIENCE PROFESSIONNELLE', 20, y)
  y += 8
  
  portfolioStore.experiences.forEach((exp, index) => {
    if (y > 260) {
      pdf.addPage()
      y = 20
    }
    
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text(exp.role, 20, y)
    y += 5
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${exp.company} • ${exp.location}`, 20, y)
    y += 4
    
    pdf.setFontSize(9)
    pdf.setTextColor(100, 100, 100)
    pdf.text(`${exp.startDate} - ${exp.endDate}`, 20, y)
    y += 6
    
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(9)
    exp.description.forEach((desc) => {
      const lines = pdf.splitTextToSize(`• ${desc}`, pageWidth - 45)
      pdf.text(lines, 25, y)
      y += lines.length * 4
    })
    y += 5
  })

  // Education section
  if (y > 240) {
    pdf.addPage()
    y = 20
  }
  
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184)
  pdf.text('FORMATION', 20, y)
  y += 8
  
  portfolioStore.education.forEach((edu) => {
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text(edu.degree, 20, y)
    y += 5
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${edu.institution} • ${edu.location}`, 20, y)
    y += 4
    
    pdf.setFontSize(9)
    pdf.setTextColor(100, 100, 100)
    pdf.text(`${edu.startDate} - ${edu.endDate}`, 20, y)
    y += 6
    
    if (edu.highlights) {
      pdf.setTextColor(0, 0, 0)
      edu.highlights.forEach((h) => {
        pdf.text(`• ${h}`, 25, y)
        y += 4
      })
    }
    y += 4
  })

  // Skills section
  if (y > 220) {
    pdf.addPage()
    y = 20
  }
  
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184)
  pdf.text('COMPÉTENCES', 20, y)
  y += 8
  
  pdf.setTextColor(0, 0, 0)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  const skillsText = portfolioStore.skills.applicativeDevelopment.slice(0, 15).join(' • ')
  const skillLines = pdf.splitTextToSize(skillsText, pageWidth - 40)
  pdf.text(skillLines, 20, y)
  y += skillLines.length * 4 + 5

  // Languages
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184)
  pdf.text('LANGUES', 20, y)
  y += 7
  
  pdf.setTextColor(0, 0, 0)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  portfolioStore.languages.forEach((lang) => {
    pdf.text(`${lang.language}: ${lang.speaking}`, 20, y)
    y += 4
  })
}

const generateClassicCV = (pdf: jsPDF) => {
  const pageWidth = pdf.internal.pageSize.getWidth()
  let y = 30

  // Header - centered
  pdf.setFontSize(24)
  pdf.setFont('helvetica', 'bold')
  const name = `${portfolioStore.personalInfo.firstName} ${portfolioStore.personalInfo.lastName}`
  pdf.text(name, pageWidth / 2, y, { align: 'center' })
  y += 8

  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  pdf.text(portfolioStore.personalInfo.title, pageWidth / 2, y, { align: 'center' })
  y += 8

  pdf.setFontSize(9)
  pdf.text(`${portfolioStore.personalInfo.email} | ${portfolioStore.personalInfo.phone} | ${portfolioStore.personalInfo.location}`, pageWidth / 2, y, { align: 'center' })
  y += 15

  // Horizontal line
  pdf.setDrawColor(0, 0, 0)
  pdf.line(20, y, pageWidth - 20, y)
  y += 10

  // Profile
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PROFIL PROFESSIONNEL', 20, y)
  y += 7
  
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  const bioLines = pdf.splitTextToSize(portfolioStore.personalInfo.bio, pageWidth - 40)
  pdf.text(bioLines, 20, y)
  y += bioLines.length * 5 + 10

  // Experience
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('EXPÉRIENCE PROFESSIONNELLE', 20, y)
  y += 7
  
  portfolioStore.experiences.forEach((exp) => {
    if (y > 260) {
      pdf.addPage()
      y = 20
    }
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text(exp.role, 20, y)
    
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${exp.startDate} - ${exp.endDate}`, pageWidth - 60, y, { align: 'right' })
    y += 5
    
    pdf.text(`${exp.company}, ${exp.location}`, 20, y)
    y += 6
    
    pdf.setFontSize(9)
    exp.description.forEach((desc) => {
      const lines = pdf.splitTextToSize(`• ${desc}`, pageWidth - 45)
      pdf.text(lines, 25, y)
      y += lines.length * 4
    })
    y += 5
  })

  // Education
  if (y > 240) {
    pdf.addPage()
    y = 20
  }
  
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('FORMATION', 20, y)
  y += 7
  
  portfolioStore.education.forEach((edu) => {
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text(edu.degree, 20, y)
    
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${edu.startDate} - ${edu.endDate}`, pageWidth - 60, y, { align: 'right' })
    y += 5
    
    pdf.text(`${edu.institution}, ${edu.location}`, 20, y)
    y += 8
  })

  // Skills
  if (y > 220) {
    pdf.addPage()
    y = 20
  }
  
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.text('COMPÉTENCES', 20, y)
  y += 7
  
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  const skillsText = portfolioStore.skills.applicativeDevelopment.slice(0, 15).join(', ')
  const skillLines = pdf.splitTextToSize(skillsText, pageWidth - 40)
  pdf.text(skillLines, 20, y)
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
  const sidebarWidth = 65
  
  // Sidebar - colored background
  pdf.setFillColor(44, 62, 80)
  pdf.rect(0, 0, sidebarWidth, 297, 'F')
  
  // Profile section in sidebar
  let sideY = 20
  
  // Initials circle
  pdf.setFillColor(230, 73, 34)
  pdf.circle(sidebarWidth / 2, sideY + 10, 12, 'F')
  
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  const initials = `${portfolioStore.personalInfo.firstName.charAt(0)}${portfolioStore.personalInfo.lastName.charAt(0)}`
  pdf.text(initials, sidebarWidth / 2, sideY + 14, { align: 'center' })
  
  sideY += 35

  // Contact in sidebar
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('CONTACT', 10, sideY)
  sideY += 6
  
  pdf.setFontSize(7)
  pdf.setFont('helvetica', 'normal')
  const emailLines = pdf.splitTextToSize(portfolioStore.personalInfo.email, sidebarWidth - 15)
  pdf.text(emailLines, 10, sideY)
  sideY += emailLines.length * 3 + 4
  
  const phoneLines = pdf.splitTextToSize(portfolioStore.personalInfo.phone, sidebarWidth - 15)
  pdf.text(phoneLines, 10, sideY)
  sideY += phoneLines.length * 3 + 4
  
  const locLines = pdf.splitTextToSize(portfolioStore.personalInfo.location, sidebarWidth - 15)
  pdf.text(locLines, 10, sideY)
  sideY += locLines.length * 3 + 10

  // Skills in sidebar
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('COMPÉTENCES', 10, sideY)
  sideY += 6
  
  pdf.setFontSize(7)
  pdf.setFont('helvetica', 'normal')
  portfolioStore.skills.applicativeDevelopment.slice(0, 10).forEach((skill) => {
    const skillLines = pdf.splitTextToSize(skill, sidebarWidth - 15)
    pdf.text(skillLines, 10, sideY)
    sideY += skillLines.length * 3 + 1
  })
  
  sideY += 5

  // Languages in sidebar
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('LANGUES', 10, sideY)
  sideY += 6
  
  pdf.setFontSize(7)
  pdf.setFont('helvetica', 'normal')
  portfolioStore.languages.forEach((lang) => {
    pdf.text(lang.language, 10, sideY)
    sideY += 3
    pdf.text(lang.speaking, 10, sideY)
    sideY += 5
  })

  // Main content area
  pdf.setTextColor(0, 0, 0)
  let y = 25
  const leftMargin = sidebarWidth + 15

  // Name and title
  pdf.setFontSize(22)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`${portfolioStore.personalInfo.firstName} ${portfolioStore.personalInfo.lastName}`, leftMargin, y)
  y += 8

  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(230, 73, 34)
  pdf.text(portfolioStore.personalInfo.title, leftMargin, y)
  y += 12

  // Profile
  pdf.setTextColor(0, 0, 0)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PROFIL', leftMargin, y)
  y += 6
  
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')
  const bioLines = pdf.splitTextToSize(portfolioStore.personalInfo.bio, pageWidth - leftMargin - 15)
  pdf.text(bioLines, leftMargin, y)
  y += bioLines.length * 4 + 10

  // Experience
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('EXPÉRIENCE', leftMargin, y)
  y += 6
  
  portfolioStore.experiences.forEach((exp) => {
    if (y > 260) {
      pdf.addPage()
      
      // Redraw sidebar on new page
      pdf.setFillColor(44, 62, 80)
      pdf.rect(0, 0, sidebarWidth, 297, 'F')
      
      y = 20
      pdf.setTextColor(0, 0, 0)
    }
    
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.text(exp.role, leftMargin, y)
    y += 4
    
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`, leftMargin, y)
    y += 5
    
    pdf.setFontSize(8)
    exp.description.forEach((desc) => {
      const lines = pdf.splitTextToSize(`• ${desc}`, pageWidth - leftMargin - 15)
      pdf.text(lines, leftMargin + 3, y)
      y += lines.length * 3.5
    })
    y += 4
  })

  // Education
  if (y > 240) {
    pdf.addPage()
    pdf.setFillColor(44, 62, 80)
    pdf.rect(0, 0, sidebarWidth, 297, 'F')
    y = 20
  }
  
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('FORMATION', leftMargin, y)
  y += 6
  
  portfolioStore.education.forEach((edu) => {
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.text(edu.degree, leftMargin, y)
    y += 4
    
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${edu.institution} | ${edu.startDate} - ${edu.endDate}`, leftMargin, y)
    y += 6
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
    emit('close')
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error)
    alert('Erreur: ' + (error as Error).message)
  } finally {
    isGenerating.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-lg" @click="emit('close')">
    <div
      class="bg-white rounded-xl shadow-card max-w-2xl w-full max-h-96 overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-accent-light-gray px-2xl py-lg flex items-center justify-between z-10">
        <h2 class="text-2xl font-bold text-accent-dark-gray">Télécharger Mon CV</h2>
        <button
          @click="emit('close')"
          class="p-sm hover:bg-accent-light-gray rounded-lg transition-colors duration-300"
        >
          <X class="w-6 h-6 text-accent-dark-gray" />
        </button>
      </div>

      <!-- Templates Grid -->
      <div class="p-2xl">
        <p class="text-accent-text-secondary mb-lg">Choisissez un style de CV professionnel :</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-lg mb-2xl">
          <label
            v-for="template in templates"
            :key="template.id"
            class="cursor-pointer"
          >
            <input
              type="radio"
              :value="template.id"
              v-model="selectedTemplate"
              class="sr-only"
            />
            <div
              :class="[
                'p-lg border-2 rounded-lg transition-all duration-300',
                selectedTemplate === template.id
                  ? 'border-primary-blue bg-accent-light-blue'
                  : 'border-accent-light-gray hover:border-primary-blue',
              ]"
            >
              <h3 class="font-semibold text-accent-dark-gray mb-sm">{{ template.name }}</h3>
              <p class="text-sm text-accent-text-secondary">{{ template.description }}</p>
            </div>
          </label>
        </div>

        <!-- Download Button -->
        <button
          @click="generatePDF"
          :disabled="isGenerating"
          class="w-full py-lg bg-primary-orange text-white font-semibold rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-soft hover:shadow-card"
        >
          {{ isGenerating ? 'Génération en cours...' : 'Télécharger le CV' }}
        </button>
      </div>
    </div>
  </div>
</template>
