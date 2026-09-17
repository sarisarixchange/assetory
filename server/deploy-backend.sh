#!/bin/bash

# ==============================================================================
# Script de Despliegue Automático — Assetory API (McMaster University)
# ==============================================================================

SERVER_USER="navarrol"
SERVER_HOST="web-backend.mcmaster.ca"
REMOTE_PATH="~/assetory/"
SERVICE_NAME="assetory_api.service"

echo "---------------------------------------"
echo "🚀 Iniciando despliegue de Assetory API..."
echo "---------------------------------------"

# 1. Comprobar conectividad a la VPN de McMaster
echo "🔍 Comprobando conexión a la red de McMaster/VPN..."
ping -c 1 -W 2 ${SERVER_HOST} >/dev/null 2>&1
if [[ $? -ne 0 ]]; then
    echo "❌ No se puede alcanzar el servidor. Conéctate a la VPN de McMaster (sslvpn.mcmaster.ca/vpnusers)."
    exit 1
fi
echo "✅ Conexión establecida con ${SERVER_HOST}."

# 2. Sincronizar código fuente del backend
echo "📦 1/4. Sincronizando código del servidor con rsync..."
rsync -avz --progress \
    --include='init.sql' \
    --exclude='node_modules' \
    --exclude='.env' \
    --exclude='.git' \
    --exclude='*.sql' \
    --exclude='*.log' \
    ./ ${SERVER_USER}@${SERVER_HOST}:${REMOTE_PATH} || { echo "❌ Falló rsync de código"; exit 1; }

# 3. Sincronizar archivos estáticos (uploads) desde server/uploads/
if [ -d "./uploads/" ]; then
    echo "🖼️  2/4. Sincronizando carpeta de uploads/assets..."
    rsync -avz --progress ./uploads/ ${SERVER_USER}@${SERVER_HOST}:${REMOTE_PATH}uploads/
else
    echo "⚠️  No se encontró la carpeta local ./uploads/, omitiendo paso."
fi

# 4. Ajustar permisos e instalar dependencias en el servidor
echo "🔧 3/4. Actualizando dependencias de Node.js y permisos..."
ssh ${SERVER_USER}@${SERVER_HOST} "cd ${REMOTE_PATH} && npm install --production && chmod -R 755 uploads/"

# 5. Reiniciar servicio en el servidor de producción
echo "🔄 4/4. Reiniciando servicio ${SERVICE_NAME}..."
ssh ${SERVER_USER}@${SERVER_HOST} "sudo systemctl restart ${SERVICE_NAME}"

if [[ $? -eq 0 ]]; then
    echo "---------------------------------------"
    echo "✅ ¡Despliegue del Backend completado con éxito!"
    echo "---------------------------------------"
else
    echo "❌ Error al reiniciar el servicio remoto."
    exit 1
fi

# Sincronizar esquema de base de datos
echo "🗄️ Aplicando cambios de base de datos...aplicar/crear las tablas faltantes en PostgreSQL cada vez que haces un despliegue"
ssh ${SERVER_USER}@${SERVER_HOST} "psql -h pgsql -U sarisari_db -d sarisari_db -f ${REMOTE_PATH}init.sql"