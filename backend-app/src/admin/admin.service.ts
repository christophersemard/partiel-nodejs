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
}
