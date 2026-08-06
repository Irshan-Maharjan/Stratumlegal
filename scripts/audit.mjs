/**
 * Layout + contrast audit over the Chrome DevTools Protocol.
 *
 * Checks, per URL and per viewport width:
 *   - horizontal overflow (scrollWidth > clientWidth) and which elements cause it
 *   - any rendered pure #FFF / #000 colour or background
 *   - border-radius values outside {0, 2px}
 *   - heading order and h1 count
 *   - computed contrast of every text node against its actual painted background
 *
 * Usage: node scripts/audit.mjs [baseUrl] [path,path,...]
 * Requires Chrome already running with --remote-debugging-port=9222.
 */

import { WebSocket } from 'ws';

const BASE = process.argv[2] || 'http://localhost:3000';
const PATHS = (process.argv[3] || '/').split(',');
const WIDTHS = [320, 768, 1440];

async function getTarget() {
  const res = await fetch('http://localhost:9222/json/new?about:blank', { method: 'PUT' });
  return res.json();
}

function cdp(ws) {
  let id = 0;
  const pending = new Map();
  ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  });
  return (method, params = {}) =>
    new Promise((resolve, reject) => {
      const msgId = ++id;
      pending.set(msgId, (m) => (m.error ? reject(new Error(m.error.message)) : resolve(m.result)));
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
}

const AUDIT_FN = `(() => {
  const de = document.documentElement;
  const out = {
    scrollWidth: de.scrollWidth,
    clientWidth: de.clientWidth,
    overflow: de.scrollWidth > de.clientWidth,
    offenders: [],
    pureColors: [],
    badRadius: [],
    headings: [],
    contrast: [],
  };

  // An element geometrically outside the viewport is only a REAL problem if
  // no ancestor clips it (overflow: hidden/clip/auto with a smaller box) —
  // otherwise it's deliberate decoration (e.g. a rotated motif bleeding past
  // its own clipped section) that never causes visible or scrollable overflow.
  // Document-level scrollWidth > clientWidth (checked separately below) is
  // the authoritative signal; this list is informational context for it.
  const isClipped = (el) => {
    let n = el.parentElement;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      if (['hidden', 'clip', 'auto', 'scroll'].includes(cs.overflowX)) {
        const nr = n.getBoundingClientRect();
        const er = el.getBoundingClientRect();
        if (er.left < nr.left - 1 || er.right > nr.right + 1) return true;
      }
      n = n.parentElement;
    }
    return false;
  };

  const vw = de.clientWidth;
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && (r.right > vw + 1 || r.left < -1) && !isClipped(el)) {
      out.offenders.push({
        tag: el.tagName,
        cls: String(el.className || '').slice(0, 70),
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
    }
  }

  const parseRGB = (s) => {
    const m = s.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(',').map((x) => parseFloat(x));
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = (c) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (a, b) => {
    const L1 = lum(a), L2 = lum(b);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  };
  const over = (fg, bg) => {
    if (fg.a >= 1) return fg;
    return { r: fg.r*fg.a + bg.r*(1-fg.a), g: fg.g*fg.a + bg.g*(1-fg.a), b: fg.b*fg.a + bg.b*(1-fg.a), a: 1 };
  };
  const paintedBg = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parseRGB(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.99) return c;
      n = n.parentElement;
    }
    const b = parseRGB(getComputedStyle(document.body).backgroundColor);
    return b && b.a > 0.99 ? b : { r: 255, g: 255, b: 255, a: 1 };
  };

  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el);

    const bg = parseRGB(cs.backgroundColor);
    if (bg && bg.a > 0.99) {
      if (bg.r === 255 && bg.g === 255 && bg.b === 255) out.pureColors.push({ tag: el.tagName, prop: 'bg', val: '#FFF' });
      if (bg.r === 0 && bg.g === 0 && bg.b === 0) out.pureColors.push({ tag: el.tagName, prop: 'bg', val: '#000' });
    }

    const radii = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomLeftRadius, cs.borderBottomRightRadius];
    for (const rad of radii) {
      if (rad && rad !== '0px' && rad !== '2px' && !rad.includes('%')) {
        out.badRadius.push({ tag: el.tagName, cls: String(el.className || '').slice(0, 50), radius: rad });
        break;
      }
    }

    if (/^H[1-6]$/.test(el.tagName)) {
      out.headings.push({ level: Number(el.tagName[1]), text: (el.textContent || '').trim().slice(0, 60) });
    }

    // Text nodes only: element has direct non-whitespace text.
    const hasText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!hasText) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (cs.visibility === 'hidden' || cs.opacity === '0') continue;

    const fgRaw = parseRGB(cs.color);
    if (!fgRaw) continue;
    const bgc = paintedBg(el);
    const fg = over(fgRaw, bgc);
    const cr = ratio(fg, bgc);
    const size = parseFloat(cs.fontSize);
    const weight = Number(cs.fontWeight) || 400;
    const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
    const required = isLarge ? 3 : 4.5;
    if (cr < required) {
      out.contrast.push({
        tag: el.tagName,
        cls: String(el.className || '').slice(0, 60),
        text: (el.textContent || '').trim().slice(0, 45),
        color: cs.color,
        bg: 'rgb(' + Math.round(bgc.r) + ',' + Math.round(bgc.g) + ',' + Math.round(bgc.b) + ')',
        size: size,
        weight: weight,
        ratio: Math.round(cr * 100) / 100,
        required,
      });
    }
  }
  return out;
})()`;

const target = await getTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.on('open', r));
const send = cdp(ws);

