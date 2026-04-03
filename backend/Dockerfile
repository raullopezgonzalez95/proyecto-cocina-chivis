# Dockerfile para backend Node.js
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar código fuente
COPY src/ ./src/

# Exponer puerto
EXPOSE 5001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]