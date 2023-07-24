import { Component, OnInit } from "@angular/core";
import { map } from "rxjs";
import { BaseService } from "src/app/core/services/base.service";
import { Orders } from "src/app/shared/interfaces/orders";
import { Sandwich } from "src/app/shared/interfaces/sandwich";

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
    userOrders: Array<Orders> = [];

    constructor(private bs: BaseService) {}

    ngOnInit(): void {
        this.getUserOrders();
    }

    getUserOrders() {
        this.bs
            .getUserOrders()
            .snapshotChanges()
            .pipe(map(changes => changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))))
            .subscribe(items => {
                this.userOrders = items;

                console.log("orders: ", this.userOrders);
            });
    }

    totalPrice(item: Array<Sandwich>) {
        let totalPrice: number = 0;

        for (let i = 0; i < item.length; i++) {
            const price = item[i].price * item[i].qty;

            totalPrice += price;
        }
        return totalPrice;
    }
}
