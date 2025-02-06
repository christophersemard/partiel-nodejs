import { Injectable, signal, computed } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthProviderService {
    private tokenKey = "token";

    // Signal pour stocker le token utilisateur
    private userToken = signal<string | null>(
        localStorage.getItem(this.tokenKey)
    );

    // Signal calculé pour vérifier si l'utilisateur est connecté
    isAuthenticated = computed(() => {
        // Est authentifié si le token est présent et que le role est défini sur CLIENT mais pas sur ADMIN
        return this.userToken() !== null && this.userRole() === "CLIENT";
    });

    // Signal calculé pour récupérer le rôle de l'utilisateur
    userRole = computed(() => this.decodeUserRole());

    constructor() {}

    login(token: string): void {
        localStorage.setItem(this.tokenKey, token);
        this.userToken.set(token);
    }

    getToken(): string | null {
        return this.userToken();
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.userToken.set(null);
    }

    private decodeUserRole(): string | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // Décodage du JWT
            console.log("Payload", payload);
            return payload.role || null;
        } catch (error) {
            console.error("Erreur de décodage du JWT", error);
            return null;
        }
    }

    isAdmin(): boolean {
        return this.userRole() === "ADMIN";
    }
}
