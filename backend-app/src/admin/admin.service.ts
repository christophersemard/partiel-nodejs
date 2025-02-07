import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderStatus } from "@prisma/client";

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) {}

    async getDashboardStats() {
        const totalOrders = await this.prisma.order.count();
        const pendingOrders = await this.prisma.order.count({
            where: { status: OrderStatus.PENDING },
        });
        const shippedOrders = await this.prisma.order.count({
            where: { status: OrderStatus.SHIPPED },
        });
        const cancelledOrders = await this.prisma.order.count({
            where: { status: OrderStatus.CANCELLED },
        });

        const totalStock = await this.prisma.product.aggregate({
            _sum: { stock: true },
        });

        const deletedProducts = await this.prisma.product.count({
            where: { deletedAt: { not: null } },
        });

        const topProducts = await this.prisma.orderItem.groupBy({
            by: ["productId"],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: "desc" } },
            take: 5,
        });

        const productDetails = await this.prisma.product.findMany({
            where: { id: { in: topProducts.map((p) => p.productId) } },
            select: { id: true, name: true },
        });

        return {
            totalOrders,
            pendingOrders,
            shippedOrders,
            cancelledOrders,
            totalStock: totalStock._sum.stock || 0,
            deletedProducts,
            topProducts: topProducts.map((p) => ({
                name:
                    productDetails.find((d) => d.id === p.productId)?.name ||
                    "Inconnu",
                sales: p._sum.quantity,
            })),
        };
    }

    async getOrdersPerMonth() {
        const orders = await this.prisma.order.findMany({
            select: { createdAt: true },
        });

        // Générer les 12 derniers mois
        const last12Months: {
            month: number;
            year: number;
            count: number;
        }[] = [];
        const now = new Date();

        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            last12Months.push({
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                count: 0,
            });
        }

        // Compter les commandes par mois
        orders.forEach((order) => {
            const orderMonth = new Date(order.createdAt).getMonth() + 1;
            const orderYear = new Date(order.createdAt).getFullYear();

            const existingMonth = last12Months.find(
                (m) => m.month === orderMonth && m.year === orderYear
            );
            if (existingMonth) {
                existingMonth.count++;
            }
        });

        return last12Months;
    }

    async getProductSales() {
        const sales = await this.prisma.orderItem.groupBy({
            by: ["productId"],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: "desc" } },
        });

        const productDetails = await this.prisma.product.findMany({
            where: { id: { in: sales.map((s) => s.productId) } },
            select: { id: true, name: true },
        });

        return sales.map((sale) => ({
            productName:
                productDetails.find((p) => p.id === sale.productId)?.name ||
                "Inconnu",
            totalSold: sale._sum.quantity,
        }));
    }
}
