import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Sandwich } from "src/app/shared/interfaces/sandwich";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
    orderList: Array<Sandwich>;

    constructor() {}

    ngOnInit(): void {
        this.orderList = JSON.parse(localStorage.getItem("orderList") || "[]");
    }

    totalPrice() {
        let price = 0;

        for (let item of this.orderList) {
            price += item.price * item.qty;
        }
        return price;
    }

    updateOrderList(order: Sandwich) {
        let indexToUpdate = this.orderList.findIndex(
            (item: Sandwich) => item.id === order.id
        );
        this.orderList[indexToUpdate] = order;

        localStorage.setItem("orderList", JSON.stringify(this.orderList));
    }

    deleteOrder(order: Sandwich) {
        let indexToUpdate = this.orderList.findIndex(
            (item: Sandwich) => item.id === order.id
        );

        this.orderList.splice(indexToUpdate, 1);
        localStorage.setItem("orderList", JSON.stringify(this.orderList));
    }
}
