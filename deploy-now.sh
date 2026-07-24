#!/bin/bash
cd /Users/paranjay/Developer/politik
echo "=== Build ===" > /tmp/deploy-result.txt
npm run build >> /tmp/deploy-result.txt 2>&1
echo "BUILD_EXIT=$?" >> /tmp/deploy-result.txt
echo "=== Deploy ===" >> /tmp/deploy-result.txt
VERCEL_NONINTERACTIVE=1 vercel --yes --prod >> /tmp/deploy-result.txt 2>&1
echo "VERCEL_EXIT=$?" >> /tmp/deploy-result.txt
echo "=== Done ===" >> /tmp/deploy-result.txt
