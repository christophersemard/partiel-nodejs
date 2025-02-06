import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CartService } from "../../services/cart.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.css"],
    imports: [RouterModule, CommonModule],
})
export class ProductCardComponent {
    @Input() product!: {
        id: string;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
    };

    showToast = false;

    constructor(private cartService: CartService) {}

    addToCart(): void {
        this.cartService.addToCart(this.product);
        console.log(`Produit ajouté au panier : ${this.product.name}`);
        this.showToast = true;

        setTimeout(() => {
            this.showToast = false;
        }, 3000);
    }
}
