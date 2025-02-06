import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllUsers() {
        return this.prisma.user.findMany({
            select: { id: true, email: true, role: true, createdAt: true },
        });
    }

    async findUserById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, role: true, createdAt: true },
        });
    }

    async findUserOrders(userId: string) {
        return this.prisma.order.findMany({
            where: { userId, deletedAt: null },
            include: { items: { include: { product: true } } },
        });
    }
}
