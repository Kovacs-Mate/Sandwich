import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { BaseService } from "src/app/core/services/base.service";
import { FireAuthService } from "src/app/core/services/fire-auth.service";
import { User } from "src/app/shared/interfaces/user";

@Component({
    selector: "app-user-settings",
    templateUrl: "./user-settings.component.html",
    styleUrls: ["./user-settings.component.css"]
})
export class UserSettingsComponent implements OnInit {
    userUID: any;
    user: User = {
        key: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: {
            zipCode: "",
            city: "",
            street: "",
            houseNumber: ""
        }
    };

    userForm: FormGroup;
    userUpdateSuccessful: boolean = false;

    deleteAccTemplate: boolean = false;
    deleteApproved: string = "DELETE";
    deleteConfirmed: string = "";
    deleteConfirmedMessage: boolean = false;
    formError: boolean = false;

    constructor(
        private bs: BaseService,
        private afAuth: FireAuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.userUID = JSON.parse(localStorage.getItem("user")!)?.uid;

        this.bs.getUser(this.userUID).subscribe(data => {
            this.user = data;

            console.log("user: ", this.user);

            this.userForm = this.formBuilder.group({
                firstName: [this.user.firstName, Validators.required],
                lastName: [this.user.lastName, Validators.required],
                phone: [this.user.phone, Validators.required],
                address: this.formBuilder.group({
                    zipCode: [
                        this.user.address.zipCode,
                        [Validators.required, Validators.pattern("^[0-9]*$")]
                    ],
                    city: [this.user.address.city, Validators.required],
                    street: [this.user.address.street, Validators.required],
                    houseNumber: [
                        this.user.address.houseNumber,
                        Validators.required
                    ]
                })
            });
        });
    }

    initForm(): void {
        this.userForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            phone: ["", Validators.required],
            address: this.formBuilder.group({
                zipCode: [
                    "",
                    [Validators.required, Validators.pattern("^[0-9]*$")]
                ],
                city: ["", Validators.required],
                street: ["", Validators.required],
                houseNumber: ["", Validators.required]
            })
        });
    }

    onSubmit(): void {
        if (this.userForm.invalid) {
            this.userUpdateSuccessful = false;
            this.formError = true;
            return;
        } else {
            this.bs
                .updateUser(this.userUID, this.userForm.value)
                .then(() => {
                    this.userUpdateSuccessful = true;
                    this.formError = false;
                })
                .catch(e => console.log(e.message));
        }
    }

    deleteAccount() {
        if (this.deleteConfirmed === this.deleteApproved) {
            this.deleteConfirmedMessage = false;
            this.bs.deleteUser(this.userUID);
            this.afAuth.deleteUser();
            this.afAuth.logout();
            this.router.navigate(["/home"]);
        } else {
            this.deleteConfirmedMessage = true;
        }
    }
}
