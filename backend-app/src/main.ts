import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import * as dotenv from "dotenv";

dotenv.config();
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter()); // ✅ Active la gestion globale des erreurs
    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
