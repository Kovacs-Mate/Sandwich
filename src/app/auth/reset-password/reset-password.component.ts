import { Component } from "@angular/core";
import { FireAuthService } from "src/app/core/services/fire-auth.service";

@Component({
    selector: "app-reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent {
    error: boolean = false;
    success: boolean = false;
    email: string = "";

    constructor(private authService: FireAuthService) {}

    resetPassword() {
        this.authService
            .resetPassword(this.email)
            .then(() => {
                this.success = true;
                this.error = false;
                this.email = "";
            })
            .catch(() => {
                this.success = false;
                this.error = true;
            });
    }
}
