#!/bin/bash
cd /Users/paranjay/Developer/politik
NO_COLOR=1 npm run build 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | cat -v > build-output.txt
echo "Build exit code: $?" >> build-output.txt
