import {
    Controller,
    Get,
    UseGuards,
    Req,
    ForbiddenException,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { Role } from "@prisma/client";
import { AdminService } from "./admin.service";
import { Request } from "express";

interface AuthenticatedRequest extends Request {
    user: { userId: string; email: string; role: Role };
}

@Controller("api/admin")
@UseGuards(JwtAuthGuard)
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @UseGuards(JwtAuthGuard)
    @Get("dashboard")
    async getDashboardStats(@Req() req: AuthenticatedRequest) {
        if (req.user.role !== Role.ADMIN) {
            throw new ForbiddenException("Accès interdit.");
        }

        return this.adminService.getDashboardStats();
    }
}
