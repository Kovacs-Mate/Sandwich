import { Component } from "@angular/core";
import { FireAuthService } from "src/app/core/services/fire-auth.service";

@Component({
    selector: "app-verify-email",
    templateUrl: "./verify-email.component.html",
    styleUrls: ["./verify-email.component.css"]
})
export class VerifyEmailComponent {
    constructor(private authService: FireAuthService) {}

    sendVerificationEmail() {
        this.authService.sendVerificationEmail();
    }
}
