import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminService } from "../../services/admin.service";

@Component({
    selector: "app-admin-dashboard",
    standalone: true,
    templateUrl: "./admin-dashboard.component.html",
    styleUrls: ["./admin-dashboard.component.css"],
    imports: [CommonModule],
})
export class AdminDashboardComponent implements OnInit {
    stats: any = null;

    constructor(private adminService: AdminService) {}

    ngOnInit(): void {
        this.loadStats();
    }

    loadStats(): void {
        this.adminService.getDashboardStats().subscribe((data) => {
            this.stats = data;
        });
    }
}
