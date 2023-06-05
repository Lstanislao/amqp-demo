#!/bin/bash
echo "staring deploy:api mode:development"
cd /var/www/dev/api
git pull origin development > /dev/null
npm ci && npm run build && pm2 stop api && pm2 start api
echo "finish deploy:api mode:development"
