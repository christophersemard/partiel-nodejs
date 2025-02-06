import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { AuthProviderService } from "../../services/auth-provider.service";

@Component({
    selector: "app-login",
    standalone: true,
    templateUrl: "./login.component.html",
    imports: [CommonModule, RouterModule, ReactiveFormsModule], // Ajout des modules nécessaires
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string = "";
    successMessage: string = "";

    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private authProvider = inject(AuthProviderService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    constructor() {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(6)]],
        });

        // Vérifie si l'utilisateur vient de s'inscrire
        this.route.queryParams.subscribe((params) => {
            if (params["registered"] === "true") {
                this.successMessage =
                    "Inscription réussie ! Vous pouvez maintenant vous connecter.";
            }
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) return;

        const { email, password } = this.loginForm.value;
        this.authService.login(email, password).subscribe({
            next: () => {
                console.log("Connexion réussie");
                const userRole = this.authProvider.userRole();

                console.log("userRole");
                console.log(userRole);
                if (userRole === "admin") {
                    this.router.navigate(["/admin/products"]);
                } else {
                    this.router.navigate(["/products"]);
                }
            },
            error: () => {
                this.errorMessage = "Email ou mot de passe incorrect";
            },
        });
    }
}
