#!/bin/bash
cd /Users/paranjay/Developer/politik
NO_COLOR=1 npx next build 2>&1 | sed $'s/\033\[[0-9;]*[a-zA-Z]//g' > _build.log 2>&1
echo "EXITCODE=$?" >> _build.log
