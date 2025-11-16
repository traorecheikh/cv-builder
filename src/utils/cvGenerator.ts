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

  // === COLOR SCHEME ===
  const primaryBlue = { r: 17, g: 113, b: 184 }
  const accentOrange = { r: 230, g: 73, b: 34 }
  const darkText = { r: 40, g: 40, b: 40 }
  const greyText = { r: 100, g: 100, b: 100 }
  const lightGrey = { r: 240, g: 240, b: 240 }

  // === PAGE LAYOUT - SIDEBAR + CONTENT ===
  const sidebarWidth = 70
  let contentX = sidebarWidth + 12
  let contentWidth = pageWidth - contentX - 12

  // SIDEBAR BACKGROUND
  pdf.setFillColor(lightGrey.r, lightGrey.g, lightGrey.b)
  pdf.rect(0, 0, sidebarWidth, pageHeight, 'F')

  // SIDEBAR - TOP SECTION
  let sideY = 15

  // Profile photo in sidebar
  if (profileImg) {
    try {
      pdf.addImage(profileImg, 'PNG', (sidebarWidth - 40) / 2, sideY, 40, 40, undefined, 'FAST')
      sideY += 45
    } catch (e) {
      console.error('Error adding image:', e)
    }
  } else {
    sideY += 45
  }

  // Name in sidebar
  pdf.setTextColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  const nameSplit = pdf.splitTextToSize(`${personalInfo.firstName}\n${personalInfo.lastName}`, sidebarWidth - 6)
  pdf.text(nameSplit, 3, sideY)
  sideY += 12

  // Title in sidebar
  pdf.setTextColor(accentOrange.r, accentOrange.g, accentOrange.b)
  pdf.setFontSize(7)
  pdf.setFont('helvetica', 'bold')
  const titleSplit = pdf.splitTextToSize(personalInfo.title, sidebarWidth - 6)
  pdf.text(titleSplit, 3, sideY)
  sideY += 10

  // CONTACT SECTION
  pdf.setTextColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('CONTACT', 5, sideY)
  sideY += 5

  pdf.setTextColor(darkText.r, darkText.g, darkText.b)
  pdf.setFontSize(6.5)
  pdf.setFont('helvetica', 'normal')
  pdf.text(personalInfo.email, 5, sideY)
  sideY += 3
  pdf.text(personalInfo.phone, 5, sideY)
  sideY += 3
  pdf.text(personalInfo.location, 5, sideY)
  sideY += 8

  // SKILLS SECTION IN SIDEBAR
  pdf.setTextColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('COMPÉTENCES', 5, sideY)
  sideY += 5

  pdf.setTextColor(darkText.r, darkText.g, darkText.b)
  pdf.setFontSize(6.5)
  pdf.setFont('helvetica', 'normal')
  const topSkills = [
    ...skills.applicativeDevelopment.slice(0, 5),
    ...skills.securityCloud.slice(0, 3),
  ]
  topSkills.forEach((skill) => {
    // Skill with bullet
    pdf.setFillColor(accentOrange.r, accentOrange.g, accentOrange.b)
    pdf.circle(7, sideY - 0.8, 0.8, 'F')
    pdf.text(skill, 9, sideY)
    sideY += 3.5
  })

  sideY += 3

  // LANGUAGES SECTION IN SIDEBAR
  pdf.setTextColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text('LANGUES', 5, sideY)
  sideY += 5

  pdf.setTextColor(darkText.r, darkText.g, darkText.b)
  pdf.setFontSize(6.5)
  pdf.setFont('helvetica', 'normal')
  languages.forEach((lang) => {
    pdf.text(`${lang.language}`, 5, sideY)
    sideY += 2.5

    // Language level bar
    pdf.setFillColor(220, 220, 220)
    pdf.rect(5, sideY, 30, 2, 'F')

    // Proficiency level visualization
    let profLevel = 0
    if (lang.speaking.includes('Fluent') || lang.speaking.includes('Courant')) profLevel = 28
    else if (lang.speaking.includes('Advanced') || lang.speaking.includes('Avancé')) profLevel = 22
    else if (lang.speaking.includes('Intermediate') || lang.speaking.includes('Intermédiaire')) profLevel = 16

    if (profLevel > 0) {
      pdf.setFillColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
      pdf.rect(5, sideY, profLevel, 2, 'F')
    }

    sideY += 4.5
  })

  // === MAIN CONTENT AREA ===
  let y = 15

  // HEADER - Name and Title
  pdf.setTextColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
  pdf.setFontSize(28)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`${personalInfo.firstName}`, contentX, y)

  pdf.setTextColor(accentOrange.r, accentOrange.g, accentOrange.b)
  pdf.setFontSize(28)
  pdf.text(`${personalInfo.lastName}`, contentX + 50, y)

  y += 10

  pdf.setTextColor(accentOrange.r, accentOrange.g, accentOrange.b)
  pdf.setFontSize(13)
  pdf.setFont('helvetica', 'normal')
  pdf.text(personalInfo.title, contentX, y)

  y += 8

  // Decorative line
  pdf.setDrawColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
  pdf.setLineWidth(1)
  pdf.line(contentX, y, contentX + contentWidth, y)
  y += 6

  // PROFESSIONAL SUMMARY
  pdf.setTextColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PROFIL PROFESSIONNEL', contentX, y)
  y += 4

  pdf.setTextColor(darkText.r, darkText.g, darkText.b)
  pdf.setFontSize(8.5)
  pdf.setFont('helvetica', 'normal')
  const bioLines = pdf.splitTextToSize(personalInfo.bio, contentWidth)
  pdf.text(bioLines, contentX, y)
  y += bioLines.length * 3.5 + 6

  // EXPERIENCE SECTION
  if (y > pageHeight - 50) {
    pdf.addPage()
    y = 20
  }

  y += 3
  pdf.setTextColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('EXPÉRIENCE PROFESSIONNELLE', contentX, y)
  y += 5

  experiences.forEach((exp) => {
    if (y > pageHeight - 25) {
      pdf.addPage()
      y = 20
    }

    // Timeline dot
    pdf.setFillColor(accentOrange.r, accentOrange.g, accentOrange.b)
    pdf.circle(contentX - 3, y - 0.5, 2.5, 'F')

    // Job title
    pdf.setTextColor(darkText.r, darkText.g, darkText.b)
    pdf.setFontSize(9.5)
    pdf.setFont('helvetica', 'bold')
    pdf.text(exp.role, contentX + 2, y)
    y += 3.5

    // Company with date on right
    pdf.setTextColor(greyText.r, greyText.g, greyText.b)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text(exp.company, contentX + 2, y)
    pdf.setTextColor(150, 150, 150)
    pdf.setFontSize(7.5)
    pdf.text(`${exp.startDate} - ${exp.endDate}`, contentX + 70, y)
    y += 3

    // Location
    pdf.setFontSize(7.5)
    pdf.text(exp.location, contentX + 2, y)
    y += 4

    // Description bullets
    pdf.setTextColor(70, 70, 70)
    pdf.setFontSize(8)
    exp.description.forEach((desc) => {
      const lines = pdf.splitTextToSize(`▪ ${desc}`, contentWidth - 5)
      pdf.text(lines, contentX + 2, y)
      y += lines.length * 3
    })
    y += 2
  })

  // EDUCATION SECTION
  if (y > pageHeight - 50) {
    pdf.addPage()
    y = 20
  }

  y += 3
  pdf.setTextColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('FORMATION', contentX, y)
  y += 5

  education.forEach((edu) => {
    if (y > pageHeight - 25) {
      pdf.addPage()
      y = 20
    }

    // Timeline dot
    pdf.setFillColor(accentOrange.r, accentOrange.g, accentOrange.b)
    pdf.circle(contentX - 3, y - 0.5, 2.5, 'F')

    // Degree
    pdf.setTextColor(darkText.r, darkText.g, darkText.b)
    pdf.setFontSize(9.5)
    pdf.setFont('helvetica', 'bold')
    pdf.text(edu.degree, contentX + 2, y)
    y += 3.5

    // Institution with date on right
    pdf.setTextColor(greyText.r, greyText.g, greyText.b)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text(edu.institution, contentX + 2, y)
    pdf.setTextColor(150, 150, 150)
    pdf.setFontSize(7.5)
    pdf.text(`${edu.startDate} - ${edu.endDate}`, contentX + 70, y)
    y += 3

    // Field
    pdf.setTextColor(greyText.r, greyText.g, greyText.b)
    pdf.setFontSize(7.5)
    pdf.text(edu.field || '', contentX + 2, y)
    y += 3.5

    // Highlights with custom bullets
    if (edu.highlights && edu.highlights.length > 0) {
      pdf.setTextColor(70, 70, 70)
      pdf.setFontSize(8)
      edu.highlights.forEach((h) => {
        const lines = pdf.splitTextToSize(`▪ ${h}`, contentWidth - 5)
        pdf.text(lines, contentX + 2, y)
        y += lines.length * 3
      })
    }
    y += 1
  })

  // PROJECTS SECTION (if available)
  if (projects.length > 0) {
    if (y > pageHeight - 50) {
      pdf.addPage()
      y = 20
    }

    y += 3
    pdf.setTextColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text('PROJETS CLÉS', contentX, y)
    y += 5

    projects.slice(0, 2).forEach((project) => {
      if (y > pageHeight - 25) {
        pdf.addPage()
        y = 20
      }

      // Timeline dot
      pdf.setFillColor(accentOrange.r, accentOrange.g, accentOrange.b)
      pdf.circle(contentX - 3, y - 0.5, 2.5, 'F')

      // Project name
      pdf.setTextColor(darkText.r, darkText.g, darkText.b)
      pdf.setFontSize(9.5)
      pdf.setFont('helvetica', 'bold')
      pdf.text(project.name, contentX + 2, y)
      y += 3.5

      // Description
      pdf.setTextColor(70, 70, 70)
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'normal')
      const projLines = pdf.splitTextToSize(project.description, contentWidth - 5)
      pdf.text(projLines, contentX + 2, y)
      y += projLines.length * 3 + 2

      // Technologies as badges
      pdf.setFontSize(6.5)
      let badgeX = contentX + 2
      project.technologies.slice(0, 5).forEach((tech) => {
        const w = pdf.getTextWidth(tech) + 3
        pdf.setFillColor(220, 220, 220)
        pdf.rect(badgeX, y - 2.5, w, 3.5, 'F')
        pdf.setTextColor(primaryBlue.r, primaryBlue.g, primaryBlue.b)
        pdf.text(tech, badgeX + 1.5, y)
        badgeX += w + 2
      })
      y += 4
    })
  }

  // Footer
  pdf.setFontSize(7)
  pdf.setTextColor(150, 150, 150)
  pdf.setFont('helvetica', 'italic')
  const date = new Date().toLocaleDateString('fr-FR')
  pdf.text(`CV généré le ${date}`, contentX, pageHeight - 10)

  return pdf
}
