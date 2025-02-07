import { PrismaClient, Role, OrderStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    console.log("Données existantes supprimées.");

    const hashedPassword: string = await bcrypt.hash("password123", 10);

    // Création de l'admin
    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            email: "admin@example.com",
            password: hashedPassword,
            role: Role.ADMIN,
        },
    });

    // Création de 20 utilisateurs clients
    const userData = Array.from({ length: 20 }).map((_, i) => ({
        email: `user${i + 1}@example.com`,
        password: hashedPassword,
        role: Role.CLIENT,
    }));

    await prisma.user.createMany({ data: userData });

    console.log("20 utilisateurs clients créés.");

    // Ajout de 20 produits, certains plus populaires
    const productData = Array.from({ length: 20 }).map((_, i) => ({
        name: `Produit ${i + 1}`,
        description: `Description du produit ${i + 1}`,
        price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
        stock: Math.floor(Math.random() * 200) + 10,
        imageUrl: `https://picsum.photos/${
            Math.floor(Math.random() * 200) + 300
        }/${Math.floor(Math.random() * 200) + 300}`,
    }));

    await prisma.product.createMany({ data: productData });

    console.log("20 produits ajoutés.");

    // Récupérer les produits et utilisateurs
    const allProducts = await prisma.product.findMany();
    const allUsers = await prisma.user.findMany({
        where: { role: Role.CLIENT },
    });

    // Création de 50 commandes aléatoires réparties sur 12 mois
    const orderStatuses = [
        OrderStatus.PENDING,
        OrderStatus.SHIPPED,
        OrderStatus.CANCELLED,
    ];

    // Liste des produits "favoris" qui apparaîtront plus souvent dans les commandes
    const popularProductIds = new Set<string>();

    for (let i = 0; i < 5; i++) {
        popularProductIds.add(allProducts[i].id); // Sélectionne les 5 premiers produits comme favoris
    }

    for (let i = 0; i < 50; i++) {
        const randomUser =
            allUsers[Math.floor(Math.random() * allUsers.length)];

        // Générer une date entre mars 2024 et février 2025
        const randomMonth = Math.floor(Math.random() * 12);
        const randomDay = Math.floor(Math.random() * 28) + 1;
        const randomDate = new Date(2024, randomMonth, randomDay);

        await prisma.order.create({
            data: {
                userId: randomUser.id,
                status:
                    orderStatuses[
                        Math.floor(Math.random() * orderStatuses.length)
                    ],
                createdAt: randomDate,
                items: {
                    create: allProducts
                        .sort(() => 0.5 - Math.random()) // Mélange les produits
                        .slice(0, Math.floor(Math.random() * 5) + 1) // Sélectionne entre 1 et 5 produits
                        .map((product) => ({
                            productId: product.id,
                            quantity: Math.floor(Math.random() * 5) + 1,
                            // Augmente la probabilité de sélectionner les produits populaires
                            ...(popularProductIds.has(product.id)
                                ? {
                                      quantity:
                                          Math.floor(Math.random() * 5) + 3,
                                  }
                                : {}),
                        })),
                },
            },
        });
    }

    console.log("50 commandes aléatoires créées.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
