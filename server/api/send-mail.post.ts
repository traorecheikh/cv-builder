import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { name, email, subject, message } = body

  if (!name || !email || !subject || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tous les champs sont requis',
    })
  }

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: Number(config.smtpPort) === 465,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  try {
    await transporter.sendMail({
      from: config.smtpUser,
      to: config.contactReceiver,
      replyTo: email,
      subject: `New Contact: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1171B8;">Nouveau message de contact</h2>
          <hr style="border: 1px solid #E5E7EB; margin: 20px 0;">

          <div style="background-color: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nom:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Sujet:</strong> ${subject}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <p style="color: #4B5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <hr style="border: 1px solid #E5E7EB; margin: 20px 0;">
          <p style="color: #9CA3AF; font-size: 12px; text-align: center;">
            Ce message a été envoyé depuis votre formulaire de contact portfolio.
          </p>
        </div>
      `,
      text: `
Nouveau message de contact

Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}

---
Ce message a été envoyé depuis votre formulaire de contact portfolio.
      `,
    })

    return { success: true, message: 'Email envoyé avec succès' }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de l\'envoi de l\'email',
    })
  }
})
