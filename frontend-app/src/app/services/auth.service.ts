import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthProviderService } from "./auth-provider.service";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private apiUrl = "http://localhost:3000/auth"; // URL du backend

    constructor(
        private http: HttpClient,
        private authProvider: AuthProviderService
    ) {}

    login(email: string, password: string): Observable<any> {
        return new Observable((observer) => {
            this.http
                .post<{ access_token: string }>(`${this.apiUrl}/login`, {
                    email,
                    password,
                })
                .subscribe({
                    next: (response) => {
                        this.authProvider.login(response.access_token); // Stocker le token et le rôle
                        observer.next(response);
                        observer.complete();
                    },
                    error: (err) => observer.error(err),
                });
        });
    }

    register(name: string, email: string, password: string): Observable<any> {
        let response = this.http.post(`${this.apiUrl}/register`, {
            name,
            email,
            password,
        });
        return response;
    }
}
