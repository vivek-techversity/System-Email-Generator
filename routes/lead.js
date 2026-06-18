// routes/lead.js
import express from "express";
import multer from "multer";
import { appendLead, isDuplicate } from "../services/sheets.js";
import { sendCourseEmail, sendFailureAlert } from "../services/mailer.js";
import { uploadCV } from "../services/drive.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ok = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    ok.includes(file.mimetype) ? cb(null, true) : cb(new Error("Only PDF or DOC/DOCX allowed"));
  },
});

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneDigits = (p) => (p || "").replace(/[^0-9]/g, "");
const validProgrammes = ["HonoraryDoctorate", "HonoraryProfessorship", "PhD", "DBA", "Master", "Bachelor"];

router.post("/lead", upload.single("cv"), async (req, res) => {
  try {
    const { name, email, phone, country, programme, notes, source, website } = req.body || {};

    // honeypot — browser autofill ignore karo (jab hidden field me wahi value ho jo asli field me hai)
    const hp = (website || "").trim();
    const looksLikeAutofill = hp && (hp === (email || "").trim() || hp === (name || "").trim() || hp === (phone || "").trim());
    if (hp && !looksLikeAutofill) return res.status(200).json({ ok: true });

    // validation
    const errors = {};
    if (!name || name.trim().length < 2) errors.name = "Name required";
    if (!emailRe.test(email || "")) errors.email = "Valid email required";
    const digits = phoneDigits(phone);
    if (digits.length < 7 || digits.length > 15) errors.phone = "Valid phone required";
    if (!country || country.trim() === "") errors.country = "Country required";
    if (!validProgrammes.includes(programme)) errors.programme = "Valid programme required";
    if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

    const cleanEmail = email.trim();

    // DUPLICATE CHECK (same email + same programme) -> na sheet, na mail
    const dup = await isDuplicate(cleanEmail, programme);
    if (dup) {
      return res.status(200).json({
        ok: true,
        duplicate: true,
        message: "You've already applied for this programme. Our team will reach out soon.",
      });
    }
    

    const lead = {
      name: name.trim(), email: cleanEmail, phone: phone.trim(),
      country: country.trim(), programme,
      notes: (notes || "").trim(), source: (source || "unknown").trim(), cvLink: "",
    };

    // CV optional -> Drive
    if (req.file) {
      try { lead.cvLink = await uploadCV(req.file, lead.name); }
      catch (e) { console.error("CV upload failed (lead still saved):", e?.message); }
    }

    await appendLead(lead); 

    try { await sendCourseEmail(lead); }
    catch (e) { console.error("Mail failed (lead still saved):", e?.message);
       await sendFailureAlert(lead, e?.message || "Unknown error");
     }

    return res.json({ ok: true });
  } catch (err) {
    if (err.message?.includes("PDF") || err.code === "LIMIT_FILE_SIZE")
      return res.status(400).json({ ok: false, errors: { cv: "CV must be PDF/DOC under 5MB" } });
    console.error("Lead error:", err?.message);
    return res.status(500).json({ ok: false, error: "Something went wrong. Please try again." });
  }
});

export default router;