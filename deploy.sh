#!/bin/bash

if [ $1 ]; then
git add -A
git commit -a -m $1
fi

git push
ssh root@39.106.189.180 "cd jyjy/app/jyjy_admin && git pull"

npm run build
rsync -avzP \
--password-file=/Users/jdhu/rsync/jyjy.pwd \
/Users/jdhu/work/jyjy/app/jyjy_admin/dist/* \
rsync@39.106.189.180::jishua_backend