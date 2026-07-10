#!/usr/bin/env node
// scripts/generate.js
// Reads launchers.json and regenerates table sections in README files and
// the data array in index.html.
//
// Usage:  node scripts/generate.js
//
// Zero npm dependencies – uses only Node built-in modules.

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, 'launchers.json'), 'utf8'));

// ────────────────────────────────────────────────────────────────────
// Mapping tables
// ────────────────────────────────────────────────────────────────────

// ── README emoji maps ──────────────────────────────────────────────
const BOOL_MAP_README = {
  yes:        '✅',
  no:         '✖️',
  partial:    '🌓',
  unknown:    '❔',
  not_tested: '🧪',
};

const ADS_MAP_README = {
  none:      '🧹',
  mild:      '📢',
  excessive: '🚨',
  unknown:   '❔',
};

const CODE_MAP_README = {
  open:    '📖',
  closed:  '🔒',
  partial: '🧩',
  unknown: '❔',
};

const DRAWER_MAP_README = {
  vertical:     '⬆️⬇️',
  horizontal:   '⬅️➡️',
  multi_layout:  '🔀',
  other:        'Other',
};

const CUSTOM_MAP_README = {
  god_mode:        'God mode',
  advanced:        'Advanced',
  intermediate:    'Intermediate',
  basic:           'Basic',
  less_than_basic: 'Less than basic',
};

const PRICE_MAP_README = {
  free:      'Free',
  freemium:  'Freemium',
  paid:      'Paid',
  trialware: 'Trialware',
};

// ── index.html internal emoji maps (pre-SUPPORT_MAP) ───────────────
const BOOL_MAP_HTML = {
  yes:        '✅',
  no:         '❌',
  partial:    '➰',
  unknown:    '❓',
  not_tested: '❗',
};

const DRAWER_MAP_HTML = {
  vertical:     '↕️ Vertical',
  horizontal:   '↔️ Horizontal',
  multi_layout: '🔄 Multi-Layout',
  other:        'Other',
};

const PRICE_MAP_HTML = {
  free:      'Free',
  freemium:  'Freemium',
  paid:      'Paid',
  trialware: 'Trialware',
};

const CUSTOM_MAP_HTML = {
  god_mode:        'God mode',
  advanced:        'Advanced',
  intermediate:    'Intermediate',
  basic:           'Basic',
  less_than_basic: 'Less than basic',
};

// ── Spanish translation maps ───────────────────────────────────────
const PRICE_MAP_ES = {
  free:      'Gratis',
  freemium:  'Freemium',
  paid:      'De pago',
  trialware: 'Prueba',
};

const CUSTOM_MAP_ES = {
  god_mode:        'Modo dios',
  advanced:        'Avanzada',
  intermediate:    'Intermedia',
  basic:           'Básica',
  less_than_basic: 'Menos que básica',
};

const DRAWER_MAP_ES = {
  vertical:     '⬆️⬇️',
  horizontal:   '⬅️➡️',
  multi_layout:  '🔀',
  other:        'Otro',
};

// ── Korean translation maps ────────────────────────────────────────
const PRICE_MAP_KO = {
  free:      '무료',
  freemium:  'Freemium',
  paid:      '유료',
  trialware: '체험판',
};

const CUSTOM_MAP_KO = {
  god_mode:        '갓모드',
  advanced:        '고급',
  intermediate:    '중급',
  basic:           '기본',
  less_than_basic: '기본 이하',
};

const DRAWER_MAP_KO = {
  vertical:     '⬆️⬇️',
  horizontal:   '⬅️➡️',
  multi_layout:  '🔀',
  other:        '기타',
};

// ── Hindi translation maps ─────────────────────────────────────────
const PRICE_MAP_HI = {
  free:      'मुफ़्त',
  freemium:  'फ़्रीमियम',
  paid:      'सशुल्क',
  trialware: 'ट्रायलवेयर',
};

const CUSTOM_MAP_HI = {
  god_mode:        'गॉड मोड',
  advanced:        'उन्नत',
  intermediate:    'मध्यवर्ती',
  basic:           'बुनियादी',
  less_than_basic: 'बुनियादी से कम',
};

const DRAWER_MAP_HI = {
  vertical:     '⬆️⬇️',
  horizontal:   '⬅️➡️',
  multi_layout:  '🔀',
  other:        'अन्य',
};

// ────────────────────────────────────────────────────────────────────
// README row generators
// ────────────────────────────────────────────────────────────────────

function starsReadme(freq, status) {
  if (freq === -1) return '☠️';
  const stars = '⭐'.repeat(freq);
  if (status === 'maintenance') return stars + ' 🪦';
  return stars;
}

function privacyCellReadme(url) {
  if (!url) return 'N/A';
  return '[via Exodus Privacy](' + url + ')';
}

