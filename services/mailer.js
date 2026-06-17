import { Resend } from "resend";
import { getTemplate } from "../config/emailTemplates.js";   

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.MAIL_FROM || "admission@techversity.ai";

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
}