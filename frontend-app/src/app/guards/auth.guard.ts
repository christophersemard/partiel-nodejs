import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthProviderService } from "../services/auth-provider.service";

export const AuthGuard: CanActivateFn = (route, state) => {
    const authProvider = inject(AuthProviderService);
    const router = inject(Router);

    console.log("AuthGuard");
    console.log(authProvider.isAuthenticated());

    if (!authProvider.isAuthenticated()) {
        router.navigate(["/login"]);
        return false;
    }
    return true;
};
