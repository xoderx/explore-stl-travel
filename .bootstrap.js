#!/usr/bin/env bun
// One-time bootstrap - deletes self after run
import fs from 'fs';
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  if (!pkg.name.includes('explore-stl')) {
    pkg.name = 'explore-stl-dzudrkaozi3dydnd5dlxlfin';
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  }
  // Delete prepare script if exists
  if (pkg.scripts.prepare) {
    delete pkg.scripts.prepare;
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  }
  // Self-delete
  if (fs.existsSync('.bootstrap.js')) {
    fs.unlinkSync('.bootstrap.js');
  }
  console.log('✅ Bootstrap complete');
} catch (e) {
  console.error('Bootstrap failed:', e);
}