# Étape 1 : Utilisation de Node.js 22 Alpine
FROM node:22-alpine

# Installer les outils nécessaires pour compiler `bcrypt`
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copier package.json et package-lock.json AVANT d'installer les dépendances
COPY package.json package-lock.json ./

# Installation propre des dépendances et recompile `bcrypt`
RUN npm ci && npm rebuild bcrypt --build-from-source

# Copier tout le code source après l’installation des dépendances
COPY . .

# Générer les types Prisma
RUN npx prisma generate

# Compilation du projet
RUN npm run build

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "start"]
