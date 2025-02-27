import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { OrderService } from "../../services/order.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthProviderService } from "../../services/auth-provider.service";

@Component({
    selector: "app-cart",
    standalone: true,
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
    imports: [CommonModule],
})
export class CartComponent implements OnInit {
    cart: any[] = [];
    authProvider = inject(AuthProviderService);

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private router: Router
    ) {}

    showToast = false;
    message = "";

    ngOnInit(): void {
        this.loadCart();
    }

    isAuthenticated = computed(() => {
        return this.authProvider.isAuthenticated();
    });

    loadCart(): void {
        this.cart = this.cartService.getCart();
    }
    getTotal(): number {
        return this.cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }

    increaseQuantity(productId: string): void {
        this.cartService.updateQuantity(productId, 1);
        this.loadCart();
        this.showToast = true;
        this.message = "Quantité mise à jour";

        setTimeout(() => {
            this.showToast = false;
        }, 3000);
    }

    decreaseQuantity(productId: string): void {
        this.cartService.updateQuantity(productId, -1);
        this.loadCart();
        this.showToast = true;
        this.message = "Quantité mise à jour";

        setTimeout(() => {
            this.showToast = false;
        }, 3000);
    }

    removeFromCart(productId: string): void {
        this.cartService.removeFromCart(productId);
        this.loadCart();
        this.showToast = true;
        this.message = "Produit retiré du panier";

        setTimeout(() => {
            this.showToast = false;
        }, 3000);
    }

    validateOrder(): void {
        if (this.cart.length === 0) return;

        const orderData = {
            products: this.cart.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };

        this.orderService.createOrder(orderData).subscribe((order) => {
            this.cartService.clearCart(); // Vider le panier après validation

            this.showToast = true;

            setTimeout(() => {
                this.showToast = false;
                this.message = "Commande validée";
            }, 3000);

            this.router.navigate([`/orders/${order.id}`]); // Rediriger vers la commande créée
        });
    }
}
