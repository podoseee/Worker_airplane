const fs = require("fs");
const vm = require("vm");

const htmlFiles = fs.readdirSync(".").filter(file => file.endsWith(".html"));
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync("js/data.js", "utf8"), ctx);

const missing = [];
for (const file of htmlFiles) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/href="([^"#]+\.html[^"]*)"/g)) {
    const href = match[1].split("?")[0];
    if (!fs.existsSync(href)) missing.push(`${file} -> ${href}`);
  }
}

console.log(JSON.stringify({
  htmlPages: htmlFiles.length,
  flights: ctx.window.flightData.length,
  personas: ctx.window.personaData.length,
  missingLinks: missing
}, null, 2));
