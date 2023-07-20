import { Component, Input, OnInit } from "@angular/core";
import { BaseService } from "src/app/core/services/base.service";
import { Sandwich } from "src/app/shared/interfaces/sandwich";

@Component({
    selector: "app-sandwich-details",
    templateUrl: "./sandwich-details.component.html",
    styleUrls: ["./sandwich-details.component.css"]
})
export class SandwichDetailsComponent implements OnInit {
    @Input() sandwich: Sandwich;

    collapseInfo: boolean = true;
    orderInfo: boolean = true;

    titlePrice: number = 0;
    sandwichPrice: number = 0;
    quantity: number = 1;

    orders: Array<Sandwich> = [];

    constructor(private bs: BaseService) {}

    ngOnInit(): void {
        this.sandwich.qty = this.quantity;
        this.sandwichPrice = this.sandwich.price;
        this.titlePrice = this.sandwich.price;
    }

    deleteSandwich(name: string) {
        this.bs.deleteSandwich(name);
    }

    addQty() {
        const maxQty = 20;
        if (this.quantity === maxQty) {
            return;
        } else {
            const price = this.sandwich.price;
            const i = 1;
            this.quantity += i;
            this.titlePrice = price * this.quantity;
            this.sandwich.qty = this.quantity;
        }
    }

    removeQty() {
        const minQty = 1;
        if (this.quantity === minQty) {
            return;
        } else {
            const price = this.sandwich.price;
            const i = 1;
            this.quantity -= i;
            this.titlePrice = price * this.quantity;
            this.sandwich.qty = this.quantity;
        }
    }

    addOrder() {
        const resetQty = 1;
        this.orderInfo = true;
        let currentList = JSON.parse(
            localStorage.getItem("orderList") || "[]"
        ) as Sandwich[];

        if (!Array.isArray(currentList)) {
            currentList = [];
        }

        currentList.push(this.sandwich);
        localStorage.setItem("orderList", JSON.stringify(currentList));

        this.quantity = resetQty;
        this.titlePrice = this.sandwich.price;
    }
}
