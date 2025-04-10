import sgMail from "@sendgrid/mail";

export const sendEmail = async (formData) => {
  sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

  const msg = {
    to: import.meta.env.VITE_EMAIL_TO, // Your email address where you want to receive messages
    from: import.meta.env.VITE_EMAIL_FROM, // Your verified SendGrid sender
    subject: `New Contact Form Submission from ${formData.name}`,
    text: `
      Name: ${formData.name}
      Company: ${formData.company}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Project Details: ${formData.project}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Company:</strong> ${formData.company}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Project Details:</strong><br>${formData.project}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error("SendGrid Error:", error);
    throw new Error("Failed to send email");
  }
};
