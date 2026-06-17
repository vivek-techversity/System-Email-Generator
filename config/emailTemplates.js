const CHARCOAL = "#222222";   // header / dark
const IVORY = "#F4F4F5";      // page bg (warm)
const CARD = "#FFFFFF";       // card
const GOLD = "#B8923E";       // accent
const GOLD_SOFT = "#B8923E";
const INK = "#3A3A3A";        // body text
const MUTED = "#888888";      // secondary
const LINE = "#ECECEC";       // divider
const YEAR = new Date().getFullYear();

const step = (num, title, body) => `
  <tr>
    <td style="padding: 16px 0 0; vertical-align: top;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td width="34" style="vertical-align: top;">
            <div style="width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;background:#F3ECDD;color:#B8923E;font-size:13px;font-weight:bold;font-family:Georgia,serif;">${num}</div>
          </td>
          <td style="vertical-align: top; padding-left: 12px;">
            <p style="margin:0 0 5px;font-size:15px;font-weight:bold;color:#222222;font-family:Arial,sans-serif;">${title}</p>
            <p style="margin:0;font-size:14px;color:#3A3A3A;line-height:1.65;font-family:Arial,sans-serif;">${body}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
`;

const build = ({ title, intro, steps, outro, dept }) => {
  const stepsHtml = steps.map((s, i) => step(i + 1, s[0], s[1])).join("");
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<style>
  :root { color-scheme: light only; supported-color-schemes: light only; }
  @media (max-width:600px){
    .tv-pad { padding: 26px 22px !important; }
    .tv-h1 { font-size: 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${IVORY};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${IVORY};padding:30px 14px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:${CARD};border-radius:8px;border:1px solid ${LINE};">

        <!-- Header: simple, light, just wordmark + gold underline -->
        <tr>
          <td class="tv-pad" style="padding:30px 34px 0;">
            <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:bold;color:${CHARCOAL};letter-spacing:0.5px;">
              Techversity<span style="color:${GOLD};">.ai</span>
            </div>
            <div style="margin-top:8px;height:2px;width:46px;background:${GOLD};line-height:2px;font-size:0;">&nbsp;</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="tv-pad" style="padding:24px 34px 34px;">
            <h1 class="tv-h1" style="margin:0 0 4px;font-family:Georgia,serif;font-size:22px;color:${CHARCOAL};font-weight:bold;">${title}</h1>
            <p style="margin:0 0 4px;font-size:14px;color:${MUTED};font-family:Arial,sans-serif;">Greetings,</p>
            <p style="margin:16px 0 4px;font-size:14px;color:${INK};line-height:1.75;font-family:Arial,sans-serif;">${intro}</p>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;">
              ${stepsHtml}
            </table>

            <p style="margin:26px 0 0;font-size:14px;color:${INK};line-height:1.75;font-family:Arial,sans-serif;">${outro}</p>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;border-top:1px solid ${LINE};">
              <tr><td style="padding-top:20px;font-family:Arial,sans-serif;font-size:14px;color:${INK};line-height:1.6;">
                Kind regards,<br/>
                <strong style="color:${CHARCOAL};">Admissions Office</strong><br/>
                <span style="color:${MUTED};">${dept}</span><br/>
                <a href="mailto:admissions@techversity.ai" style="color:${GOLD};text-decoration:none;">admissions@techversity.ai</a>
              </td></tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Footer (outside card) -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        <tr><td style="padding:18px 34px;text-align:center;">
          <p style="margin:0 0 3px;font-family:Arial,sans-serif;font-size:11px;color:${MUTED};">
            Techversity &mdash; Globally Accredited Doctorate Pathways
          </p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#AAAAAA;">
            This is an automated confirmation. &copy; ${YEAR} Techversity.
          </p>
        </td></tr>
      </table>

    </td></tr>
  </table>
</body>
</html>`;
};

export const templates = {
  PhD: {
    subject: "Thank You for Your PhD Programme Application",
    html: (n) => build({
      title: `Dear ${n},`,
      dept: "Doctoral Programmes Department",
      intro: "Thank you for submitting your application for the <strong>PhD Programme</strong>. We are pleased to confirm that your application has been received and will now proceed through the admissions and evaluation process. Below is an overview of the PhD journey:",
      steps: [
        ["Profile Evaluation & Scholarship Quotation", "Kindly submit your updated CV, Resume, Professional Biography, or LinkedIn Profile. Your profile will be assessed by the Doctoral Admissions Committee. If shortlisted, you will receive Eligibility Confirmation, a Scholarship Quotation (if applicable), and Programme Details & Fee Structure. Scholarships are awarded based on academic qualifications, professional experience, location, and overall profile strength."],
        ["Acceptance Letter Signing & Registration Payment", "Review and sign the Acceptance Letter to confirm your intention to proceed, then complete the registration fee payment to secure your admission and scholarship benefits."],
        ["Admission Form Submission", "You will receive the official Admission Form. Complete and submit it with accurate personal, academic, and professional information."],
        ["Issuance of Official Admission Letter", "Upon successful verification of your Admission Form and supporting documents, your Official Admission Letter will be issued, confirming your enrollment."],
        ["Research Topic Submission & Supervisor Assignment", "Submit 4-5 proposed research topics aligned with your interests and experience. The Academic Committee will approve one suitable topic. You will then receive a Topic Approval Letter and a Supervisor Assignment Letter."],
        ["Research Development & Thesis Preparation", "Begin research and thesis development under your assigned supervisor. You will receive research framework guidelines, thesis templates, methodology guidance, and regular progress reviews."],
        ["Thesis Submission", "Your final thesis will be submitted for academic review, evaluated on originality, academic contribution, methodology, quality, and relevance."],
        ["Viva Voce (Oral Defense)", "You will present and defend your research before the evaluation panel."],
        ["Final Approval & Degree Award", "Upon successful Viva Voce and final academic approval, the Doctoral Committee will recommend the award of the PhD degree."],
        ["Degree Issuance & Official Documentation", "You will receive the full set of official documents including the PhD Degree Certificate, Academic Transcript, and verification access."],
      ],
      outro: "We appreciate your interest in pursuing doctoral studies and look forward to supporting your academic and research aspirations. Should you have any questions, please contact the admissions team.",
    }),
  },

  DBA: {
    subject: "Thank You for Your DBA Application Submission",
    html: (n) => build({
      title: `Dear ${n},`,
      dept: "Doctoral Programmes Department",
      intro: "Thank you for submitting your application for the <strong>Doctor of Business Administration (DBA) Programme</strong>. We are pleased to confirm that your application has been received and will now proceed through the evaluation process. Please review the step-by-step procedure below:",
      steps: [
        ["Profile Evaluation & Eligibility Assessment", "Kindly submit your updated CV/Resume, LinkedIn Profile, Biography, or Professional Portfolio. Your profile will be evaluated on academic qualifications, professional experience, leadership achievements, business accomplishments, industry expertise, and research contributions."],
        ["Initial Review & Scholarship Quotation", "The Doctoral Admissions Committee will review your profile. If shortlisted, you will receive Eligibility Confirmation, Scholarship Quotation (if applicable), Programme Details, Fee Structure, and a Proposed Specialization Area."],
        ["Registration & Admission Confirmation", "Upon acceptance of the specialization and scholarship offer, proceed with registration. After payment verification, you will receive your Official Acceptance Letter."],
        ["Supporting Document Submission", "Submit Government-issued ID, Academic Certificates and Transcripts, updated CV/Resume, a passport-size photograph, and any additional documents if required."],
        ["Validation-Based Academic Assessment", "The programme uses a validation-based approach for experienced professionals. Your qualifications, achievements, industry experience, leadership roles, publications, and business contributions will be evaluated. A professional portfolio and evidence of leadership/business impact may be requested."],
        ["Academic Review & Thesis Development", "The Academic Committee will determine the appropriate doctoral pathway. Where applicable, you may complete a doctoral thesis, research project, or business impact report with academic supervision."],
        ["Final Evaluation", "The Doctoral Review Committee will assess your professional accomplishments, academic standing, research contribution, industry impact, and leadership achievements."],
        ["Degree Award & Official Documentation", "Upon successful approval, you will receive the DBA Degree Certificate, Academic Transcript, Verification Letter, and official graduation documentation."],
      ],
      outro: "We appreciate your interest and look forward to supporting your academic and professional advancement. Should you have any questions, please contact our admissions team.",
    }),
  },

  HonoraryDoctorate: {
    subject: "Thank You for Your Honorary Doctorate Application Submission",
    html: (n) => build({
      title: `Dear ${n},`,
      dept: "Honorary Awards Department",
      intro: "Thank you for submitting your application for consideration for the <strong>Honorary Doctorate Award</strong>. We are pleased to confirm that your application has been received and will now proceed through our evaluation process. Please review the step-by-step procedure below:",
      steps: [
        ["Profile Submission & Initial Evaluation", "Kindly share your updated Resume, CV, Biography, Professional Portfolio, or LinkedIn Profile. Your profile will undergo an initial assessment by the Honorary Awards Evaluation Committee. If found suitable, you will receive up to five honorary title recommendations reflecting your achievements and impact. You may select one or propose an alternative title."],
        ["Registration & Fee Payment", "After receiving your title recommendations and scholarship quotation (if applicable), select your preferred title and complete registration. Payment may be made via bank transfer or online gateway; instructions follow nomination approval. Send proof of payment to your admissions representative for verification, after which your official Acceptance Letter is issued."],
        ["Supporting Document Submission", "Upon acceptance, submit Government-issued identification and academic qualifications, certificates, transcripts, or professional credentials (where available)."],
        ["Statement of Purpose (SOP) & Essay Submission", "Submit an SOP explaining why you are seeking the Honorary Doctorate, your motivations and aspirations, and how it aligns with your journey. Also submit an essay (minimum 1,000 words) on your professional journey or a topic related to your chosen honorary field."],
        ["Final Evaluation", "Upon receipt of all documents, the SOP, and essay, your application undergoes final review. Within approximately seven (7) working days you will receive an Evaluation Report. If approved, the award is formally conferred; if needed, a brief interview may be requested."],
      ],
      outro: "We appreciate your interest and look forward to reviewing your achievements and contributions. Should you have any questions, please contact our admissions team.",
    }),
  },

  HonoraryProfessorship: {
    subject: "Thank You for Your Honorary Professorship Application Submission",
    html: (n) => build({
      title: `Dear ${n},`,
      dept: "Honorary Awards Department",
      intro: "Thank you for submitting your application for consideration for the <strong>Honorary Professorship Award</strong>. We are pleased to confirm that your application has been received and will now proceed through the evaluation process. Please review the step-by-step procedure below:",
      steps: [
        ["Profile Submission & Initial Evaluation", "Kindly share your updated CV, Resume, Biography, Professional Portfolio, LinkedIn Profile, or any documents highlighting your achievements, leadership roles, publications, research contributions, industry expertise, community service, or accomplishments. Your profile will be reviewed by the Academic Evaluation Committee. If suitable, you will receive up to five recommended professorship titles aligned with your expertise; you may select one or propose your own."],
        ["Registration & Fee Payment", "Following the initial evaluation and title recommendation, you will receive your scholarship quotation (if applicable) and registration details. Payment may be made via bank transfer or online gateway; instructions follow nomination approval. Share proof of payment with your admissions representative for verification, after which your official Acceptance Letter is issued."],
        ["Supporting Document Submission", "You may be required to submit Government-issued identification, academic degrees and certificates (if available), professional membership certificates (if applicable), and research publications, awards, patents, or supporting documentation."],
        ["Statement of Academic & Professional Contributions", "Submit a detailed summary of your achievements, leadership positions, research/publications/innovations, contributions to industry/education/society, and your future vision and continued impact within the profession."],
        ["Final Evaluation", "Upon receipt of all documents, the Academic Evaluation Committee will assess your contributions, achievements, professional standing, and overall impact. Within approximately seven (7) working days you will receive an Evaluation Report. If approved, the Honorary Professorship is formally conferred; if needed, a brief interview may be requested."],
        ["Award Issuance & Official Documentation", "Upon approval, you will receive your Acceptance Letter, Honorary Professorship Approval Letter, Honorary Professor Certificate, and Digital Verification Letter."],
      ],
      outro: "We appreciate your interest and look forward to reviewing your achievements and contributions. Should you have any questions, please contact our admissions team.",
    }),
  },

  Master: {
    subject: "Thank You for Your Master's Programme Application Submission",
    html: (n) => build({
      title: `Dear ${n},`,
      dept: "Master's Programmes Department",
      intro: "Thank you for submitting your application for the <strong>Master's Programme</strong>. We are pleased to confirm that your application has been received and will now proceed through the evaluation process. Please review the step-by-step procedure below:",
      steps: [
        ["Profile Evaluation & Eligibility Assessment", "Kindly submit your updated CV/Resume, LinkedIn Profile, Biography, or Professional Portfolio. Your profile will be evaluated on academic qualifications, professional experience, career achievements, industry expertise, and professional contributions."],
        ["Initial Review & Scholarship Quotation", "The Admissions Committee will review your profile. If shortlisted, you will receive Eligibility Confirmation, Scholarship Quotation (if applicable), Programme Details, Fee Structure, and a Proposed Specialization Area."],
        ["Registration & Admission Confirmation", "Upon acceptance of the proposed specialization and scholarship offer, proceed with registration. Payment can be completed through the designated payment channels. After payment verification, you will receive your Official Acceptance Letter."],
        ["Supporting Document Submission", "Submit Government-issued ID, Academic Certificates and Transcripts, updated CV/Resume, a passport-size photograph, and any additional documents if required."],
        ["Programme Enrollment", "Upon successful document verification, you will be formally enrolled in the Master's Programme and receive your Admission Letter, Student Registration Confirmation, Academic Guidelines, and Programme Handbook."],
        ["Coursework & Academic Progress", "Complete the required coursework, assignments, projects, and examinations associated with your chosen specialization. Academic support and guidance will be provided throughout the programme."],
        ["Dissertation / Capstone Project (where applicable)", "Depending on the programme structure, you may be required to complete a Dissertation, Research Project, Capstone Project, or Industry-Based Project, with academic supervision provided during this phase."],
        ["Degree Award & Official Documentation", "Upon successful completion of all requirements, you will receive the Acceptance Letter, Admission Letter, Academic Transcript, Master's Degree Certificate, Verification Letter, online verification access (where applicable), and official graduation documentation."],
      ],
      outro: "We appreciate your interest in pursuing a Master's Degree and look forward to supporting your academic and professional advancement. Should you have any questions, please contact our admissions team.",
    }),
  },

  Bachelor: {
    subject: "Thank You for Your Bachelor's Programme Application Submission",
    html: (n) => build({
      title: `Dear ${n},`,
      dept: "Bachelor's Programmes Department",
      intro: "Thank you for submitting your application for the <strong>Bachelor's Programme</strong>. We are pleased to confirm that your application has been received and will now proceed through the evaluation process. Please review the step-by-step procedure below:",
      steps: [
        ["Profile Evaluation & Eligibility Assessment", "Kindly submit your updated CV/Resume (if applicable), academic records, or professional profile. Your profile will be evaluated on academic qualifications, educational background, professional experience (if applicable), and programme eligibility requirements."],
        ["Initial Review & Scholarship Quotation", "The Admissions Committee will review your profile. If shortlisted, you will receive Eligibility Confirmation, Scholarship Quotation (if applicable), Programme Details, Fee Structure, and a Proposed Specialization Area."],
        ["Registration & Admission Confirmation", "Upon acceptance of the proposed specialization and scholarship offer, proceed with registration. Payment can be completed through the designated payment channels. After payment verification, you will receive your Official Acceptance Letter."],
        ["Supporting Document Submission", "Submit Government-issued ID, Secondary/High School Certificates and Transcripts, a passport-size photograph, and any additional documents if required."],
        ["Programme Enrollment", "Upon successful document verification, you will be formally enrolled in the Bachelor's Programme and receive your Admission Letter, Student Registration Confirmation, Academic Guidelines, and Programme Handbook."],
        ["Coursework & Academic Progress", "Complete the required coursework, assignments, projects, practical training, and examinations associated with your chosen specialization. Academic support and guidance will be provided throughout the programme."],
        ["Final Academic Assessment", "Upon completion of all programme requirements, you will undergo final academic assessment and degree clearance procedures."],
        ["Degree Award & Official Documentation", "Upon successful completion of all requirements, you will receive the Acceptance Letter, Admission Letter, Academic Transcript, Bachelor's Degree Certificate, Verification Letter, online verification access (where applicable), and official graduation documentation."],
      ],
      outro: "We appreciate your interest in pursuing a Bachelor's Degree and look forward to supporting your academic journey. Should you have any questions, please contact our admissions team.",
    }),
  },
};

export const fallbackTemplate = {
  subject: "We received your enquiry — Techversity Admissions",
  html: (n) => build({
    title: `Dear ${n},`,
    dept: "Admissions Department",
    intro: "Thank you for reaching out to Techversity. Your enquiry has been received and an academic advisor will be in touch with you shortly.",
    steps: [],
    outro: "Should you have any questions in the meantime, please contact our admissions team.",
  }),
};

export function getTemplate(programme) {
  return templates[programme] || fallbackTemplate;
}