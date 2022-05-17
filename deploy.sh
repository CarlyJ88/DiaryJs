#! /usr/bin/env sh 
set -e
cd ./Frontend && npm run build
cd ../Backend && npm run build
cd ..
docker build -t registry.heroku.com/metablogger/web .
docker push registry.heroku.com/metablogger/web
heroku container:release web