import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
    ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { Role } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async validateUser(
        email: string,
        password: string
    ): Promise<{ id: string; email: string; role: string } | null> {
        if (!email || !password) {
            throw new BadRequestException("Email et mot de passe sont requis.");
        }

        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new UnauthorizedException("Identifiants invalides.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException("Identifiants invalides.");
        }

        return { id: user.id, email: user.email, role: user.role };
    }

    async login(user: {
        id: string;
        email: string;
        role: string;
    }): Promise<{ access_token: string }> {
        if (!user) {
            throw new UnauthorizedException("Connexion échouée.");
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        return { access_token: await this.jwtService.signAsync(payload) };
    }

    async register(data: { email: string; password: string; role?: Role }) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new ConflictException("Cet email est déjà utilisé.");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                role: data.role ?? Role.CLIENT,
            },
        });

        return this.login(user);
    }
}
