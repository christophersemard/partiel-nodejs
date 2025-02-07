# Étape 1 : Utilisation de Node.js 22 Alpine
FROM node:22-alpine

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer toutes les dépendances (y compris devDependencies)
RUN npm ci

# Copier tout le code source
COPY . .

# Exposition du port Angular (par défaut : 4200)
EXPOSE 4200

# Lancer Angular en mode développement
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
