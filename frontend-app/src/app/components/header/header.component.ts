import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { AuthProviderService } from "../../services/auth-provider.service";

@Component({
    selector: "app-header",
    standalone: true,
    templateUrl: "./header.component.html",
    imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
    authProvider = inject(AuthProviderService);
    private router = inject(Router);

    logout() {
        this.authProvider.logout();
        this.router.navigate(["/login"]); // Rediriger vers la page de connexion
    }
}
