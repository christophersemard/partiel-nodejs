import { Injectable, signal, computed } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class CartService {
    private cartKey = "cart_items";

    constructor() {}

    private cart = signal(this.getCart());

    getCart(): any[] {
        const cart = localStorage.getItem(this.cartKey);
        return cart ? JSON.parse(cart) : [];
    }

    addToCart(product: any): void {
        let cart = this.getCart();
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        this.saveCart(cart);
    }

    updateQuantity(productId: string, change: number): void {
        let cart = this.getCart();
        const item = cart.find((p) => p.id === productId);

        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart(cart);
            }
        }
    }

    removeFromCart(productId: string): void {
        let cart = this.getCart().filter((item) => item.id !== productId);
        this.saveCart(cart);
    }

    clearCart(): void {
        localStorage.removeItem(this.cartKey);
    }

    private saveCart(cart: any[]): void {
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }

    // Connaitre le nombre d'articles dans le panier en direct avec un signal qui s'actualise automatiquement
    getCartSize(): number {
        return this.cart().reduce((acc, item) => acc + item.quantity, 0);
    }
}
