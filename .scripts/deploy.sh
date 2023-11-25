#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app
git pull origin master
echo "New changes copied to server!"

echo "Installing Dependencies..."
pnpm install --yes

echo "Creating Production Build..."
pnpm run build

echo "PM2 Restart"
pm2 restart www.salimi.my

echo "Deployment Finished!"