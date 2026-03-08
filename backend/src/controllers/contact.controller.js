import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

const userEmailHtml = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#ec4899);padding:48px 40px;border-radius:16px 16px 0 0;text-align:center;">
              <h1 style="margin:0;font-size:32px;font-weight:900;color:#fff;letter-spacing:-1px;">Vad.er</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">Your one-stop shop for everything you love</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#fff;padding:48px 40px;">
              <h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#111827;">We got your message! 👋</h2>
              <p style="margin:0 0 24px;color:#6b7280;font-size:16px;line-height:1.6;">
                Hi <strong style="color:#111827;">${name}</strong>, thanks for reaching out. Our team has received your message and will get back to you as soon as possible.
              </p>

              <!-- Card -->
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin:24px 0;">
                <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">What happens next?</p>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                  ${['We review your message carefully', 'Our team prepares a personalized response', 'You hear back from us within 24–48h'].map((step, i) => `
                  <tr>
                    <td style="padding:8px 0;vertical-align:top;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:28px;height:28px;background:#4f46e5;border-radius:50%;text-align:center;vertical-align:middle;">
                            <span style="color:#fff;font-size:12px;font-weight:800;">${i + 1}</span>
                          </td>
                          <td style="padding-left:12px;color:#374151;font-size:14px;line-height:1.5;">${step}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>`).join('')}
                </table>
              </div>

              <p style="margin:24px 0 0;color:#6b7280;font-size:14px;line-height:1.6;">
                In the meantime, feel free to browse our latest products or reach us directly at
                <a href="mailto:${process.env.RESEND_EMAIL}" style="color:#4f46e5;font-weight:600;text-decoration:none;">${process.env.RESEND_EMAIL}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111827;padding:32px 40px;border-radius:0 0 16px 16px;text-align:center;">
              <p style="margin:0 0 8px;font-size:18px;font-weight:900;color:#fff;">Vad.er</p>
              <p style="margin:0;color:#6b7280;font-size:12px;">123 Commerce St, Digital City · 
                <a href="mailto:support@vader.com" style="color:#6b7280;text-decoration:none;">support@vader.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const adminEmailHtml = (name, email, message, subject) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#111827;padding:32px 40px;border-radius:16px 16px 0 0;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">New Contact Message</p>
              <h1 style="margin:0;font-size:24px;font-weight:900;color:#fff;">From ${name}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#fff;padding:40px;">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:4px 0;">
                    <span style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Name</span><br>
                    <span style="font-size:15px;color:#111827;font-weight:600;">${name}</span>
                  </td>
                </tr>
                <tr><td style="padding:12px 0 4px;">
                  <span style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Email</span><br>
                  <a href="mailto:${email}" style="font-size:15px;color:#4f46e5;font-weight:600;text-decoration:none;">${email}</a>
                </td></tr>
                <tr><td style="padding:12px 0 4px;">
                  <span style="font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Subject</span><br>
                  <span style="font-size:15px;color:#111827;font-weight:600;">${subject}</span>
                </td></tr>
              </table>

              <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 24px;">

              <!-- Message -->
              <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Message</p>
              <div style="background:#f9fafb;border-left:4px solid #4f46e5;border-radius:0 8px 8px 0;padding:20px;color:#374151;font-size:15px;line-height:1.7;">
                ${message}
              </div>

              <a href="mailto:${email}" style="display:inline-block;margin-top:24px;padding:12px 28px;background:#4f46e5;color:#fff;font-weight:700;font-size:14px;border-radius:8px;text-decoration:none;">
                Reply to ${name}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;border:1px solid #e5e7eb;border-top:none;padding:20px 40px;border-radius:0 0 16px 16px;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">Vad.er Admin Panel · Internal notification</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const sendContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
    console.log(name, email, subject, message);
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      // Change to user email in production
      to: process.env.RESEND_EMAIL,
      subject: '✉️ We received your message — Vad.er',
      html: userEmailHtml(name)
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RESEND_EMAIL,
      subject: `📬 New message from ${name}`,
      html: adminEmailHtml(name, email, message, subject)
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
};