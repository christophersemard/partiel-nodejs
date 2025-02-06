import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderService } from "../../services/order.service";
import { Router } from "@angular/router";
import { ConfirmModalComponent } from "../../components/confirm-modal/confirm-modal.component";

@Component({
    selector: "app-orders",
    standalone: true,
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.css"],
    imports: [CommonModule, ConfirmModalComponent],
})
export class OrdersComponent implements OnInit {
    orders: any[] = [];
    selectedOrderId: string | null = null;
    showModal = false;

    constructor(private orderService: OrderService, private router: Router) {}

    ngOnInit(): void {
        this.loadOrders();
    }

    loadOrders(): void {
        this.orderService.getUserOrders().subscribe((data) => {
            this.orders = data;
        });
    }

    viewOrder(orderId: string): void {
        this.router.navigate([`/orders/${orderId}`]);
    }

    getStatusBadge(status: string): string {
        switch (status) {
            case "PENDING":
                return "badge bg-warning";
            case "SHIPPED":
                return "badge bg-success";
            case "CANCELLED":
                return "badge bg-danger";
            default:
                return "badge bg-secondary";
        }
    }

    confirmCancelOrder(orderId: string): void {
        this.selectedOrderId = orderId;
        this.showModal = true;
    }

    cancelOrder(): void {
        if (this.selectedOrderId) {
            this.orderService
                .cancelOrder(this.selectedOrderId)
                .subscribe(() => {
                    this.loadOrders();
                    this.showModal = false;
                    this.selectedOrderId = null;
                });
        }
    }

    closeModal(): void {
        this.showModal = false;
        this.selectedOrderId = null;
    }
}
