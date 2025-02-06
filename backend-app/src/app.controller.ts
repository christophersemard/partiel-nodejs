import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";

@Controller()
export class AppController {
    constructor(private readonly prisma: PrismaService) {}

    @Get("test-db")
    async testDb() {
        return await this.prisma.user.findMany(); // Vérifie que les utilisateurs s'affichent
    }
}
