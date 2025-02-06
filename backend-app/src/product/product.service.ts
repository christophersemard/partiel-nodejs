import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.product.findMany({
            where: { deletedAt: null },
        });
    }

    async findById(id: string) {
        return this.prisma.product.findUnique({
            where: { id, deletedAt: null },
        });
    }

    async create(data: {
        name: string;
        price: number;
        stock: number;
        imageUrl: string;
    }) {
        return this.prisma.product.create({ data });
    }

    async update(
        id: string,
        data: Partial<{
            name: string;
            price: number;
            stock: number;
            imageUrl: string;
        }>
    ) {
        return this.prisma.product.update({
            where: { id, deletedAt: null },
            data,
        });
    }

    async softDelete(id: string) {
        const product = await this.findById(id);
        if (!product) {
            throw new NotFoundException("Produit introuvable.");
        }

        return this.prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }

    async restore(id: string) {
        return this.prisma.product.update({
            where: { id },
            data: { deletedAt: null },
        });
    }

    async findDeleted() {
        return this.prisma.product.findMany({
            where: { deletedAt: { not: null } },
        });
    }
}
