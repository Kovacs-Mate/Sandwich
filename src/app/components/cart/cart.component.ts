import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BaseService } from "src/app/core/services/base.service";
import { Sandwich } from "src/app/shared/interfaces/sandwich";
import { User } from "src/app/shared/interfaces/user";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
    orderList: Array<Sandwich>;
    checkOutModuel: boolean = false;
    thankYou: boolean = false;
    user: User;

    constructor(private bs: BaseService) {}

    ngOnInit(): void {
        this.orderList = JSON.parse(localStorage.getItem("orderList") || "[]");
        const UID = JSON.parse(localStorage.getItem("user")!)?.uid;
        this.bs.getUser(UID).subscribe(data => {
            if (data) this.user = data;
        });
    }

    totalPrice() {
        let price = 0;

        for (let item of this.orderList) {
            price += item.price * item.qty;
        }
        return price;
    }

    updateOrderList(order: Sandwich) {
        let indexToUpdate = this.orderList.findIndex((item: Sandwich) => item.number === order.number);
        this.orderList[indexToUpdate] = order;

        localStorage.setItem("orderList", JSON.stringify(this.orderList));
    }

    deleteOrder(order: Sandwich) {
        let indexToUpdate = this.orderList.findIndex((item: Sandwich) => item.number === order.number);

        this.orderList.splice(indexToUpdate, 1);
        localStorage.setItem("orderList", JSON.stringify(this.orderList));
    }

    placeOrder() {
        this.checkOutModuel = true;
    }
}
