// services/sheets.js
import { google } from "googleapis";
import fs from "fs";

const KEY_FILE = process.env.GOOGLE_KEY_FILE || "./google-key.json";
const SHEET_ID = process.env.SHEET_ID;
const SHEET_TAB = process.env.SHEET_TAB || "Sheet1";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(fs.readFileSync(KEY_FILE, "utf8")),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });


async function getRows() {
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A:J`,
  });
  return resp.data.values || [];
}


export async function isDuplicate(email, programme) {
  const rows = await getRows();
  const e = (email || "").trim().toLowerCase();
  const p = (programme || "").trim();
  return rows.slice(1).some(
    (r) => (r[2] || "").trim().toLowerCase() === e && (r[5] || "").trim() === p
  );
}

// ID | Name | Email | Phone | Country | Programme | Notes | CV | Source | Created At
export async function appendLead(lead) {
  const rows = await getRows();
  const id = Math.max(0, rows.length - 1) + 1; // row 1 = header

  const row = [
    id, lead.name, lead.email, lead.phone, lead.country,
    lead.programme, lead.notes || "", lead.cvLink || "",
    lead.source || "unknown", new Date().toISOString(),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A:J`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });

  return id;
}