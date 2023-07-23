import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BaseService } from "src/app/core/services/base.service";
import { Sandwich } from "src/app/shared/interfaces/sandwich";
import { User } from "src/app/shared/interfaces/user";

@Component({
    selector: "app-check-out",
    templateUrl: "./check-out.component.html",
    styleUrls: ["./check-out.component.css"]
})
export class CheckOutComponent {
    @Input() orderList: Array<Sandwich>;
    @Input() user: User;
    @Input() totalPrice: number;
    @Input() checkOutModule: boolean;
    @Input() thankYou: boolean;
    @Output() checkOutModuleChange = new EventEmitter<boolean>();
    @Output() thankYouChange = new EventEmitter<boolean>();
    @Output() orderListChange = new EventEmitter<Array<Sandwich>>();

    constructor(private bs: BaseService) {}

    checkOut() {
        this.bs.addOrder();
        this.orderList.splice(0, this.orderList.length);
        this.orderListChange.emit(this.orderList);
        localStorage.removeItem("orderList");
        this.checkOutModuleChange.emit((this.checkOutModule = false));
        this.thankYouChange.emit((this.thankYou = true));
    }

    back() {
        this.checkOutModuleChange.emit((this.checkOutModule = false));
    }
}