function downloadCellReadme(launcher) {
  // Special case: Lawnchair 15 has two download links
  if (launcher.downloadUrl2) {
    return '[' + (launcher.downloadLabel || 'Link') + '](' + launcher.downloadUrl + ') / [' + (launcher.downloadLabel2 || 'Link') + '](' + launcher.downloadUrl2 + ')';
  }
  if (!launcher.downloadUrl) return '—';
  return '[Link](' + launcher.downloadUrl + ')';
}

function makeReadmeRow(l, priceMap, customMap, drawerMap) {
  const cols = [
    l.name,
    priceMap[l.price] || l.price,
    ADS_MAP_README[l.ads] || '❔',
    starsReadme(l.updateFrequency, l.updateStatus),
    customMap[l.customisability] || l.customisability,
    drawerMap[l.appDrawerStyle] || l.appDrawerStyle,
    BOOL_MAP_README[l.klwp] || '❔',
    BOOL_MAP_README[l.widget] || '❔',
    BOOL_MAP_README[l.materialYou] || '❔',
    BOOL_MAP_README[l.landscape] || '❔',
    BOOL_MAP_README[l.foldable] || '❔',
    CODE_MAP_README[l.code] || '❔',
    BOOL_MAP_README[l.fdroid] || '❔',
    BOOL_MAP_README[l.quickswitch] || '❔',
    l.androidVersion,
    privacyCellReadme(l.privacyUrl),
    downloadCellReadme(l),
  ];
  return '| ' + cols.join(' | ') + ' |';
}

function makeReadmeTable(launchers, priceMap, customMap, drawerMap, headerRow, separatorRow) {
  const rows = launchers.map(l => makeReadmeRow(l, priceMap, customMap, drawerMap));
  const parts = [];
  if (headerRow)    parts.push(headerRow);
  if (separatorRow) parts.push(separatorRow);
  parts.push(...rows);
  return parts.join('\n');
}

// ────────────────────────────────────────────────────────────────────
// index.html data array generator
// ────────────────────────────────────────────────────────────────────

function jsString(s) {
  // Escape for JS string literal inside double quotes
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function makeHtmlLauncherLine(l) {
  const updates = l.updateStatus === 'maintenance'
    ? '"' + l.updateFrequency + ' 🪦"'
    : String(l.updateFrequency);

  const fields = [
    'name: "' + jsString(l.name) + '"',
    'icon: "' + jsString(l.icon) + '"',
    'price: "' + PRICE_MAP_HTML[l.price] + '"',
    'ads: "' + l.ads + '"',
    'updates: ' + updates,
    'custom: "' + CUSTOM_MAP_HTML[l.customisability] + '"',
    'drawer: "' + DRAWER_MAP_HTML[l.appDrawerStyle] + '"',
    'klwp: "' + BOOL_MAP_HTML[l.klwp] + '"',
    'widget: "' + BOOL_MAP_HTML[l.widget] + '"',
    'material: "' + BOOL_MAP_HTML[l.materialYou] + '"',
    'landscape: "' + BOOL_MAP_HTML[l.landscape] + '"',
    'foldable: "' + BOOL_MAP_HTML[l.foldable] + '"',
    'code: "' + l.code + '"',
    'fdroid: "' + BOOL_MAP_HTML[l.fdroid] + '"',
    'quickswitch: "' + BOOL_MAP_HTML[l.quickswitch] + '"',
    'android: "' + jsString(l.androidVersion) + '"',
    'privacy: "' + jsString(l.privacyUrl) + '"',
    'download: "' + jsString(l.downloadUrl) + '"',
  ];

  return '            { ' + fields.join(', ') + ' },';
}

// ────────────────────────────────────────────────────────────────────
// File patching helpers
// ────────────────────────────────────────────────────────────────────

function patchBetweenMarkers(content, startMarker, endMarker, replacement) {
  const startIdx = content.indexOf(startMarker);
  const endIdx   = content.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Markers not found: "' + startMarker + '" / "' + endMarker + '"');
  }

  const before = content.substring(0, startIdx + startMarker.length);
  const after  = content.substring(endIdx);

  return before + '\n' + replacement + '\n' + after;
}

// ────────────────────────────────────────────────────────────────────
// Generate READMEs
// ────────────────────────────────────────────────────────────────────

function generateReadme(filename, priceMap, customMap, drawerMap, activeHeader, activeHeaderSep, archivedHeader, archivedHeaderSep) {
  const filepath = path.join(ROOT, filename);
  let content = fs.readFileSync(filepath, 'utf8');

  const active   = DATA.filter(l => !l.archived);
  const archived = DATA.filter(l => l.archived);

  const activeTable   = makeReadmeTable(active,   priceMap, customMap, drawerMap, activeHeader,   activeHeaderSep);
  const archivedTable = makeReadmeTable(archived, priceMap, customMap, drawerMap, archivedHeader, archivedHeaderSep);

  content = patchBetweenMarkers(
    content,
    '<!-- ACTIVE_TABLE:START -->',
    '<!-- ACTIVE_TABLE:END -->',
    activeTable
  );

  content = patchBetweenMarkers(
    content,
    '<!-- ARCHIVED_TABLE:START -->',
    '<!-- ARCHIVED_TABLE:END -->',
    archivedTable
  );

  fs.writeFileSync(filepath, content, 'utf8');
  console.log('✅ Generated: ' + filename);
}

