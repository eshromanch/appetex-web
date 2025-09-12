import nodemailer from 'nodemailer';

// Create transporter using your Poste.io mail server
const transporter = nodemailer.createTransport({
  host: '194.195.90.237',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'admin@athenadevtech.com',
    pass: process.env.SMTP_PASSWORD || 'your-mail-password',
  },
  tls: {
    rejectUnauthorized: false
  }
});

export interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface QuoteEmailData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  items: Array<{
    productName: string;
    quantity: number;
    notes?: string;
    isCustom?: boolean;
  }>;
  totalItems: number;
  notes?: string;
}

export async function sendContactNotification(data: ContactEmailData) {
  try {
    const mailOptions = {
      from: `"Appatex Contact Form" <${process.env.SMTP_USER || 'admin@athenadevtech.com'}>`,
      to: 'info@appatexbd.com',
      subject: `New Contact Form Submission - ${data.subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
            ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #333;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 8px; font-size: 14px; color: #6c757d;">
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Reply to:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Contact Information:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ''}
${data.company ? `- Company: ${data.company}` : ''}
${data.subject ? `- Subject: ${data.subject}` : ''}

Message:
${data.message}

Submitted: ${new Date().toLocaleString()}
Reply to: ${data.email}
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Contact notification email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendQuoteNotification(data: QuoteEmailData) {
  try {
    const itemsHtml = data.items.map(item => `
      <div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #007bff;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong style="color: #333;">${item.productName}</strong>
          <span style="background: #007bff; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
            Qty: ${item.quantity}
          </span>
        </div>
        ${item.notes ? `<p style="margin: 5px 0; color: #666; font-size: 14px;"><em>Notes: ${item.notes}</em></p>` : ''}
        ${item.isCustom ? `<span style="background: #ffc107; color: #000; padding: 2px 6px; border-radius: 3px; font-size: 11px;">Custom Product</span>` : ''}
      </div>
    `).join('');

    const mailOptions = {
      from: `"Appatex Quote Request" <${process.env.SMTP_USER || 'admin@athenadevtech.com'}>`,
      to: 'info@appatexbd.com',
      subject: `New Quote Request - ${data.firstName} ${data.lastName} (${data.totalItems} items)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
            New Quote Request
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
            ${data.country ? `<p><strong>Country:</strong> ${data.country}</p>` : ''}
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Quote Items (${data.totalItems} total)</h3>
            ${itemsHtml}
          </div>
          
          ${data.notes ? `
            <div style="background: #fff3cd; padding: 20px; border: 1px solid #ffeaa7; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #856404; margin-top: 0;">Additional Notes</h3>
              <p style="line-height: 1.6; color: #856404;">${data.notes.replace(/\n/g, '<br>')}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 8px; font-size: 14px; color: #6c757d;">
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Reply to:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Total Items:</strong> ${data.totalItems}</p>
          </div>
        </div>
      `,
      text: `
New Quote Request

Customer Information:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ''}
${data.company ? `- Company: ${data.company}` : ''}
${data.country ? `- Country: ${data.country}` : ''}

Quote Items (${data.totalItems} total):
${data.items.map(item => `- ${item.productName} (Qty: ${item.quantity})${item.notes ? ` - Notes: ${item.notes}` : ''}${item.isCustom ? ' [Custom Product]' : ''}`).join('\n')}

${data.notes ? `Additional Notes:\n${data.notes}\n` : ''}

Submitted: ${new Date().toLocaleString()}
Reply to: ${data.email}
Total Items: ${data.totalItems}
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Quote notification email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending quote notification email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
