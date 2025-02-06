import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProductsComponent } from "./pages/products/products.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { CartComponent } from "./pages/cart/cart.component";

export const routes: Routes = [
    {
        path: "",
        children: [
            { path: "", component: HomeComponent },
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent },
            {
                path: "products",
                component: ProductsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "products/:id",
                component: ProductDetailComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "cart",
                component: CartComponent,
                canActivate: [AuthGuard],
            }, // Protégé
            // {
            //     path: "orders",
            //     component: OrdersComponent,
            //     canActivate: [AuthGuard],
            // }, // Protégé
            // {
            //     path: "admin/products",
            //     component: AdminProductsComponent,
            //     canActivate: [AdminGuard],
            // }, // Protégé Admin
            // {
            //     path: "admin/orders",
            //     component: AdminOrdersComponent,
            //     canActivate: [AdminGuard],
            // }, // Protégé Admin
        ],
    },
];
