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
        console.log("isAuthenticated");
        console.log(this.authProvider.isAuthenticated());
        return this.authProvider.isAuthenticated();
    });
    isAdmin = computed(() => {
        console.log("isAdmin");
        console.log(this.authProvider.isAdmin());
        return this.authProvider.isAdmin();
    });
    cartItemCount = signal(0);

    constructor() {
        this.updateCartCount();
    }

    updateCartCount(): void {
        this.cartItemCount.set(
            this.cartService
                .getCart()
                .reduce((total, item) => total + item.quantity, 0)
        );
    }

    logout(): void {
        this.authProvider.logout();
        this.router.navigate(["/login"]);
    }
}
