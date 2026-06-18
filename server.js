import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import leadRouter from "./routes/lead.js";

const app = express();
app.set("trust proxy", 1);

const allowed = (process.env.ALLOWED_ORIGINS || "")
  .split(",").map((s) => s.trim()).filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
  })
);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many requests. Please try again later." },
});

app.get("/", (_req, res) => res.json({ ok: true, service: "techversity-backend" }));

// ✅ NEW: Health check route - keeps Render server warm (pinged by UptimeRobot)
app.get("/health", (_req, res) => res.json({ ok: true, timestamp: new Date().toISOString() }));

app.use("/api", limiter, leadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));