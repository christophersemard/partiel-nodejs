import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthProviderService } from "../services/auth-provider.service";

export const AdminGuard: CanActivateFn = (route, state) => {
    const authProvider = inject(AuthProviderService);
    const router = inject(Router);

    console.log("AdminGuard");
    console.log(authProvider.isAdmin());

    if (!authProvider.isAdmin()) {
        router.navigate(["/"]);
        return false;
    }
    return true;
};
