// services/drive.js
import { google } from "googleapis";
import fs from "fs";
import { Readable } from "stream";

const KEY_FILE = process.env.GOOGLE_KEY_FILE || "./google-key.json";
const FOLDER_ID = process.env.DRIVE_FOLDER_ID; // Shared Drive ID

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(fs.readFileSync(KEY_FILE, "utf8")),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

export async function uploadCV(file, leadName) {
  const safe = (leadName || "lead").replace(/[^a-z0-9]/gi, "_");
  const ext = (file.originalname.split(".").pop() || "pdf").toLowerCase();
  const fileName = `${safe}_${Date.now()}.${ext}`;

  const res = await drive.files.create({
    requestBody: { name: fileName, parents: [FOLDER_ID] },
    media: { mimeType: file.mimetype, body: Readable.from(file.buffer) },
    fields: "id, webViewLink",
    supportsAllDrives: true,   
  });

  return res.data.webViewLink;
}