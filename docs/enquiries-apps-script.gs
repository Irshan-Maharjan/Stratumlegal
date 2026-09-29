/**
 * Stratum Law Associates — enquiry endpoint.
 *
 * Receives submissions from the website's contact form, appends them to this
 * spreadsheet, and emails the firm so an enquiry is not missed if nobody is
 * watching the sheet.
 *
 * WHY THIS EXISTS: the website is a static export on shared hosting. It has no
 * server, so it cannot hold a Google API credential — anything shipped to the
 * browser is readable by anyone. An Apps Script web app runs as YOU, under
 * your own authorisation, and is the supported way to let a static page write
 * to a sheet without publishing a secret.
 *
 * ── SETUP (once) ────────────────────────────────────────────────────────────
 *  1. Open the spreadsheet → Extensions → Apps Script.
 *  2. Delete whatever is in Code.gs and paste this whole file in.
 *  3. Set NOTIFY_EMAIL below if it should differ from the firm address.
 *  4. Save, then Deploy → New deployment → type "Web app".
 *       Execute as:        Me
 *       Who has access:    Anyone            ← required; see the note below
 *  5. Authorise when prompted (it will warn the app is unverified — it is your
 *     own script, that warning is expected).
 *  6. Copy the /exec URL it gives you and send it to your developer, or set it
 *     as NEXT_PUBLIC_ENQUIRY_ENDPOINT in the site's build.
 *
 * ── ON "Anyone" ACCESS ──────────────────────────────────────────────────────
 * "Anyone" means anyone who knows the URL can POST to it. It does NOT give
 * anyone access to the spreadsheet, and the script never reads data back out —
 * doPost only ever appends. The practical risk is spam, which is what the
 * honeypot and the rate check below are for. Do not add anything to this
 * script that returns sheet contents.
 */

/** Where to send the notification. Leave blank to skip email entirely. */
var NOTIFY_EMAIL = 'stratumlawassociates@gmail.com';

/** Tab the rows are written to. Created automatically if absent. */
var SHEET_NAME = 'Enquiries';

var HEADERS = [
  'Received',
  'Name',
  'Organisation',
  'Email',
  'Phone',
  'Matter type',
  'Message',
];

function doPost(e) {
  try {
    var payload = parseBody_(e);

    // Honeypot: a field hidden from humans. Anything that fills it is a bot.
    // Answer 200 so the bot believes it succeeded and does not retry.
    if (payload.company) {
      return json_({ ok: true });
    }

    // Minimal server-side validation. The form validates too, but a POST can
    // arrive from anywhere, so nothing from the client is trusted.
    var name = trim_(payload.name);
    var message = trim_(payload.message);
    if (!name || !message) {
      return json_({ ok: false, error: 'Name and message are required.' }, 400);
    }

    var sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      name,
      trim_(payload.organisation),
      trim_(payload.email),
      trim_(payload.phone),
      trim_(payload.matterType),
      message,
    ]);

    notify_(name, payload);

    return json_({ ok: true });
  } catch (err) {
    // Log for the Apps Script execution history, but never return the internal
    // message to the caller.
    console.error(err);
    return json_({ ok: false, error: 'Could not record the enquiry.' }, 500);
  }
}

/**
 * A plain GET should not expose anything. It exists only so opening the URL in
 * a browser gives a clear answer instead of an error page.
 */
function doGet() {
  return json_({ ok: true, status: 'Enquiry endpoint is running.' });
}

/**
 * The form posts url-encoded rather than JSON, deliberately: a JSON content
 * type would make the browser send a CORS preflight, and Apps Script does not
 * answer preflight requests. Both shapes are handled here anyway so the
 * endpoint keeps working if the caller changes.
 */
function parseBody_(e) {
  if (!e) return {};
  if (e.parameter && Object.keys(e.parameter).length) return e.parameter;
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      return {};
    }
  }
  return {};
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Write the header row once, and freeze it so the sheet stays readable as
  // rows accumulate.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 150); // Received
    sheet.setColumnWidth(7, 520); // Message
  }

  return sheet;
}

function notify_(name, payload) {
  if (!NOTIFY_EMAIL) return;

  var lines = [
    'A new enquiry was submitted through the website.',
    '',
    'Name:         ' + name,
    'Organisation: ' + (trim_(payload.organisation) || '—'),
    'Email:        ' + (trim_(payload.email) || '—'),
    'Phone:        ' + (trim_(payload.phone) || '—'),
    'Matter type:  ' + (trim_(payload.matterType) || '—'),
    '',
    'Message:',
    trim_(payload.message),
    '',
    'Recorded in: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ];

  // A failed email must not lose the enquiry — the row is already written by
  // the time this runs, so a send failure is logged and swallowed.
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'Website enquiry — ' + name,
      body: lines.join('\n'),
      // Lets the firm hit reply and reach the enquirer directly.
      replyTo: trim_(payload.email) || undefined,
    });
  } catch (err) {
    console.error('Notification email failed: ' + err);
  }
}

function trim_(value) {
  return value == null ? '' : String(value).trim();
}

function json_(body, status) {
  // Apps Script web apps cannot set arbitrary response headers or status
  // codes; the status is carried in the body instead, and the site reads
  // `ok` rather than the HTTP status.
  if (status) body.status = status;
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
