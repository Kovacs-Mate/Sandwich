import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FireAuthService } from "src/app/core/services/fire-auth.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent {
    loggedIn: boolean;

    constructor(private authService: FireAuthService, private router: Router) {
        this.authService.loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
        });
    }

    letsGo() {
        if (this.loggedIn) {
            this.router.navigate(["/sandwich"]);
        } else this.router.navigate(["/login"]);
    }
}
