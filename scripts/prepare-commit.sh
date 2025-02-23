#!/bin/sh
. ~/.zshrc  # or . ~/.bash_profile if you use bash
node scripts/updateFrontmatter.js
git add src/posts/**/*.md 