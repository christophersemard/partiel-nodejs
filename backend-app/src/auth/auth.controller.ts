import {
    Controller,
    Post,
    Body,
    BadRequestException,
    UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Role } from "@prisma/client";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body() data: { email: string; password: string }) {
        if (!data.email || !data.password) {
            throw new BadRequestException("Email et mot de passe sont requis.");
        }

        const user = await this.authService.validateUser(
            data.email,
            data.password
        );
        if (!user) {
            throw new UnauthorizedException("Connexion refusée.");
        }

        return this.authService.login(user);
    }

    @Post("register")
    async register(
        @Body() data: { email: string; password: string; role?: Role }
    ) {
        if (!data.email || !data.password) {
            throw new BadRequestException("Email et mot de passe sont requis.");
        }
        return this.authService.register(data);
    }
}
