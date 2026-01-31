const fs = require('fs');
const path = require('path');
const glob = require('glob');
const exts = ['.ts', '.tsx', '.js', '.jsx'];
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}');
let missing = [];

// Vercel debug: when running on Vercel, print what files exist under src/components/ui
if (process.env.VERCEL) {
  try {
    const uiDir = path.resolve(process.cwd(), 'src/components/ui');
    const uiFiles = fs.existsSync(uiDir) ? fs.readdirSync(uiDir) : [];
    console.log('VERCEL DEBUG: src/components/ui files ->', uiFiles);
    console.log('VERCEL DEBUG: toaster present ->', uiFiles.includes('toaster.tsx') || uiFiles.includes('toaster.ts'));
    console.log('VERCEL DEBUG: node.version ->', process.version, 'platform ->', process.platform);
  } catch (err) {
    console.log('VERCEL DEBUG: error reading src/components/ui ->', err && err.message);
  }
}

files.forEach(f => {
  const src = fs.readFileSync(f, 'utf8');
  const re = /import\s+[^'\"]+['\"]([^'\"]+)['\"]/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const imp = m[1];
    if (imp.startsWith('.') || imp.startsWith('/')) {
      let resolved = null;
      const base = path.resolve(path.dirname(f), imp);
      // if the import already has an extension, check it directly
      if (exts.includes(path.extname(imp))) {
        if (fs.existsSync(base)) {
          resolved = base;
        }
      } else {
        for (const e of exts) {
          if (fs.existsSync(base + e)) {
            resolved = base + e;
            break;
          }
        }
        if (!resolved && fs.existsSync(base) && fs.lstatSync(base).isDirectory()) {
          for (const e of exts) {
            if (fs.existsSync(path.join(base, 'index' + e))) {
              resolved = path.join(base, 'index' + e);
              break;
            }
          }
        }
      }
      if (!resolved) {
        missing.push({ file: f, import: imp });
      }
    }
  }
});
if (missing.length) {
  console.log('Missing imports:');
  console.log(JSON.stringify(missing, null, 2));
  process.exit(1);
} else {
  console.log('No missing relative imports found.');
}
