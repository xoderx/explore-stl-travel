import fs from "node:fs";
import path from "node:path";
const distDir = path.resolve("dist");
if (!fs.existsSync(distDir)) {
  console.log("No dist directory found, skipping sourcemap cleanup.");
  process.exit(0);
}
const entries = fs.readdirSync(distDir, { withFileTypes: true });
const workerFiles = entries
  .filter((entry) => entry.isDirectory() && entry.name !== "client")
  .map((entry) => path.join(distDir, entry.name, "index.js"));
let updated = 0;
for (const file of workerFiles) {
  if (!fs.existsSync(file)) continue;
  const original = fs.readFileSync(file, "utf8");
  const cleaned = original.replace(
    /\n\/\/# sourceMappingURL=data:application\/json;base64,[^\n]*\s*$/m,
    ""
  );
  if (cleaned !== original) {
    fs.writeFileSync(file, cleaned, "utf8");
    console.log(`Removed inline sourcemap from ${file}`);
    updated++;
  }
}
if (updated === 0) {
  console.log("No inline worker sourcemaps found.");
}