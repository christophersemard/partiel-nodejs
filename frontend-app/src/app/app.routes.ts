import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProductsComponent } from "./pages/products/products.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

export const routes: Routes = [
    {
        path: "",
        children: [
            { path: "", component: HomeComponent },
            { path: "products", component: ProductsComponent },
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent },
        ],
    },
];
