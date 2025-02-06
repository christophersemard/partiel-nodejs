import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductService } from "../../services/product.service";

@Component({
    selector: "app-admin-deleted-products",
    standalone: true,
    templateUrl: "./admin-deleted-products.component.html",
    styleUrls: ["./admin-deleted-products.component.css"],
    imports: [CommonModule],
})
export class AdminDeletedProductsComponent implements OnInit {
    deletedProducts: any[] = [];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.loadDeletedProducts();
    }

    loadDeletedProducts(): void {
        this.productService.getDeletedProducts().subscribe((data) => {
            this.deletedProducts = data;
        });
    }
    restoreProduct(productId: string): void {
        this.productService.restoreProduct(productId).subscribe(() => {
            this.loadDeletedProducts(); // Recharger la liste après restauration
        });
    }
}
