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

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "sandwich", component: SandwichComponent },
    { path: "cart", component: CartComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "resetPassword", component: ResetPasswordComponent },
    { path: "userSettings", component: UserSettingsComponent },
    { path: "verifyEmail", component: VerifyEmailComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
