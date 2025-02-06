import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderStatus, Role } from "@prisma/client";
import { Prisma } from "@prisma/client";

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {}

    async findOrdersByUser(userId: string) {
        return this.prisma.order.findMany({
            where: { userId, deletedAt: null },
            include: { items: { include: { product: true } } },
        });
    }

    async findOrderById(id: string) {
        return this.prisma.order.findUnique({
            where: { id, deletedAt: null },
            include: { items: { include: { product: true } } },
        });
    }

    async createOrder(
        userId: string,
        products: { productId: string; quantity: number }[]
    ) {
        const productIds = products.map((p) => p.productId);
        const productList = await this.prisma.product.findMany({
            where: { id: { in: productIds }, deletedAt: null },
        });

        if (productList.length !== products.length) {
            throw new BadRequestException(
                "Un ou plusieurs produits sont introuvables."
            );
        }

        return this.prisma.order.create({
            data: {
                userId,
                status: OrderStatus.PENDING,
                items: {
                    create: products.map((p) => ({
                        product: { connect: { id: p.productId } },
                        quantity: p.quantity,
                    })),
                },
            },
            include: { items: { include: { product: true } } },
        });
    }

    async cancelOrder(orderId: string, userId: string, role: Role) {
        const order = await this.findOrderById(orderId);

        if (!order) {
            throw new NotFoundException("Commande introuvable.");
        }

        if (order.userId !== userId && role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }

        if (order.status !== OrderStatus.PENDING) {
            throw new BadRequestException(
                "Impossible d’annuler une commande déjà traitée."
            );
        }

        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: OrderStatus.CANCELLED },
        });
    }

    async findAllOrders(filters: { status?: OrderStatus; date?: string }) {
        const where: Prisma.OrderWhereInput = { deletedAt: null };

        if (filters.status) {
            where.status = filters.status;
        }
        if (filters.date) {
            const parsedDate = new Date(filters.date);
            if (!isNaN(parsedDate.getTime())) {
                where.createdAt = { gte: parsedDate };
            }
        }

        console.log(filters.status, filters.date);

        return this.prisma.order.findMany({
            where,
            include: { items: { include: { product: true } } },
        });
    }

    async updateOrderStatus(orderId: string, status: OrderStatus) {
        const order = await this.findOrderById(orderId);

        if (!order) {
            throw new NotFoundException("Commande introuvable.");
        }

        return this.prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
    }

    async softDeleteOrder(orderId: string) {
        const order = await this.findOrderById(orderId);

        if (!order) {
            throw new NotFoundException("Commande introuvable.");
        }

        return this.prisma.order.update({
            where: { id: orderId },
            data: { deletedAt: new Date() },
        });
    }
}
