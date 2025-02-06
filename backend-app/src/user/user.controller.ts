import {
    Controller,
    Get,
    Param,
    UseGuards,
    Req,
    ForbiddenException,
    NotFoundException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { Role } from "@prisma/client";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
    user: { userId: string; email: string; role: Role };
}

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(@Req() req: AuthenticatedRequest) {
        if (req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }
        return this.userService.findAllUsers();
    }

    @Get(":id")
    async getUserById(
        @Param("id") id: string,
        @Req() req: AuthenticatedRequest
    ) {
        if (req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }

        const user = await this.userService.findUserById(id);
        if (!user) {
            throw new NotFoundException("Utilisateur introuvable.");
        }

        return user;
    }

    @Get(":id/orders")
    async getUserOrders(
        @Param("id") id: string,
        @Req() req: AuthenticatedRequest
    ) {
        if (req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }

        return this.userService.findUserOrders(id);
    }
}
