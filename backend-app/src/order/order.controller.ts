import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Query,
    Body,
    UseGuards,
    Req,
    ForbiddenException,
    NotFoundException,
    BadRequestException,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { OrderStatus, Role } from "@prisma/client";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
    user: { userId: string; email: string; role: Role };
}

@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(JwtAuthGuard)
    @Get("me")
    async getMyOrders(@Req() req: AuthenticatedRequest) {
        return this.orderService.findOrdersByUser(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getOrderById(
        @Param("id") id: string,
        @Req() req: AuthenticatedRequest
    ) {
        const order = await this.orderService.findOrderById(id);

        if (!order) {
            throw new NotFoundException("Commande introuvable.");
        }

        if (order.userId !== req.user.userId && req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }

        return order;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createOrder(
        @Req() req: AuthenticatedRequest,
        @Body() body: { products: { productId: string; quantity: number }[] }
    ) {
        if (!body.products || body.products.length === 0) {
            throw new BadRequestException(
                "La commande doit contenir au moins un produit avec une quantité."
            );
        }

        return this.orderService.createOrder(req.user.userId, body.products);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id/cancel")
    async cancelOrder(
        @Param("id") id: string,
        @Req() req: AuthenticatedRequest
    ) {
        return this.orderService.cancelOrder(
            id,
            req.user.userId,
            req.user.role
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllOrders(
        @Query() filters: { status?: OrderStatus; date?: string },
        @Req() req: AuthenticatedRequest
    ) {
        if (req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }

        return this.orderService.findAllOrders(filters);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id/status")
    async updateOrderStatus(
        @Param("id") id: string,
        @Body() body: { status: OrderStatus },
        @Req() req: AuthenticatedRequest
    ) {
        if (req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }

        return this.orderService.updateOrderStatus(id, body.status);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id/delete")
    async deleteOrder(
        @Param("id") id: string,
        @Req() req: AuthenticatedRequest
    ) {
        if (req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }

        return this.orderService.softDeleteOrder(id);
    }
}
