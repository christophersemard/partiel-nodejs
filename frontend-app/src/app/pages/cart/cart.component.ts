import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
    imports: [CommonModule],
})
export class CartComponent implements OnInit {
    cart: any[] = [];

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.loadCart();
    }

    loadCart(): void {
        this.cart = this.cartService.getCart();
    }

    increaseQuantity(productId: string): void {
        this.cartService.updateQuantity(productId, 1);
        this.loadCart();
    }

    decreaseQuantity(productId: string): void {
        this.cartService.updateQuantity(productId, -1);
        this.loadCart();
    }

    removeFromCart(productId: string): void {
        this.cartService.removeFromCart(productId);
        this.loadCart();
    }
}
