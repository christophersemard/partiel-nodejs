import { Module, Global } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global() // Rend le module accessible partout sans import explicite
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
