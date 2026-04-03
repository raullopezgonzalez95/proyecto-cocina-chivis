# Dockerfile para frontend React/Vite
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias (incluyendo devDependencies para el build)
RUN npm install

# Copiar código fuente
COPY . .

# Compilar la aplicación Vite
RUN npm run build

# Exponer puerto
EXPOSE 5173

# Servir los archivos estáticos con el servidor Express
CMD ["npm", "run", "start"]