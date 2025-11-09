#!/bin/bash

#############################################
#  McMaster Deployment Script (VPN-checked)
#  Author: Pixel & ChatGPT 
# connect to VPN sslvpn.mcmaster.ca/vpnusers 
#############################################

# Inside client/ folder
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
LOCAL_DIST="$SCRIPT_DIR/dist" 


REMOTE_USER="navarrol"
REMOTE_HOST="web-backend.mcmaster.ca"
REMOTE_DIR="~/public_html"

echo "---------------------------------------"
echo "🚀 Deploying Assetory to McMaster Server"
echo "---------------------------------------"

### 1. Verify VPN connectivity
echo "🔍 Checking VPN connectivity..."
ping -c 1 web-backend.mcmaster.ca >/dev/null 2>&1
if [[ $? -ne 0 ]]; then
    echo "❌ Cannot reach server. Please connect to McMaster VPN or check your network."
    exit 1
else
    echo "✅ Server reachable — proceeding."
fi
echo "✅ VPN appears to be active."

### 2. Build Vue app
echo "🏗  Building project..."
npm run build:mcmaster || { echo "❌ Build failed"; exit 1; }

### 3. Ensure 404.html exists
echo "📄 Creating 404.html..."
cp "$LOCAL_DIST/index.html" "$LOCAL_DIST/404.html"

### 4. Ensure .htaccess exists
HTACCESS_PATH="$LOCAL_DIST/.htaccess"
if [[ ! -f "$HTACCESS_PATH" ]]; then
  echo "⚠️  .htaccess not found — generating..."
  cat << 'EOF' > "$HTACCESS_PATH"
RewriteEngine On
RewriteBase /~navarrol/

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

RewriteRule . /~navarrol/index.html [L]
EOF
else
  echo "✅ .htaccess already exists."
fi

### 5. Backup remote files (optional)
echo "📦 Backing up remote public_html..."
ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p ~/public_html_backup && cp -r public_html/* public_html_backup/"

### 6. Upload dist → server
echo "📤 Uploading via rsync..."
rsync -av --progress "$LOCAL_DIST/" $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/

### 7. Set proper permissions
echo "🔧 Fixing permissions..."
ssh $REMOTE_USER@$REMOTE_HOST "chmod -R 755 $REMOTE_DIR/*"

echo "✅ Deployment successful!"
echo "🌐 View your site at:"
echo "👉 https://sarisarixchange.ca/"
echo "---------------------------------------"
echo "🚀 Deployment Complete!"