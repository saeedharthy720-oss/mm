// Generates a branded product card as SVG, one per demo product.
//
// These are illustrated placeholders, not photographs: a demo catalogue needs
// something in every tile, and inventing photographs of stock that has never
// been photographed would be worse than an honest drawn card. The store should
// replace them with real photos of its own stock.
//
// SVG rather than PNG because the API accepts any image/* upload, SVG renders
// Arabic correctly using the viewer's own fonts, stays sharp at any size, and
// weighs about 2 KB instead of 200 KB.

const BG = "#1F1C1A";
const GOLD = "#C9A227";
const TEXT = "#F5F1EA";
const MUTED = "#A39A8D";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Greedy wrap by estimated width. Arabic glyphs are narrower than Latin
 * capitals at the same point size, hence the two ratios.
 */
function wrap(text, maxWidth, fontSize, arabic) {
  const perChar = fontSize * (arabic ? 0.48 : 0.55);
  const maxChars = Math.max(8, Math.floor(maxWidth / perChar));
  const lines = [];
  let line = "";

  for (const word of String(text).split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Line-art marks, one per department. Each is drawn inside a 0 0 120 120 box
 * and positioned by the caller, so they all sit on the same optical centre.
 */
const ICONS = {
  "cement-concrete": `
    <path d="M30 34 h60 l-6 62 a6 6 0 0 1 -6 6 h-36 a6 6 0 0 1 -6 -6 z"/>
    <path d="M30 34 l10 -12 h40 l10 12"/>
    <path d="M46 56 h28 M44 72 h32"/>`,
  "steel-metals": `
    <path d="M34 20 v80 M60 20 v80 M86 20 v80"/>
    <path d="M26 34 h16 M52 34 h16 M78 34 h16
             M26 54 h16 M52 54 h16 M78 54 h16
             M26 74 h16 M52 74 h16 M78 74 h16"/>`,
  "plumbing-sanitary": `
    <path d="M22 44 h34 a18 18 0 0 1 18 18 v38"/>
    <path d="M22 32 v24 M22 32 h12 M22 56 h12"/>
    <path d="M62 100 h26 M62 88 v12 M88 88 v12"/>
    <path d="M96 24 c0 0 -12 14 -12 21 a12 12 0 0 0 24 0 c0 -7 -12 -21 -12 -21 z"/>`,
  "electrical-lighting": `
    <path d="M60 18 a30 30 0 0 1 18 54 v10 h-36 v-10 a30 30 0 0 1 18 -54 z"/>
    <path d="M44 92 h32 M48 102 h24"/>
    <path d="M62 34 l-10 18 h14 l-8 18"/>`,
  "paints-waterproofing": `
    <rect x="24" y="26" width="58" height="26" rx="4"/>
    <path d="M82 39 h16 v20 h-30 v34"/>
    <rect x="60" y="92" width="16" height="22" rx="3"/>
    <path d="M34 26 v-8 h38 v8"/>`,
  "tiles-stone": `
    <rect x="20" y="24" width="36" height="36" rx="3"/>
    <rect x="64" y="24" width="36" height="36" rx="3"/>
    <rect x="20" y="68" width="36" height="36" rx="3"/>
    <rect x="64" y="68" width="36" height="36" rx="3"/>`,
  "doors-windows": `
    <rect x="30" y="16" width="60" height="94" rx="4"/>
    <rect x="42" y="30" width="36" height="30" rx="2"/>
    <rect x="42" y="70" width="36" height="26" rx="2"/>
    <circle cx="80" cy="66" r="3.5"/>`,
  "tools-equipment": `
    <path d="M26 96 l40 -40"/>
    <path d="M20 90 l12 12"/>
    <path d="M62 52 a16 16 0 1 0 -14 -14 l10 10 -8 8 -10 -10 a16 16 0 0 0 22 6 z"/>
    <path d="M74 28 l22 22 -10 10 -22 -22 z"/>
    <path d="M86 62 l14 34 -10 8 -18 -30"/>`,
  "timber-boards": `
    <rect x="18" y="34" width="84" height="16" rx="3"/>
    <rect x="18" y="56" width="84" height="16" rx="3"/>
    <rect x="18" y="78" width="84" height="16" rx="3"/>
    <path d="M40 34 v16 M72 56 v16 M54 78 v16"/>`
};

/**
 * @param {object} product  one record from the demo product data
 * @param {object} department  { nameAr, nameEn, slug } of the top-level department
 */
export function productCardSvg(product, department) {
  const icon = ICONS[department.slug] ?? ICONS["tools-equipment"];

  const arLines = wrap(product.nameAr, 620, 34, true).slice(0, 3);
  const enLines = wrap(product.nameEn, 640, 20, false).slice(0, 2);

  // The block of text is centred as a whole, so a one-line name and a
  // three-line name both sit balanced under the mark.
  const textTop = 352;
  const arabic = arLines
    .map((line, i) => `<text x="400" y="${textTop + i * 42}" class="ar">${escapeXml(line)}</text>`)
    .join("\n    ");
  const english = enLines
    .map(
      (line, i) =>
        `<text x="400" y="${textTop + arLines.length * 42 + 10 + i * 26}" class="en">${escapeXml(line)}</text>`
    )
    .join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="${escapeXml(product.nameEn)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#26221F"/>
      <stop offset="1" stop-color="${BG}"/>
    </linearGradient>
  </defs>
  <style>
    .ar { font-family: "Segoe UI", Tahoma, "Noto Naskh Arabic", sans-serif; font-size: 34px; font-weight: 700; fill: ${TEXT}; text-anchor: middle; direction: rtl; }
    .en { font-family: "Segoe UI", Arial, sans-serif; font-size: 20px; fill: ${MUTED}; text-anchor: middle; }
    .sku { font-family: "Consolas", "Courier New", monospace; font-size: 18px; fill: ${GOLD}; letter-spacing: 1px; }
    /* No direction here: with text-anchor:end it moves the anchor to the
       logical end, which pushes an Arabic label off the right edge. A wholly
       Arabic string already lays out right-to-left on its own. */
    .dept { font-family: "Segoe UI", Tahoma, sans-serif; font-size: 19px; fill: ${MUTED}; text-anchor: end; }
    .mark { fill: none; stroke: ${GOLD}; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
  </style>

  <rect width="800" height="600" fill="url(#bg)"/>
  <rect x="16" y="16" width="768" height="568" rx="18" fill="none" stroke="${GOLD}" stroke-opacity="0.28" stroke-width="2"/>
  <path d="M16 74 v-40 a18 18 0 0 1 18 -18 h40" fill="none" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/>
  <path d="M784 526 v40 a18 18 0 0 1 -18 18 h-40" fill="none" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/>

  <g class="mark" transform="translate(292 78) scale(1.8)">
    ${icon.trim()}
  </g>

  <line x1="300" y1="300" x2="500" y2="300" stroke="${GOLD}" stroke-opacity="0.5" stroke-width="2"/>

  ${arabic}
  ${english}

  <text x="48" y="556" class="sku">${escapeXml(product.sku)}</text>
  <text x="752" y="556" class="dept">${escapeXml(department.nameAr)}</text>
</svg>
`;
}
