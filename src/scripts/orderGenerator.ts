import { randomUUIDv7 } from "bun";

enum Currency {
    BRL = "BRL",
    USD = "USD",
    EUR = "EUR",
}

enum Status {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export class OrderFactory {
    private readonly possibleProductIds: string[]
    private lastDate: Date;

    constructor() {

        const firstDate = new Date(1735689600000);
        this.lastDate = firstDate
        this.possibleProductIds = [];
        for (let i = 0; i < 10; i++) {
            this.possibleProductIds.push(randomUUIDv7());
        }
    }

    createOrder(amount: number, currency: Currency, status: Status): Order {
        const dateOffset = 1000 * (Math.floor(Math.random() * 60)) * (Math.floor(Math.random() * 60)) * (Math.floor(Math.random() * 10) + 1);
        const nextDate = new Date(this.lastDate.getTime() + dateOffset);
        const productId = this.possibleProductIds[Math.floor(Math.random() * 77) % this.possibleProductIds.length];
        this.lastDate = nextDate;
        return new Order(randomUUIDv7(), nextDate, amount, currency, productId, status);
    }

    createRandomOrder(): Order {
        const randomStatus = Object.values(Status)[Math.floor(Math.random() * 3)];
        const randomCurrency = Object.values(Currency)[Math.floor(Math.random() * 3)];
        const randomAmount = Math.floor(Math.random() * 1000);

        return this.createOrder(randomAmount, randomCurrency, randomStatus);
    }
}

export class Order {
    constructor(readonly id: string, readonly createdAt: Date, readonly amount: number, readonly currency: Currency, readonly product: string, readonly status: Status) {}
}