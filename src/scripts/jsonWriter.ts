import fs from "fs"
import { OrderFactory } from "./orderGenerator"

export const generateJsonFile = () => {
    const orderFactory = new OrderFactory();

    const orders = [];

    for (let i = 0; i < 10000; i++) {
        orders.push(orderFactory.createRandomOrder());
    }

    fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));
}

generateJsonFile()