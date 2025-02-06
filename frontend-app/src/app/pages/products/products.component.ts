import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductService } from "../../services/product.service";
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
    selector: "app-products",
    standalone: true, // Ajout de standalone
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"],
    imports: [CommonModule, ProductCardComponent], // Ajout de CommonModule
})
export class ProductsComponent implements OnInit {
    products: any[] = [];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.productService.getProducts().subscribe((data: any) => {
            this.products = data;
        });
    }
}
