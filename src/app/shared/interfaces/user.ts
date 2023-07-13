export interface User {
    key: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: {
        zipCode: string;
        city: string;
        street: string;
        houseNumber: string;
    };
}
