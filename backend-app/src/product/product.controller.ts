import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    UseGuards,
    Req,
    ForbiddenException,
    NotFoundException,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { Role } from "@prisma/client";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
    user: { userId: string; email: string; role: Role };
}

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts() {
        return this.productService.findAll();
    }

    @Get(":id")
    async getProductById(@Param("id") id: string) {
        const product = await this.productService.findById(id);
        if (!product) {
            throw new NotFoundException("Produit introuvable.");
        }
        return product;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProduct(
        @Req() req: AuthenticatedRequest,
        @Body()
        body: { name: string; price: number; stock: number; imageUrl: string }
    ) {
        if (req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }
        return this.productService.create(body);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async updateProduct(
        @Param("id") id: string,
        @Req() req: AuthenticatedRequest,
        @Body()
        body: Partial<{
            name: string;
            price: number;
            stock: number;
            imageUrl: string;
        }>
    ) {
        if (req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }
        return this.productService.update(id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteProduct(
        @Param("id") id: string,
        @Req() req: AuthenticatedRequest
    ) {
        if (req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }
        return this.productService.softDelete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id/restore")
    async restoreProduct(
        @Param("id") id: string,
        @Req() req: AuthenticatedRequest
    ) {
        if (req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }
        return this.productService.restore(id);
    }
}
