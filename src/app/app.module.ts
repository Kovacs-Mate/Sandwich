import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import { MatIconModule } from "@angular/material/icon";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { UserSettingsComponent } from "./auth/user-settings/user-settings.component";
import { CartComponent } from "./components/cart/cart.component";
import { HomeComponent } from "./components/home/home.component";
import { SandwichComponent } from "./components/sandwich/sandwich.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Environment } from "./core/environments/environment";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterComponent } from './components/footer/footer.component';
import { SandwichDetailsComponent } from './components/sandwich/sandwich-details/sandwich-details.component';
import { OrderListComponent } from './components/cart/order-list/order-list.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
        UserSettingsComponent,
        CartComponent,
        HomeComponent,
        SandwichComponent,
        NavbarComponent,
        VerifyEmailComponent,
        FooterComponent,
        SandwichDetailsComponent,
        OrderListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(Environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        BrowserAnimationsModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
