import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminService } from "../../services/admin.service";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
    selector: "app-admin-dashboard",
    standalone: true,
    templateUrl: "./admin-dashboard.component.html",
    styleUrls: ["./admin-dashboard.component.css"],
    imports: [CommonModule, NgxChartsModule],
})
export class AdminDashboardComponent implements OnInit {
    stats: any = null;
    orderStats: any[] = [];
    productSales: any[] = [];

    colorSchemeOrders: any = { domain: [] };
    colorSchemeSales: any = { domain: [] };
    constructor(private adminService: AdminService) {}

    ngOnInit(): void {
        this.colorSchemeOrders = {
            domain: ["#3a3a3a", "#b8a78b", "#d6c4a0"],
        };

        this.colorSchemeSales = {
            domain: ["#5c4033", "#8b5e3c", "#b8a78b", "#e4d4b0", "#d6c4a0"],
        };

        this.loadStats();
    }

    loadStats(): void {
        this.adminService.getDashboardStats().subscribe((data) => {
            this.stats = data;
        });

        this.adminService.getOrderStats().subscribe((data) => {
            this.orderStats = data.map((item) => ({
                name: `${item.month}/${item.year.toString().slice(-2)}`,
                value: item.count,
            }));
        });

        this.adminService.getProductSales().subscribe((data) => {
            this.productSales = data.map((item) => ({
                name: item.productName,
                value: item.totalSold,
            }));
        });
    }
}
