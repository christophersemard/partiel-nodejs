import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { OrderService } from "../../services/order.service";

@Component({
    selector: "app-order-detail",
    standalone: true,
    templateUrl: "./order-detail.component.html",
    styleUrls: ["./order-detail.component.css"],
    imports: [CommonModule],
})
export class OrderDetailComponent implements OnInit {
    order: any;
    total: number = 0;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService
    ) {}

    ngOnInit(): void {
        this.loadOrder();
    }

    loadOrder(): void {
        const orderId = this.route.snapshot.paramMap.get("id");
        if (orderId) {
            this.orderService.getOrderById(orderId).subscribe((data) => {
                this.order = data;
                this.calculateTotal(); // Calcul du total
            });
        }
    }

    calculateTotal(): void {
        if (this.order && this.order.items) {
            this.total = this.order.items.reduce(
                (sum: number, item: any) =>
                    sum + item.product.price * item.quantity,
                0
            );
        }
    }
}
