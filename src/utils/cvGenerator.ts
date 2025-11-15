import { jsPDF } from 'jspdf'
import type { PersonalInfo, Experience, Education, Project } from '../stores/portfolio'

export const generateMindblowingCV = async (
  personalInfo: PersonalInfo,
  experiences: Experience[],
  education: Education[],
  projects: Project[],
  skills: any,
  languages: any[]
) => {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  
  // Load profile image
  let profileImg: string | null = null
  try {
    const response = await fetch('/profile.png')
    const blob = await response.blob()
    profileImg = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error('Failed to load profile image:', error)
  }

  // === PAGE LAYOUT ===
  // White background
  pdf.setFillColor(255, 255, 255)
  pdf.rect(0, 0, pageWidth, pageHeight, 'F')

  // === HEADER - Full width with photo ===
  let y = 25
  
  // Profile photo on left
  if (profileImg) {
    try {
      // Rounded square photo
      pdf.addImage(profileImg, 'PNG', 20, 15, 35, 35, undefined, 'FAST')
      
      // Blue border around photo
      pdf.setDrawColor(17, 113, 184)
      pdf.setLineWidth(1)
      pdf.rect(20, 15, 35, 35)
    } catch (e) {
      console.error('Error adding image:', e)
    }
  }

  // Name and title next to photo
  const nameX = 60
  pdf.setTextColor(44, 62, 80)
  pdf.setFontSize(28)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`${personalInfo.firstName} ${personalInfo.lastName}`, nameX, 25)
  
  // Title with orange color
  pdf.setTextColor(230, 73, 34)
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'normal')
  pdf.text(personalInfo.title, nameX, 35)
  
  // Contact info icons style
  y = 42
  pdf.setFontSize(9)
  pdf.setTextColor(100, 100, 100)
  pdf.setFont('helvetica', 'normal')
  
  // Email
  pdf.setTextColor(17, 113, 184)
  pdf.text('✉', nameX, y)
  pdf.setTextColor(100, 100, 100)
  pdf.text(personalInfo.email, nameX + 5, y)
  
  // Phone
  pdf.setTextColor(17, 113, 184)
  pdf.text('☎', nameX + 80, y)
  pdf.setTextColor(100, 100, 100)
  pdf.text(personalInfo.phone, nameX + 85, y)
  
  y += 5
  // Location
  pdf.setTextColor(17, 113, 184)
  pdf.text('⌖', nameX, y)
  pdf.setTextColor(100, 100, 100)
  pdf.text(personalInfo.location, nameX + 5, y)
  
  y = 60

  // Horizontal separator line
  pdf.setDrawColor(230, 73, 34)
  pdf.setLineWidth(0.8)
  pdf.line(20, y, pageWidth - 20, y)
  
  y += 10

  // === TWO COLUMN LAYOUT ===
  const leftColX = 20
  const leftColWidth = 55
  const rightColX = 80
  const rightColWidth = pageWidth - rightColX - 20

  // LEFT COLUMN
  let leftY = y

  // PROFILE
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184)
  pdf.text('PROFIL', leftColX, leftY)
  leftY += 2
  
  pdf.setLineWidth(0.5)
  pdf.line(leftColX, leftY, leftColX + 20, leftY)
  leftY += 5
  
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(60, 60, 60)
  const bioLines = pdf.splitTextToSize(personalInfo.bio, leftColWidth)
  pdf.text(bioLines, leftColX, leftY)
  leftY += bioLines.length * 3.5 + 8

  // COMPETENCES
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184)
  pdf.text('COMPETENCES', leftColX, leftY)
  leftY += 2
  
  pdf.setLineWidth(0.5)
  pdf.line(leftColX, leftY, leftColX + 30, leftY)
  leftY += 5
  
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(60, 60, 60)
  
  skills.applicativeDevelopment.slice(0, 15).forEach((skill: string) => {
    pdf.setFillColor(230, 73, 34)
    pdf.circle(leftColX + 1.5, leftY - 1, 0.8, 'F')
    pdf.text(skill, leftColX + 4, leftY)
    leftY += 3.5
  })
  
  leftY += 5

  // LANGUES
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184)
  pdf.text('LANGUES', leftColX, leftY)
  leftY += 2
  
  pdf.setLineWidth(0.5)
  pdf.line(leftColX, leftY, leftColX + 20, leftY)
  leftY += 5
  
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(60, 60, 60)
  
  languages.forEach((lang) => {
    pdf.setFont('helvetica', 'bold')
    pdf.text(`${lang.language}: ${lang.speaking}`, leftColX, leftY)
    leftY += 4
  })

  // RIGHT COLUMN
  let rightY = y

  // EXPERIENCE
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184)
  pdf.text('EXPERIENCE PROFESSIONNELLE', rightColX, rightY)
  rightY += 2
  
  pdf.setDrawColor(17, 113, 184)
  pdf.setLineWidth(0.5)
  pdf.line(rightColX, rightY, rightColX + 60, rightY)
  rightY += 6

  experiences.forEach((exp) => {
    if (rightY > pageHeight - 30) {
      pdf.addPage()
      rightY = 20
    }
    
    // Timeline dot
    pdf.setFillColor(230, 73, 34)
    pdf.circle(rightColX - 3, rightY - 1.5, 2, 'F')
    
    // Role
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(44, 62, 80)
    pdf.text(exp.role, rightColX, rightY)
    rightY += 5
    
    // Company and dates
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(17, 113, 184)
    pdf.text(exp.company, rightColX, rightY)
    
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(120, 120, 120)
    pdf.setFontSize(8)
    pdf.text(`${exp.startDate} - ${exp.endDate}`, rightColX + 50, rightY)
    rightY += 5
    
    // Description
    pdf.setFontSize(8)
    pdf.setTextColor(60, 60, 60)
    exp.description.forEach((desc) => {
      pdf.setFillColor(17, 113, 184)
      pdf.circle(rightColX + 1, rightY - 1, 0.5, 'F')
      const lines = pdf.splitTextToSize(desc, rightColWidth - 5)
      pdf.text(lines, rightColX + 3, rightY)
      rightY += lines.length * 3.5 + 0.5
    })
    rightY += 5
  })

  rightY += 3

  // FORMATION
  if (rightY > pageHeight - 60) {
    pdf.addPage()
    rightY = 20
  }
  
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184)
  pdf.text('FORMATION', rightColX, rightY)
  rightY += 2
  
  pdf.setDrawColor(17, 113, 184)
  pdf.setLineWidth(0.5)
  pdf.line(rightColX, rightY, rightColX + 30, rightY)
  rightY += 6
  
  education.forEach((edu) => {
    pdf.setFillColor(230, 73, 34)
    pdf.circle(rightColX - 3, rightY - 1.5, 2, 'F')
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(44, 62, 80)
    pdf.text(edu.degree, rightColX, rightY)
    rightY += 5
    
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(60, 60, 60)
    pdf.text(edu.institution, rightColX, rightY)
    rightY += 4
    
    pdf.setFontSize(8)
    pdf.setTextColor(120, 120, 120)
    pdf.text(`${edu.startDate} - ${edu.endDate}`, rightColX, rightY)
    rightY += 7
  })

  rightY += 3

  // PROJETS
  if (rightY > pageHeight - 50) {
    pdf.addPage()
    rightY = 20
  }
  
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(17, 113, 184)
  pdf.text('PROJETS CLES', rightColX, rightY)
  rightY += 2
  
  pdf.setDrawColor(17, 113, 184)
  pdf.setLineWidth(0.5)
  pdf.line(rightColX, rightY, rightColX + 30, rightY)
  rightY += 6
  
  projects.slice(0, 2).forEach((project) => {
    pdf.setFillColor(230, 73, 34)
    pdf.circle(rightColX - 3, rightY - 1.5, 2, 'F')
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(44, 62, 80)
    pdf.text(project.name, rightColX, rightY)
    rightY += 5
    
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(60, 60, 60)
    const projDesc = pdf.splitTextToSize(project.description, rightColWidth)
    pdf.text(projDesc, rightColX, rightY)
    rightY += projDesc.length * 3.5 + 3
    
    // Tech badges
    pdf.setFontSize(7)
    let badgeX = rightColX
    project.technologies.slice(0, 6).forEach((tech) => {
      const w = pdf.getTextWidth(tech) + 3
      pdf.setFillColor(240, 240, 240)
      pdf.roundedRect(badgeX, rightY - 3, w, 4, 0.5, 0.5, 'F')
      pdf.setTextColor(100, 100, 100)
      pdf.text(tech, badgeX + 1.5, rightY)
      badgeX += w + 2
    })
    rightY += 8
  })

  // Footer
  pdf.setFontSize(7)
  pdf.setTextColor(150, 150, 150)
  pdf.setFont('helvetica', 'italic')
  const date = new Date().toLocaleDateString('fr-FR')
  pdf.text(`CV genere le ${date}`, rightColX, pageHeight - 10)

  return pdf
}
