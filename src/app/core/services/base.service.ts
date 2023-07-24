import { Injectable, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { Observable, map } from "rxjs";
import { Orders } from "src/app/shared/interfaces/orders";
import { Sandwich } from "src/app/shared/interfaces/sandwich";
import { User } from "src/app/shared/interfaces/user";

@Injectable({
    providedIn: "root"
})
export class BaseService {
    usersRef: AngularFireList<any>;
    sandwichesRef: AngularFireList<any>;
    cartListRef: AngularFireList<any>;
    userOrderListRef: AngularFireList<any>;

    constructor(private afDB: AngularFireDatabase) {
        this.usersRef = this.afDB.list("/users");
    }

    //USERS

    getAllUser() {
        return this.usersRef;
    }

    getUser(key: string): Observable<any> {
        return this.afDB
            .object(`users/${key}`)
            .valueChanges()
            .pipe(
                map(data => {
                    return data;
                })
            );
    }

    updateUser(key: string, body: User) {
        return this.usersRef.update(key, body);
    }

    deleteUser(key: string) {
        return this.usersRef.remove(key);
    }

    //SANDWICHES

    getAllSandwich() {
        const UID = JSON.parse(localStorage.getItem("user")!)?.uid;
        this.sandwichesRef = this.afDB.list(`/users/${UID}/sandwiches`);
        return this.sandwichesRef;
    }

    addSandwich(name: string, body: Sandwich) {
        const UID = JSON.parse(localStorage.getItem("user")!)?.uid;
        this.afDB.object(`/users/${UID}/sandwiches/${name}`).set({
            price: body.price,
            bread: body.bread,
            meat: body.meat,
            cheese: body.cheese,
            vegetables: body.vegetables,
            sauce: body.sauce,
            id: new Date().getTime()
        });
    }

    updateSandwich(name: string, body: Sandwich) {
        return this.sandwichesRef.update(name, body);
    }

    deleteSandwich(name: string) {
        return this.sandwichesRef.remove(name);
    }

    // CART  <- NOT IN USE

    updateCart() {
        const UID = JSON.parse(localStorage.getItem("user")!)?.uid;
        const cart: Array<Sandwich> = JSON.parse(localStorage.getItem("orderList") || "[]");

        if (cart.length !== 0) {
            for (let i = 0; i < cart.length; i++) {
                const element: Sandwich = cart[i];
                this.afDB.object(`/users/${UID}/cart/${element.number}`).set({
                    id: element.id,
                    number: element.number,
                    name: element.name,
                    price: element.price,
                    qty: element.qty,
                    bread: element.bread,
                    meat: element.meat,
                    cheese: element.cheese,
                    vegetables: element.vegetables,
                    sauce: element.sauce
                });
            }
        } else return;
    }

    deleteCart() {
        const UID = JSON.parse(localStorage.getItem("user")!)?.uid;
        this.afDB.object(`/users/${UID}/cart/`).remove();
    }

    getCart() {
        let cart: Array<Sandwich> = [];

        this.getCartList()
            .snapshotChanges()
            .pipe(map(ch => ch.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
            .subscribe(cartList => {
                if (cartList) {
                    cart = cartList;
                } else {
                    cart = [];
                    console.log("ez bassza szét");
                }

                if (cart.length > 0) {
                    localStorage.setItem("orderList", JSON.stringify(cart));
                    this.deleteCart();
                } else {
                    console.log("vagy ez");
                    localStorage.setItem("orderList", JSON.stringify([]));
                }
            });
    }

    getCartList() {
        const UID = JSON.parse(localStorage.getItem("user")!)?.uid;
        this.cartListRef = this.afDB.list(`/users/${UID}/cart`);
        return this.cartListRef;
    }

    // ORDERS

    addOrder() {
        const ID = new Date().getTime();
        const UID = JSON.parse(localStorage.getItem("user")!)?.uid;
        const orderList: Array<Sandwich> = JSON.parse(localStorage.getItem("orderList") || "[]");

        const orderData: Orders = {
            status: "pending",
            orders: []
        };

        for (let i = 0; i < orderList.length; i++) {
            const item = orderList[i];
            const itemData: Sandwich = {
                bread: item.bread,
                meat: item.meat,
                cheese: item.cheese,
                vegetables: item.vegetables,
                sauce: item.sauce,
                qty: item.qty,
                price: item.price,
                name: item.name,
                id: item.id,
                number: item.number
            };

            orderData.orders.push(itemData);
        }

        this.afDB.object(`/orders/${UID}/${ID}/`).set(orderData);
    }

    getUserOrders() {
        const UID = JSON.parse(localStorage.getItem("user")!)?.uid;
        this.userOrderListRef = this.afDB.list(`orders/${UID}`);
        return this.userOrderListRef;
    }
}
