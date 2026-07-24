#!/bin/bash
cd /Users/paranjay/Developer/politik
npx tsc --noEmit > /tmp/tsc-out.txt 2>&1
echo "EXIT_CODE=$?"
wc -l /tmp/tsc-out.txt
tail -5 /tmp/tsc-out.txt
