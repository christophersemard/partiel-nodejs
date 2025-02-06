import { PrismaClient, Role, OrderStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Hash du mot de passe
    const hashedPassword: string = await bcrypt.hash("password123", 10);

    // Création des utilisateurs
    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            email: "admin@example.com",
            password: hashedPassword,
            role: Role.ADMIN,
        },
    });

    const users = await prisma.user.createMany({
        data: [
            {
                email: "user1@example.com",
                password: hashedPassword,
                role: Role.CLIENT,
            },
            {
                email: "user2@example.com",
                password: hashedPassword,
                role: Role.CLIENT,
            },
            {
                email: "user3@example.com",
                password: hashedPassword,
                role: Role.CLIENT,
            },
        ],
    });

    console.log("Utilisateurs créés:", { admin, users });

    // Ajout de 20 produits
    const productData = Array.from({ length: 20 }).map((_, i) => ({
        name: `Produit ${i + 1}`,
        description: `Description du produit ${i + 1}`,
        price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
        stock: Math.floor(Math.random() * 200) + 10,
        imageUrl: `https://picsum.photos/${
            Math.floor(Math.random() * 200) + 300
        }/${Math.floor(Math.random() * 200) + 300}`,
    }));

    await prisma.product.createMany({
        data: productData,
    });

    console.log("20 produits ajoutés.");

    // Récupérer les produits et utilisateurs
    const allProducts = await prisma.product.findMany();
    const allUsers = await prisma.user.findMany({
        where: { role: Role.CLIENT },
    });

    // Création de quelques commandes aléatoires
    for (const user of allUsers) {
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                status: OrderStatus.PENDING,
                items: {
                    create: allProducts
                        .sort(() => 0.5 - Math.random()) // Mélange les produits
                        .slice(0, 3) // Sélectionne 3 produits aléatoires
                        .map((product) => ({
                            productId: product.id,
                            quantity: Math.floor(Math.random() * 5) + 1, // Quantité entre 1 et 5
                        })),
                },
            },
        });

        console.log(`Commande créée pour ${user.email}:`, order);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
