#!/bin/sh
export PATH="/usr/local/bin/node:$PATH"
node scripts/updateFrontmatter.js
git add src/posts/**/*.md