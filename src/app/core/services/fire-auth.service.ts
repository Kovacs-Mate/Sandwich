import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "src/app/shared/interfaces/user";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class FireAuthService {
    loggedIn: Observable<boolean>;
    loginError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    userData: any;

    constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private router: Router) {
        this.loggedIn = this.afAuth.authState.pipe(map(user => !!user));
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem("user", JSON.stringify(this.userData));
            } else {
                localStorage.removeItem("user");
            }
        });
    }

    register(user: User) {
        this.afAuth
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(userCredential => {
                const uid = userCredential.user?.uid;

                this.afDb.object(`/users/${uid}`).set({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    address: {
                        zipCode: user.address.zipCode,
                        city: user.address.city,
                        street: user.address.street,
                        houseNumber: user.address.houseNumber
                    }
                });
                userCredential.user?.sendEmailVerification();
                this.router.navigate(["/verifyEmail"]);
            })
            .catch(error => {
                console.log("Registration failed: " + error.message);
            });
    }

    login(email: string, password: string) {
        this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;

                if (user?.emailVerified) {
                    this.loginError.next(false);
                    localStorage.setItem("user", JSON.stringify(user));
                    this.router.navigate(["/sandwich"]);
                } else {
                    this.loginError.next(true);
                }
            })
            .catch(() => {
                this.loginError.next(true);
            });
    }

    logout() {
        localStorage.removeItem("orderList");
        this.afAuth.signOut();
    }

    sendVerificationEmail() {
        this.afAuth.currentUser
            .then((user: any) => user.sendEmailVerification())
            .catch(error => console.log(error.message));
    }

    resetPassword(email: string) {
        return this.afAuth.sendPasswordResetEmail(email);
    }

    deleteUser() {
        this.afAuth.currentUser
            .then((user: any) => {
                if (user) {
                    return user.delete();
                }
            })
            .catch(error => {
                console.error("User Delete Error: ", error.message, error);
            });
    }
}
