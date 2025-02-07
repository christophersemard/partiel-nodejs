import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-product-detail",
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.css"],
    imports: [CommonModule],
})
export class ProductDetailComponent implements OnInit {
    product: any;
    quantity: number = 1; // Quantité initiale

    showToast = false;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService
    ) {}

    ngOnInit(): void {
        this.loadProduct();
    }

    loadProduct(): void {
        const productId = this.route.snapshot.paramMap.get("id");
        if (productId) {
            this.productService.getProductById(productId).subscribe((data) => {
                this.product = data;
            });
        }
    }

    addToCart(): void {
        if (this.product) {
            for (let i = 0; i < this.quantity; i++) {
                this.cartService.addToCart(this.product);
            }
            console.log(
                `${this.quantity}x ${this.product.name} ajouté(s) au panier.`
            );

            this.showToast = true;

            setTimeout(() => {
                this.showToast = false;
            }, 3000);
        }
    }

    increaseQuantity(): void {
        this.quantity++;
    }

    decreaseQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}
