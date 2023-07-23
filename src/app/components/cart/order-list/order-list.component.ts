import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Sandwich } from "src/app/shared/interfaces/sandwich";

@Component({
    selector: "app-order-list",
    templateUrl: "./order-list.component.html",
    styleUrls: ["./order-list.component.css"]
})
export class OrderListComponent implements OnInit {
    @Input() item: Sandwich;
    @Output() modifyItem: EventEmitter<Sandwich> = new EventEmitter<Sandwich>();
    @Output() deleteItem: EventEmitter<Sandwich> = new EventEmitter<Sandwich>();

    deleteIcon: boolean = true;

    ngOnInit(): void {
        if (this.item.qty > 1) this.deleteIcon = false;
    }

    currentPrice() {
        let currentPrice = 0;
        let price = this.item.price;
        let qty = this.item.qty;

        currentPrice = price *= qty;

        return currentPrice;
    }

    addQty() {
        let qty = this.item.qty;
        const maxQty = 20;
        const i = 1;

        if (qty === maxQty) {
            return;
        } else {
            this.deleteIcon = false;
            this.item.qty = qty += i;
            this.modifyItem.emit(this.item);
        }
    }

    removeQty() {
        let qty = this.item.qty;
        const minQty = 1;
        const i = 1;

        if (qty < 2) {
            this.deleteIcon = true;
        } else if (qty === minQty) {
            return;
        } else {
            this.item.qty = qty -= i;
            this.modifyItem.emit(this.item);
        }
    }

    deleteOrder() {
        this.deleteItem.emit(this.item);
    }
}
