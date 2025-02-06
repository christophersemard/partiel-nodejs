import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-product-form",
    standalone: true,
    templateUrl: "./product-form.component.html",
    styleUrls: ["./product-form.component.css"],
    imports: [CommonModule, FormsModule],
})
export class ProductFormComponent {
    @Input() product: any = {
        name: "",
        price: 0,
        stock: 0,
        imageUrl: "",
        description: "",
    };
    @Output() save = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();

    onSubmit(): void {
        this.save.emit(this.product);
    }
}
