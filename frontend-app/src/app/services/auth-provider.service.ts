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

    // Computed signal pour vérifier si l'utilisateur est connecté
    isAuthenticated = computed(() => !!this.userToken());

    constructor() {}

    // Connexion : Stocker le token et décoder le rôle
    login(token: string) {
        localStorage.setItem(this.tokenKey, token);
        this.userToken.set(token);
    }

    // Récupérer le token JWT
    getToken(): string | null {
        return this.userToken();
    }

    // Déconnexion
    logout() {
        localStorage.removeItem(this.tokenKey);
        this.userToken.set(null);
    }

    // Décoder le JWT pour récupérer le rôle utilisateur
    getUserRole(): string | null {
        const token = this.getToken();
        console.log("token");
        console.log(token);
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // Décodage du JWT
            console.log("payload");
            console.log(payload);
            return payload.role || null; // Récupérer le rôle
        } catch (error) {
            console.error("Erreur de décodage du JWT", error);
            return null;
        }
    }

    // Vérifier si l'utilisateur est admin
    isAdmin(): boolean {
        return this.getUserRole() === "admin";
    }
}
