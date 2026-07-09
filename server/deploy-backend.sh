#!/bin/bash

#############################################
#  McMaster Backend Deployment Script (VPN-checked)
#  Connect to VPN sslvpn.mcmaster.ca/vpnusers before running
#############################################

REMOTE_USER="navarrol"
REMOTE_HOST="web-backend.mcmaster.ca"  # 👈 Host interno correcto para la VPN
REMOTE_DIR="~/assetory"    # 👈 Ruta raíz del backend en el servidor
SERVICE_NAME="assetory_api.service"

echo "---------------------------------------"
echo "🚀 Iniciando despliegue del BACKEND a McMaster"
echo "---------------------------------------"

### 1. Verificar conectividad de la VPN
echo "🔍 Comprobando conexión con el servidor (Requiere VPN)..."
ping -c 1 $REMOTE_HOST >/dev/null 2>&1
if [[ $? -ne 0 ]]; then
    echo "❌ No se puede alcanzar el servidor. Conéctate a la VPN de McMaster e intenta de nuevo."
    exit 1
else
    echo "✅ Servidor alcanzable — procediendo."
fi

### 2. Enviar archivos vía rsync (Excluyendo entorno local y archivos subidos)
echo "📦 Transfiriendo archivos de Node.js..."
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.env' \
  --exclude 'uploads' \
  --exclude '.git' \
  ./ $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/

### 3. Conectarse por SSH para actualizar dependencias y reiniciar el backend
echo "🔄 Reiniciando el servicio de Node en el servidor..."
ssh $REMOTE_USER@$REMOTE_HOST << EOF
    cd $REMOTE_DIR
    
    # echo "📥 Instalando dependencias de npm en producción..."
    # npm install --production
    
    echo "⚡ Reiniciando el servicio a través de systemctl..."
    # Si la de IT te dio un comando local sin sudo, cámbialo aquí.
    sudo systemctl restart assetory_api.service
    
    echo "👀 Verificando estado del servicio..."
    sudo systemctl status assetory_api.service

EOF

echo "---------------------------------------"
echo "✅ ¡Despliegue del backend completado con éxito!"
echo "---------------------------------------"