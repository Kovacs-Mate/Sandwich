import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FireAuthService } from "src/app/core/services/fire-auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent {
    email: string = "";
    password: string = "";
    loginError: boolean;

    constructor(private authService: FireAuthService) {
        this.authService.loginError.subscribe(
            value => (this.loginError = value)
        );
    }

    login() {
        this.authService.login(this.email, this.password);
    }
}
