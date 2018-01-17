#!/bin/bash

if [ $1 ]; then
git add -A
git commit -a -m $1
fi

git push
ssh root@39.106.189.180 "cd jyjy/app/jyjy_admin && git pull"