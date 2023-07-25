import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { FireAuthService } from "../core/services/fire-auth.service";
@Injectable({
    providedIn: "root"
})
export class AuthGuard {
    isLoggedIn: boolean = false;

    constructor(public authService: FireAuthService, public router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
        this.authService.loggedIn.subscribe(data => (this.isLoggedIn = data));
        if (this.isLoggedIn !== true) {
            this.router.navigate(["/login"]);
        }
        return true;
    }
}
