import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    private apiUrl = "http://localhost:3000/api/products";

    constructor(private http: HttpClient) {}

    getProducts(): Observable<any[]> {
        let response = this.http.get<any[]>(this.apiUrl);
        console.log(response);
        return response;
    }

    getProductById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    getAllProducts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/`);
    }

    createProduct(productData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/`, productData);
    }

    updateProduct(productId: string, productData: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${productId}`, productData);
    }

    deleteProduct(productId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${productId}`);
    }

    getDeletedProducts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/deleted`);
    }

    restoreProduct(productId: string): Observable<any> {
        return this.http.patch(`${this.apiUrl}/restore/${productId}`, {});
    }
}
