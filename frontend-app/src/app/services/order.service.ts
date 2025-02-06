import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class OrderService {
    private apiUrl = "http://localhost:3000/api/orders";

    constructor(private http: HttpClient) {}

    // Récupérer les commandes de l'utilisateur connecté
    getUserOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/me`);
    }

    // Récupérer les détails d'une commande spécifique
    getOrderById(orderId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${orderId}`);
    }

    // Créer une nouvelle commande
    createOrder(orderData: any): Observable<any> {
        console.log("orderData");
        console.log(orderData.items);
        return this.http.post<any>(this.apiUrl, orderData);
    }

    cancelOrder(orderId: string): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${orderId}/cancel`, {
            status: "CANCELLED",
        });
    }

    shipOrder(orderId: string): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${orderId}/ship`, {
            status: "SHIPPED",
        });
    }

    getAllOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/`);
    }

    updateOrderStatus(orderId: string, status: string): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${orderId}`, { status });
    }
}
