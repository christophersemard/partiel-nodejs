import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductModule } from "./product/product.module";
import { OrderModule } from "./order/order.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        ProductModule,
        OrderModule,
        AuthModule,
        UserModule,
        AdminModule,
    ],
})
export class AppModule {}
