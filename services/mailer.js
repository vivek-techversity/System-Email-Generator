import { Resend } from "resend";
import { getTemplate } from "../config/emailTemplates.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.MAIL_FROM || "admission@techversity.ai";
const ALERT_TO = "support@techversity.ai";

export async function sendCourseEmail(lead) {
 

  const tpl = getTemplate(lead.programme);
  const firstName = (lead.name || "there").split(" ")[0];

  const result = await resend.emails.send({
    from: `Techversity Admissions <${FROM}>`,
    to: lead.email,
    replyTo: FROM,
    subject: tpl.subject,
    html: tpl.html(firstName),
  });

  console.log("RESEND RESULT:", JSON.stringify(result));

  if (result.error) {
    throw new Error(result.error.message || JSON.stringify(result.error));
  }
}

export async function sendFailureAlert(lead, errorMessage) {
  try {
    const result = await resend.emails.send({
      from: `Techversity System <${FROM}>`,
      to: ALERT_TO,
      subject: `⚠️ Email Failed - ${lead.name} (${lead.programme})`,
      html: `
        <h2>Auto Email Delivery Failed</h2>
        <p>The course email could <strong>not</strong> be sent to the following lead:</p>
        <table cellpadding="8" style="border-collapse:collapse; font-family:sans-serif;">
          <tr><td><strong>Name</strong></td><td>${lead.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${lead.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${lead.phone}</td></tr>
          <tr><td><strong>Programme</strong></td><td>${lead.programme}</td></tr>
          <tr><td><strong>Country</strong></td><td>${lead.country}</td></tr>
          <tr><td><strong>Source</strong></td><td>${lead.source}</td></tr>
          <tr><td><strong>Time</strong></td><td>${new Date().toISOString()}</td></tr>
          <tr><td><strong>Error</strong></td><td style="color:red;">${errorMessage}</td></tr>
        </table>
        <p>Lead has been saved to Google Sheets. Please send the email manually.</p>
      `,
    });

    if (result.error) {
      console.error("Failure alert could not be sent:", result.error.message);
      return;
    }

    console.log("Failure alert sent to support@techversity.ai ✅");
  } catch (alertErr) {
    console.error("Could not send failure alert:", alertErr?.message);
  }
}