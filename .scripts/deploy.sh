#!/bin/bash
set -e

echo "Deployment started..."

export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh

# Pull the latest version of the app
git pull origin master
echo "New changes copied to server!"

echo "Installing Dependencies..."
pnpm install

echo "Creating Production Build..."
pnpm run build

echo "PM2 Reload"
pm2 restart www.salimi.my

echo "Deployment Finished!"