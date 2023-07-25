import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { SandwichComponent } from "./components/sandwich/sandwich.component";
import { CartComponent } from "./components/cart/cart.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { UserSettingsComponent } from "./auth/user-settings/user-settings.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { AuthGuard } from "./guards/auth-guard.guard";

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "sandwich", component: SandwichComponent, canActivate: [AuthGuard] },
    { path: "orders", component: OrdersComponent, canActivate: [AuthGuard] },
    { path: "cart", component: CartComponent, canActivate: [AuthGuard] },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "resetPassword", component: ResetPasswordComponent },
    { path: "userSettings", component: UserSettingsComponent, canActivate: [AuthGuard] },
    { path: "verifyEmail", component: VerifyEmailComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
