import { v4 as uuidv4 } from "uuid";
import inventory from "./inventory.mjs";

export default class Salad {
  constructor(salad) {
    if (typeof salad === "string") {
      const parsedSalad = JSON.parse(salad);
      this.ingridients = parsedSalad.ingridients || {};
      this.uuid = parsedSalad.uuid || uuidv4(); // Restore or generate a new UUID
    } else if (salad instanceof Salad) {
      this.ingridients = salad.ingridients || {};
      this.uuid = salad.uuid || uuidv4(); // Restore or generate a new UUID
    } else {
      this.ingridients = {};
      this.uuid = uuidv4(); // Always generate a UUID for new instances
    }
  }

  add(name, properties) {
    this.ingridients[name] = properties;
    return this;
  }

  remove(name) {
    delete this.ingridients[name];
    return this;
  }

  static parse(cartData) {
    const cart = JSON.parse(cartData);
    return cart.map(item => new Salad(item));
  }

  getPrice() {
    return Object.keys(this.ingridients).reduce((totalPrice, ingredientName) => {
      return totalPrice + inventory[ingredientName].price;
    }, 0);
  }
}