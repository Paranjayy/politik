#!/bin/bash
cd /Users/paranjay/Developer/politik
echo "=== Build ==="
npm run build > /tmp/build.log 2>&1
BUILD_EXIT=$?
echo "Build exit code: $BUILD_EXIT" | tee /tmp/deploy.log
tail -5 /tmp/build.log | tee -a /tmp/deploy.log
echo "" | tee -a /tmp/deploy.log
echo "=== Deploy ==="
vercel --yes --prod > /tmp/vercel.log 2>&1
VERCEL_EXIT=$?
echo "Vercel exit code: $VERCEL_EXIT" | tee -a /tmp/deploy.log
cat /tmp/vercel.log | tee -a /tmp/deploy.log
echo "" | tee -a /tmp/deploy.log
echo "=== Done ==="
