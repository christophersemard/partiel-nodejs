# 🚀 Gestion d'inventaire et de commandes (Dockerized)

Ce projet est une application de gestion d'inventaire et de commandes pour une boutique de vêtements. Il comprend :
- Un **Backend NestJS** avec Prisma et PostgreSQL
- Un **Frontend Angular**
- Une **Dockerisation complète** pour un déploiement facile

---

## 📌 Prérequis

Avant de commencer, assurez-vous d'avoir **Docker et Docker Compose** installés sur votre machine.

🔹 **Vérifiez votre installation Docker :**
```sh
docker --version
```

🔹 **Vérifiez votre installation Docker Compose :**
```sh
docker-compose --version
```

Si ces commandes retournent une version, vous êtes prêt à démarrer.

---

## 🚀 Démarrage de l'application avec Docker

Pour lancer l'application avec Docker, exécutez la commande suivante à la racine du projet :

```sh
docker-compose up --build
```

Cette commande :

✅ **Construit les conteneurs (backend, frontend, PostgreSQL)**

✅ **Lance les migrations et le seed de la base de données**

✅ **Démarre l'API NestJS et l'interface Angular**

Une fois terminé, vous pouvez accéder aux services :
- **Frontend Angular** : [http://localhost:8081](http://localhost:8081)
- **API Backend NestJS** : [http://localhost:3000](http://localhost:3000)


---

## 📬 Postman : Tester l'API facilement

Une **collection Postman** est fournie pour tester l'API rapidement.

📌 **Où la trouver ?**
Le fichier **`postman_collection.json`** est disponible **à la racine du projet**.

📌 **Comment l'utiliser ?**
1. Ouvrez **Postman**
2. Cliquez sur **Importer** et sélectionnez `postman_collection.json`
3. Testez les endpoints en toute simplicité 🎯

---


🎉 **Félicitations ! L'application est maintenant prête à être utilisée.** 🚀

