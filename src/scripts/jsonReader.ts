import fs from "fs";
import type { Order } from "./orderGenerator";

export const readJsonFile = (): Order[] => {
    const rawOrders = fs.readFileSync("orders.json", "utf-8");
    return JSON.parse(rawOrders) as Order[];
}