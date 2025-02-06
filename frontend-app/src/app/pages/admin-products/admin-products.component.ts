import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductService } from "../../services/product.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ProductFormComponent } from "../../components/product-form/product-form.component";

@Component({
    selector: "app-admin-products",
    standalone: true,
    templateUrl: "./admin-products.component.html",
    styleUrls: ["./admin-products.component.css"],
    imports: [CommonModule, PaginationComponent, ProductFormComponent],
})
export class AdminProductsComponent implements OnInit {
    products: any[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 5;
    selectedProduct: any | null = null;
    showForm: boolean = false;
    successMessage: string = "";

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.productService.getAllProducts().subscribe((data) => {
            let sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
            this.products = sortedData;
        });
    }

    openForm(product?: any): void {
        this.selectedProduct = product
            ? { ...product }
            : { name: "", price: 0, stock: 0 };
        this.showForm = true;
    }

    showSuccessMessage(message: string): void {
        this.successMessage = message;
        setTimeout(() => {
            this.successMessage = "";
        }, 3000);
    }

    saveProduct(product: any): void {
        if (product.id) {
            this.productService
                .updateProduct(product.id, product)
                .subscribe(() => {
                    this.loadProducts();
                    this.showSuccessMessage("Produit modifié avec succès !");
                });
        } else {
            this.productService.createProduct(product).subscribe(() => {
                this.loadProducts();
                this.showSuccessMessage("Produit ajouté avec succès !");
            });
        }
        this.showForm = false;
    }

    deleteProduct(productId: string): void {
        if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
            this.productService.deleteProduct(productId).subscribe(() => {
                this.loadProducts();
                this.showSuccessMessage("Produit supprimé avec succès !");
            });
        }
    }

    changePage(page: number): void {
        this.currentPage = page;
    }
}