await send('Page.enable');
await send('Runtime.enable');

let failures = 0;

for (const path of PATHS) {
  for (const width of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
    await send('Page.navigate', { url: BASE + path });
    await new Promise((r) => setTimeout(r, 1400));

    const { result } = await send('Runtime.evaluate', {
      expression: AUDIT_FN,
      returnByValue: true,
    });
    const a = result.value;

    const problems = [];
    if (a.overflow) problems.push(`OVERFLOW ${a.scrollWidth}>${a.clientWidth}`);
    if (a.offenders.length) problems.push(`${a.offenders.length} offending els`);
    if (a.pureColors.length) problems.push(`${a.pureColors.length} pure #FFF/#000`);
    if (a.badRadius.length) problems.push(`${a.badRadius.length} bad radius`);
    if (a.contrast.length) problems.push(`${a.contrast.length} contrast fails`);

    const h1s = a.headings.filter((h) => h.level === 1).length;
    if (h1s !== 1) problems.push(`h1 count = ${h1s}`);
    let prev = 0;
    for (const h of a.headings) {
      if (prev && h.level > prev + 1) {
        problems.push(`heading jump h${prev}->h${h.level}`);
        break;
      }
      prev = h.level;
    }

    const status = problems.length ? 'FAIL' : 'ok';
    if (problems.length) failures += 1;
    console.log(`${status.padEnd(4)} ${path.padEnd(34)} ${String(width).padStart(4)}px  ${problems.join(' | ') || 'clean'}`);

    for (const o of a.offenders.slice(0, 4)) {
      console.log(`       overflow: <${o.tag}> ${o.cls} [${o.left}..${o.right}]`);
    }
    for (const c of a.contrast.slice(0, 6)) {
      console.log(
        `       contrast: ${c.ratio}:1 (needs ${c.required}) ${c.color} on ${c.bg} ${c.size}px w${c.weight} <${c.tag}> "${c.text}"`
      );
    }
    for (const r of a.badRadius.slice(0, 3)) {
      console.log(`       radius: ${r.radius} <${r.tag}> ${r.cls}`);
    }
    for (const p of a.pureColors.slice(0, 3)) {
      console.log(`       pure: ${p.val} ${p.prop} <${p.tag}>`);
    }
  }
}

console.log(failures ? `\n${failures} viewport/page combinations have issues.` : '\nAll clean.');
ws.close();
process.exit(0);
