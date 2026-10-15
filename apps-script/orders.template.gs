// ===== סקריפט לגיליון "הזמנות אתר" =====
// מדביקים את כל הקובץ הזה ב: הרחבות > Apps Script (בתוך הגיליון "הזמנות אתר")

const SECRET = '__ORDERS_SHEET_SECRET__';
const SHEET_NAME = 'הזמנות';
const TIMEZONE = 'Asia/Jerusalem';

const HEADERS = [
  'מספר הזמנה', 'תאריך', 'סטטוס', 'שם לחשבונית', 'טלפון', 'אימייל',
  'מוצרים', 'אופן קבלה', 'כתובת', 'זמן אספקה',
  'סכום לפני מע"מ', 'סכום צפוי כולל מע"מ', 'סכום ששולם', 'מספר תשלום SUMIT', 'תאריך תשלום',
];
const COL = {}; HEADERS.forEach((h, i) => { COL[h] = i + 1; });

const LEADS_SHEET_NAME = 'מתעניינים';
const LEADS_HEADERS = ['תאריך', 'שם מלא', 'טלפון', 'אימייל', 'נושא / התעניינות', 'הערות', 'סטטוס טיפול'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return respond({ ok: false, error: 'unauthorized' });

    if (data.action === 'lead') return respond(addLead(getSheet(LEADS_SHEET_NAME, LEADS_HEADERS), data.lead || {}));

    const sheet = getSheet(SHEET_NAME, HEADERS);
    if (data.action === 'create') return respond(createOrder(sheet, data.order || {}));
    if (data.action === 'paid') return respond(markPaid(sheet, data.payment || {}));
    return respond({ ok: false, error: 'unknown action' });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#e2e8f0');
    sheet.setFrozenRows(1);
    sheet.setRightToLeft(true);
    // טקסט רגיל - כדי שהאפס בתחילת מספר טלפון לא ייעלם
    sheet.getRange(1, 1, sheet.getMaxRows(), headers.length).setNumberFormat('@');
  }
  return sheet;
}

function addLead(sheet, l) {
  if (!l.fullName || !l.phone) return { ok: false, error: 'missing name or phone' };
  sheet.appendRow([now(), l.fullName, l.phone, l.email, l.subject, l.notes, 'חדש'].map(safe));
  return { ok: true };
}

function createOrder(sheet, o) {
  if (!o.orderId) return { ok: false, error: 'missing orderId' };
  if (findRow(sheet, COL['מספר הזמנה'], o.orderId)) return { ok: true, duplicate: true };

  sheet.appendRow([
    o.orderId, now(), 'ממתין לתשלום', o.name, o.phone, o.email,
    o.products, o.shipping, o.address, o.supplyTime,
    o.netTotal, o.expectedTotal, '', '', '',
  ].map(safe));
  return { ok: true };
}

function markPaid(sheet, p) {
  if (!p.paymentId) return { ok: false, error: 'missing paymentId' };

  // אותו תשלום לא יכול לסמן שתי הזמנות שונות
  const usedRow = findRow(sheet, COL['מספר תשלום SUMIT'], p.paymentId);
  if (usedRow) {
    const usedOrder = String(sheet.getRange(usedRow, COL['מספר הזמנה']).getValue());
    return usedOrder === String(p.orderId)
      ? { ok: true, duplicate: true }
      : { ok: false, error: 'payment already used for order ' + usedOrder };
  }

  let row = p.orderId ? findRow(sheet, COL['מספר הזמנה'], p.orderId) : 0;
  if (!row) {
    // תשלום בלי רישום מקדים - נרשם כדי שלא ילך לאיבוד
    sheet.appendRow([p.orderId || '', now(), '', '', '', '', '', '', '', '', '', '', '', '', ''].map(safe));
    row = sheet.getLastRow();
  }

  const expected = Number(sheet.getRange(row, COL['סכום צפוי כולל מע"מ']).getValue());
  const paid = Number(p.amount);
  const amountOk = !expected || Math.abs(expected - paid) <= 1;

  sheet.getRange(row, COL['סטטוס']).setValue(amountOk ? 'שולם' : 'שולם - סכום לא תואם, לבדוק!');
  sheet.getRange(row, COL['סכום ששולם']).setValue(safe(paid));
  sheet.getRange(row, COL['מספר תשלום SUMIT']).setValue(safe(p.paymentId));
  sheet.getRange(row, COL['תאריך תשלום']).setValue(now());
  sheet.getRange(row, 1, 1, HEADERS.length).setBackground(amountOk ? '#dcfce7' : '#fee2e2');
  return { ok: true };
}

function findRow(sheet, col, value) {
  const last = sheet.getLastRow();
  if (last < 2) return 0;
  const values = sheet.getRange(2, col, last - 1, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    if (String(values[i][0]) === String(value)) return i + 2;
  }
  return 0;
}

function now() {
  return Utilities.formatDate(new Date(), TIMEZONE, 'dd/MM/yyyy HH:mm');
}

// מונע הזרקת נוסחאות מתוך פרטים שהלקוח הקליד
function safe(v) {
  const s = v === undefined || v === null ? '' : String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
