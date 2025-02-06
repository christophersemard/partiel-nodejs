import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderService } from "../../services/order.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-admin-orders",
    standalone: true,
    templateUrl: "./admin-orders.component.html",
    styleUrls: ["./admin-orders.component.css"],
    imports: [CommonModule, FormsModule],
})
export class AdminOrdersComponent implements OnInit {
    orders: any[] = [];
    filterStatus: string = "";

    // Gestion des modales
    selectedOrder: any | null = null;
    actionType: string = "";
    showModal: boolean = false;

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        this.loadOrders();
    }

    loadOrders(): void {
        this.orderService.getAllOrders().subscribe((data) => {
            // Trier par date en affichant les createdAt les plus récents en premier
            let sortedData = data.sort((a, b) => {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            });
            this.orders = data;
        });
    }

    openModal(order: any, action: "ship" | "cancel"): void {
        if (action === "ship" && order.status !== "PENDING") {
            alert("Only orders with status PENDING can be shipped.");
            return;
        }
        if (action === "cancel" && order.status !== "PENDING") {
            alert("Only orders with status PENDING can be cancelled.");
            return;
        }
        this.selectedOrder = order;
        this.actionType = action;
        this.showModal = true;
    }

    confirmAction(): void {
        if (this.selectedOrder) {
            if (this.actionType === "ship") {
                this.orderService
                    .shipOrder(this.selectedOrder.id)
                    .subscribe(() => {
                        this.loadOrders();
                    });
            } else if (this.actionType === "cancel") {
                this.orderService
                    .cancelOrder(this.selectedOrder.id)
                    .subscribe(() => {
                        this.loadOrders();
                    });
            }
        }
        this.closeModal();
    }

    closeModal(): void {
        this.showModal = false;
        this.selectedOrder = null;
        this.actionType = "";
    }

    getStatusBadge(status: string): string {
        switch (status) {
            case "PENDING":
                return "badge bg-warning text-dark";
            case "SHIPPED":
                return "badge bg-success";
            case "CANCELLED":
                return "badge bg-danger";
            default:
                return "badge bg-secondary";
        }
    }
}
