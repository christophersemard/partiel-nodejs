import { Component, computed, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { AuthProviderService } from "../../services/auth-provider.service";
import { CartService } from "../../services/cart.service";

@Component({
    selector: "app-header",
    standalone: true,
    templateUrl: "./header.component.html",
    imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
    authProvider = inject(AuthProviderService);
    cartService = inject(CartService);
    private router = inject(Router);

    // Computed -> Mise à jour automatique
    isAuthenticated = computed(() => {
        return this.authProvider.isAuthenticated();
    });
    isAdmin = computed(() => {
        return this.authProvider.isAdmin();
    });
    cartItemCount = computed(() => this.cartService.getCartSize() || 0);

    logout(): void {
        this.authProvider.logout();
        this.router.navigate(["/login"]);
    }
}
