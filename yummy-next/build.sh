#!/bin/bash

SERVICE_NAME=yummy-next
PROJECT_GIT_DIR="/home/seunghwan/Documents/yummy-react"
PROJECT_DIR="/home/seunghwan/Documents/yummy-react/yummy-next"

echo "🔧 [1/6] Stopping systemd service: $SERVICE_NAME ..."
sudo systemctl stop $SERVICE_NAME

echo "📥 [2/6] Pulling latest code from Git..."
cd "$PROJECT_GIT_DIR" || { echo "❌ Failed to access project git directory"; exit 1; }

git reset --hard HEAD
git pull origin main
GIT_RESULT=$?

if [ $GIT_RESULT -ne 0 ]; then
  echo "❌ Git pull failed. Deployment aborted."
  exit 1
fi

cd "$PROJECT_DIR" || { echo "❌ Failed to access project directory"; exit 1; }

echo "🛠️   [3/6] Building project with npm ..."
npm run build
BUILD_RESULT=$?

if [ $BUILD_RESULT -ne 0 ]; then
  echo "❌ Npm build failed. Deployment aborted."
  exit 1
fi

echo "🚀 [4/6] Starting systemd service: $SERVICE_NAME ..."
sudo systemctl start $SERVICE_NAME

echo "🟢 [5/6] Checking service status ..."
sudo systemctl status $SERVICE_NAME --no-pager

echo "✅ [6/6] Deployment complete!"
