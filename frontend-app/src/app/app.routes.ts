import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProductsComponent } from "./pages/products/products.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { CartComponent } from "./pages/cart/cart.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { OrderDetailComponent } from "./pages/order-detail/order-detail.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import { AdminProductsComponent } from "./pages/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./pages/admin-orders/admin-orders.component";

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
            },
            {
                path: "products/:id",
                component: ProductDetailComponent,
            },
            {
                path: "cart",
                component: CartComponent,
            },
            {
                path: "orders",
                component: OrdersComponent,
                canActivate: [AuthGuard],
            }, // Protégé
            {
                path: "orders/:id",
                component: OrderDetailComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "admin",
                component: AdminDashboardComponent,
                canActivate: [AdminGuard],
            }, // Protégé Admin
            {
                path: "admin/products",
                component: AdminProductsComponent,
                canActivate: [AdminGuard],
            }, // Protégé Admin
            {
                path: "admin/orders",
                component: AdminOrdersComponent,
                canActivate: [AdminGuard],
            }, // Protégé Admin
        ],
    },
];
