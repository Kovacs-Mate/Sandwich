import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BaseService } from "src/app/core/services/base.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { map } from "rxjs";
import { IngredientsMap } from "src/app/shared/interfaces/ingredientsMap";

@Component({
    selector: "app-sandwich",
    templateUrl: "./sandwich.component.html",
    styleUrls: ["./sandwich.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class SandwichComponent implements OnInit {
    createModule: boolean = false;

    userSandwiches: any = [];
    sandwichForm: FormGroup;
    sandwichFormError: boolean = false;

    ingredients = IngredientsMap;
    sandwichPrice: number = 0;

    constructor(private bs: BaseService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.bs
            .getAllSandwich()
            .snapshotChanges()
            .pipe(map(ch => ch.map(c => ({ name: c.payload.key, ...c.payload.val() }))))
            .subscribe(sandwiches => (this.userSandwiches = sandwiches));

        this.sandwichForm = this.formBuilder.group({
            name: ["", [Validators.required, Validators.maxLength(16)]],
            price: [""],
            bread: ["", Validators.required],
            meat: [""],
            cheese: [""],
            vegetables: [""],
            sauce: [""]
        });
    }

    createSandwich() {
        if (this.sandwichForm.invalid) {
            this.sandwichFormError = true;
            return;
        } else {
            this.sandwichForm.value.price = this.getPrice();
            this.bs.addSandwich(this.sandwichForm.value.name, this.sandwichForm.value);
            this.sandwichForm.patchValue({ name: "" });
            this.sandwichFormError = false;
            this.createModule = false;
        }
    }

    getPrice() {
        let price: number = 0;
        const keys = Object.keys(this.sandwichForm.value);

        keys.forEach(key => {
            let value = this.sandwichForm.value[key];
            let ingredients = this.ingredients.get(key);
            let ingredient = ingredients?.find(i => i.name === value);
            price += ingredient?.price ? ingredient.price : 0;
        });
        return price;
    }
}
