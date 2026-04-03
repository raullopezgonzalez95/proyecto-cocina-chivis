# Dockerfile para frontend React/Vite
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 5173

# Comando para ejecutar el servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]