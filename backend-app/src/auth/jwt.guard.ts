import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest<TUser = any>(
        err: any,
        user: TUser,
        info: Error | null
    ): TUser {
        if (err || !user) {
            const errorMessage = info instanceof Error ? info.message : null;

            if (errorMessage === "No auth token") {
                throw new UnauthorizedException(
                    "Token d’authentification manquant."
                );
            }
            if (errorMessage === "jwt expired") {
                throw new UnauthorizedException("Token expiré.");
            }
            if (errorMessage === "invalid signature") {
                throw new UnauthorizedException("Token invalide.");
            }

            throw new UnauthorizedException("Accès refusé.");
        }
        return user;
    }
}
