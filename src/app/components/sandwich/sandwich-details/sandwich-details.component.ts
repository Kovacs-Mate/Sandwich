import { Component, Input } from "@angular/core";
import { BaseService } from "src/app/core/services/base.service";
import { Sandwich } from "src/app/shared/interfaces/sandwich";

@Component({
    selector: "app-sandwich-details",
    templateUrl: "./sandwich-details.component.html",
    styleUrls: ["./sandwich-details.component.css"]
})
export class SandwichDetailsComponent {
    @Input() sandwich: Sandwich;

    collapseInfo: boolean = true;

    constructor(private bs: BaseService) {}

    deleteSandwich(name: string) {
        this.bs.deleteSandwich(name);
    }
}