// ────────────────────────────────────────────────────────────────────
// Generate index.html data
// ────────────────────────────────────────────────────────────────────

function generateHtml() {
  const filepath = path.join(ROOT, 'index.html');
  let content = fs.readFileSync(filepath, 'utf8');

  const lines = DATA.map(l => makeHtmlLauncherLine(l));
  const dataBlock = '        const launchers = [\n' + lines.join('\n') + '\n        ];';

  content = patchBetweenMarkers(
    content,
    '// DATA:START',
    '// DATA:END',
    dataBlock
  );

  fs.writeFileSync(filepath, content, 'utf8');
  console.log('✅ Generated: index.html');
}

// ────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────

try {
  const SEP = '|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|';

  generateReadme('README.md',
    PRICE_MAP_README, CUSTOM_MAP_README, DRAWER_MAP_README,
    '| **Name** | **Price** | **Ads/Bloat** | **Update Frequency** | **Customisability** | **App Drawer Style** | **KLWP Support** | **Widget Support** | **Material You** | **Landscape Support** | **Foldable/Tablet** | **Code Availability** | **F-Droid** | **QuickSwitch** | **Android Version** | **Privacy** | **Download** |',
    SEP,
    '| **Name** | **Price** | **Ads/Bloat** | **Update Frequency** | **Customisability** | **App Drawer Style** | **KLWP Support** | **Widget Support** | **Material You** | **Landscape Support** | **Foldable/Tablet** | **Code Availability** | **F-Droid** | **QuickSwitch** | **Android Version** | **Privacy** | **Download** |',
    SEP
  );

  generateReadme('README.es.md',
    PRICE_MAP_ES, CUSTOM_MAP_ES, DRAWER_MAP_ES,
    '| **Nombre** | **Precio** | **Anuncios/Bloat** | **Frec. de Actualización** | **Personalización** | **Estilo del Cajón** | **Soporte KLWP** | **Soporte de Widgets** | **Material You** | **Soporte Horizontal** | **Plegables/Tablets** | **Disp. del Código** | **F-Droid** | **QuickSwitch** | **Versión de Android** | **Privacidad** | **Descarga** |',
    SEP,
    '| **Nombre** | **Precio** | **Anuncios/Bloat** | **Frec. de Actualización** | **Personalización** | **Estilo del Cajón** | **Soporte KLWP** | **Soporte de Widgets** | **Material You** | **Soporte Horizontal** | **Plegables/Tablets** | **Disp. del Código** | **F-Droid** | **QuickSwitch** | **Versión de Android** | **Privacidad** | **Descarga** |',
    SEP
  );

  generateReadme('README.ko.md',
    PRICE_MAP_KO, CUSTOM_MAP_KO, DRAWER_MAP_KO,
    '| **이름** | **가격** | **광고/블로트** | **업데이트 빈도** | **커스터마이징** | **앱 서랍 스타일** | **KLWP 지원** | **위젯 지원** | **Material You** | **가로모드 지원** | **폴더블/태블릿** | **코드 공개** | **F-Droid** | **QuickSwitch** | **안드로이드 버전** | **개인정보** | **다운로드** |',
    SEP,
    '| **이름** | **가격** | **광고/블로트** | **업데이트 빈도** | **커스터마이징** | **앱 서랍 스타일** | **KLWP 지원** | **위젯 지원** | **Material You** | **가로모드 지원** | **폴더블/태블릿** | **코드 공개** | **F-Droid** | **QuickSwitch** | **안드로이드 버전** | **개인정보** | **다운로드** |',
    SEP
  );

  generateReadme('README.hi.md',
    PRICE_MAP_HI, CUSTOM_MAP_HI, DRAWER_MAP_HI,
    '| **नाम** | **कीमत** | **विज्ञापन/ब्लोट** | **अपडेट आवृत्ति** | **अनुकूलनशीलता** | **ऐप ड्रॉअर शैली** | **KLWP सहायता** | **विजेट सहायता** | **Material You** | **लैंडस्केप सहायता** | **फोल्डेबल/टैबलेट** | **कोड उपलब्धता** | **F-Droid** | **QuickSwitch** | **एंड्रॉइड संस्करण** | **गोपनीयता** | **डाउनलोड** |',
    SEP,
    '| **नाम** | **कीमत** | **विज्ञापन/ब्लोट** | **अपडेट आवृत्ति** | **अनुकूलनशीलता** | **ऐप ड्रॉअर शैली** | **KLWP सहायता** | **विजेट सहायता** | **Material You** | **लैंडस्केप सहायता** | **फोल्डेबल/टैबलेट** | **कोड उपलब्धता** | **F-Droid** | **QuickSwitch** | **एंड्रॉइड संस्करण** | **गोपनीयता** | **डाउनलोड** |',
    SEP
  );
  generateHtml();
  console.log('\n🎉 All files generated successfully from launchers.json');
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
