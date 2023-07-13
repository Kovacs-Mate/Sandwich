import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FireAuthService } from "src/app/core/services/fire-auth.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
    registrationForm: FormGroup;
    registrationSuccessful: boolean = false;

    constructor(
        private authService: FireAuthService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(6)]],
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

    onSubmit() {
        if (this.registrationForm.invalid) {
            this.registrationSuccessful = false;
            return;
        } else {
            this.authService.register(this.registrationForm.value);
            this.registrationSuccessful = true;
        }
    }
}
