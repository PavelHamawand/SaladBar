import inventory from "./inventory.mjs";
import { v4 as uuidv4 } from "uuid";
export default class Salad {
   
  constructor(salad) {
  if (typeof salad === "string" ){
  this.ingridients = JSON.parse(salad).ingridients;
  
  }else if (salad instanceof Salad){
      this.ingridients = salad.ingridients;
  }else{ 
      this.ingridients = {};
  }
  
  const uuid = uuidv4(); // use this in the constructor
  this.uuid = uuid;
  
  }
  add(name, properties) {
    this.ingridients[name] = properties;
    return this;
  }
   
  remove(name) {
    delete this.ingridients[name];
    return this; 
  }
  
  static parse = function (json) {
     const parsedJSON = JSON.parse(json);
    if(Array.isArray(parsedJSON)){
      return parsedJSON.map(cur => new Salad(cur));
    }
    return new Salad(parsedJSON);
  }
  getPrice() {
    return Object.keys(this.ingridients) 
      .reduce((totalPrice, ingredientName) => {
        return totalPrice + inventory[ingredientName].price; 
      }, 0);
  }
  
  }

  