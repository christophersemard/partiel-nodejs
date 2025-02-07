import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AdminService {
    private apiUrl = "http://localhost:3000/api/admin";

    constructor(private http: HttpClient) {}

    getDashboardStats(): Observable<any> {
        let response = this.http.get<any>(`${this.apiUrl}/dashboard`);
        console.log(response);
        return response;
    }

    getOrderStats(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/orders-per-month`);
    }

    getProductSales(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/product-sales`);
    }
}
