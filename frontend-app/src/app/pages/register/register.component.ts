import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-register",
    standalone: true,
    templateUrl: "./register.component.html",
    imports: [CommonModule, RouterModule, ReactiveFormsModule], // Ajout des modules nécessaires
})
export class RegisterComponent {
    registerForm: FormGroup;
    errorMessage: string = "";

    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    constructor() {
        this.registerForm = this.fb.group(
            {
                name: ["", Validators.required],
                email: ["", [Validators.required, Validators.email]],
                password: ["", [Validators.required, Validators.minLength(6)]],
                confirmPassword: ["", Validators.required],
            },
            { validators: this.passwordsMatchValidator }
        );
    }

    // Vérifie si les mots de passe sont identiques
    private passwordsMatchValidator(control: AbstractControl) {
        const password = control.get("password")?.value;
        const confirmPassword = control.get("confirmPassword")?.value;
        return password === confirmPassword
            ? null
            : { passwordsMismatch: true };
    }

    onSubmit() {
        if (this.registerForm.invalid) return;

        const { name, email, password } = this.registerForm.value;
        this.authService.register(name, email, password).subscribe({
            next: () => {
                console.log("Inscription réussie");
                this.router.navigate(["/login"], {
                    queryParams: { registered: "true" },
                }); // Ajout du paramètre
            },
            error: () => {
                this.errorMessage =
                    "Une erreur est survenue, essayez un autre email";
            },
        });
    }

    // Accès sécurisé aux champs pour éviter l’erreur d’index signature
    get name() {
        return this.registerForm.get("name");
    }
    get email() {
        return this.registerForm.get("email");
    }
    get password() {
        return this.registerForm.get("password");
    }
    get confirmPassword() {
        return this.registerForm.get("confirmPassword");
    }
}
