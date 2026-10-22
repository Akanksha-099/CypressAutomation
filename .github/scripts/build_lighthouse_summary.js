const fs = require("node:fs");
const [resultsPath, outputPath] = process.argv.slice(2);
if (!resultsPath || !outputPath) {
  throw new Error("Usage: node build_lighthouse_summary.js <results.json> <output.html>");
}

const allowedTargets = new Set(["https://www.w3.org/WAI/", "https://webaim.org/"]);
const scoreLabels = [
  ["performance", "Performance"],
  ["accessibility", "Accessibility"],
  ["bestPractices", "Best practices"],
  ["seo", "SEO"],
  ["pwa", "Progressive Web App"],
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function formatScore(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "Not scored";
  }

  return `${Math.round(value <= 1 ? value * 100 : value)}%`;
}

const results = JSON.parse(fs.readFileSync(resultsPath, "utf8"));
if (!Array.isArray(results) || results.length === 0) {
  throw new Error("Lighthouse results must be a non-empty array.");
}

const entries = results.map((result) => {
  if (!allowedTargets.has(result.url)) {
    throw new Error(`Refusing to publish a report for an unapproved target: ${result.url}`);
  }

  const scoreRows = scoreLabels
    .filter(([key]) => Object.hasOwn(result.scores || {}, key))
    .map(([key, label]) => `<div class="score"><dt>${label}</dt><dd>${formatScore(result.scores[key])}</dd></div>`)
    .join("\n");

  return `<article class="result">
    <div class="result-heading">
      <div><p class="eyebrow">${escapeHtml(result.emulatedFormFactor || "Device")}</p><h2><a href="${escapeHtml(result.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(result.url)}</a></h2></div>
    </div>
    <dl class="scores">${scoreRows}</dl>
  </article>`;
});

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Latest Lighthouse accessibility, performance, SEO, and best-practice scores.">
  <title>Lighthouse results | Code Craft Automation Lab</title>
  <style>
    :root { color-scheme: dark; --background: #10182b; --surface: #1c2c44; --border: #30445d; --text: #f4f8fc; --muted: #a7b8ca; --mint: #5ce1d3; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--background); color: var(--text); font: 16px/1.6 system-ui, sans-serif; }
    main { width: min(960px, calc(100% - 32px)); margin: 0 auto; padding: 48px 0 72px; }
    a { color: var(--mint); }
    a:focus-visible { outline: 3px solid #b7f36b; outline-offset: 4px; }
    header { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 48px; }
    header a { font-weight: 700; text-decoration: none; }
    .eyebrow { margin: 0 0 6px; color: var(--mint); font-size: .78rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    h1 { margin: 0; font-size: clamp(2rem, 6vw, 3.2rem); line-height: 1.1; }
    .intro { margin: 14px 0 32px; color: var(--muted); }
    .result { margin: 18px 0; padding: 22px; border: 1px solid var(--border); border-radius: 16px; background: var(--surface); }
    .result-heading { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
    h2 { margin: 0; overflow-wrap: anywhere; font-size: 1.1rem; }
    .button { display: inline-block; flex: none; padding: 9px 13px; border: 1px solid var(--border); border-radius: 9px; font-size: .88rem; font-weight: 700; text-decoration: none; }
    .button:hover { border-color: var(--mint); }
    .scores { display: grid; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); gap: 10px; margin: 20px 0 0; }
    .score { padding: 12px; border-radius: 10px; background: rgb(16 24 43 / 65%); }
    .score dt { color: var(--muted); font-size: .82rem; }
    .score dd { margin: 2px 0 0; font-size: 1.35rem; font-weight: 800; }
    footer { margin-top: 36px; color: var(--muted); font-size: .9rem; }
    @media (max-width: 600px) { .result-heading { align-items: flex-start; flex-direction: column; } header { align-items: flex-start; flex-direction: column; } }
  </style>
</head>
<body>
  <main>
    <header>
      <a href="../">← QA reports dashboard</a>
      <a href="https://github.com/Akanksha-099/code-craft-automation-lab">View source on GitHub</a>
    </header>
    <p class="eyebrow">Latest published run</p>
    <h1>Lighthouse audit results</h1>
    <p class="intro">Summary scores for the configured targets. Open a full report for detailed opportunities and diagnostics.</p>
    ${entries.join("\n")}
    <footer>Only summary scores for the configured public targets are published here. Full detail reports remain available as <a href="https://github.com/Akanksha-099/code-craft-automation-lab/actions/workflows/lighthouse-tests.yml">GitHub Actions artifacts for two days</a>.</footer>
  </main>
</body>
</html>`;

fs.writeFileSync(outputPath, html);
