import { Component } from "@angular/core";
import { FireAuthService } from "src/app/core/services/fire-auth.service";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
    public isCollapsed: boolean = true;
    loggedIn: boolean;

    constructor(private authService: FireAuthService) {
        this.authService.loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
        });
    }

    logout() {
        this.authService.logout();
    }
}
