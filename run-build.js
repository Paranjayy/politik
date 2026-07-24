#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
try {
  const output = execSync('npx next build 2>&1', { 
    encoding: 'utf8', 
    timeout: 180000,
    maxBuffer: 10 * 1024 * 1024 
  });
  fs.writeFileSync('/tmp/build-result.txt', output);
  console.log('BUILD SUCCESS');
} catch (e) {
  const output = (e.stdout || '') + '\n' + (e.stderr || '');
  fs.writeFileSync('/tmp/build-result.txt', output);
  console.log('BUILD FAILED with exit code ' + e.status);
}
