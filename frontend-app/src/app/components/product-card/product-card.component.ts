import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CartService } from "../../services/cart.service";

@Component({
    selector: "app-product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: ["./product-card.component.css"],
    imports: [RouterModule],
})
export class ProductCardComponent {
    @Input() product!: {
        id: string;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
    };

    constructor(private cartService: CartService) {}

    addToCart(): void {
        this.cartService.addToCart(this.product);
        console.log(`Produit ajouté au panier : ${this.product.name}`);
    }
}
