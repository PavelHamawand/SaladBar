import { v4 as uuidv4 } from 'uuid';
import inventory from "./inventory.mjs";

export default class Salad {

    static instanceCounter = 0;
  
    constructor(arg) {
      this.id = 'salad_' + Salad.instanceCounter++;
      this.uuid = uuidv4();
  
      if (arg instanceof Salad) {
        this.ingredients = { ...arg.ingredients };
      } else {
        this.ingredients = {};
      }
    }
    add(name, properties) {
      this.ingredients[name] = properties; //Adds the name and properties to this ingredients object
      return this; //Returns the object for chainability
    }
    remove(name) {
      delete this.ingredients[name]; //Deletes the ingredient
      return this; //Returns the object for chainability
    }

    getPrice() {
      return Object.keys(this.ingredients) 
        .reduce((totalPrice, ingredientName) => {
          return totalPrice + inventory[ingredientName].price; 
        }, 0);
    }

    count(property) {
      return Object.values(this.ingredients) //Gets the values of the ingredients object
      .filter(ingredients => ingredients[property]) //Filters out the ingredients that have the property
      .length; //Returns the length of the filtered array
    }

    static parse(s) {
      if (typeof s === 'string') { //Checks if the input is a string
  
        const data = JSON.parse(s); //Parses the string to a JSON object
  
        if (Array.isArray(data)) { //Checks if the data is an array
          return data.map(saladInArray => {
            const salad = new Salad(); //Creates a new Salad object
            salad.ingredients = { ...saladInArray.ingredients }; //Copies the ingredients to the salad using the spread operator
            salad.uuid = saladInArray.uuid; //Preserves the uuid
            return salad;
          });
        } else {
          const salad = new Salad(); //Creates a new Salad
          salad.ingredients = { ...data.ingredients }; //Copies the ingredients to the salad
          salad.uuid = data.uuid; //Preserves the uuid
          return salad; //Returns the salad
        }
      }
    }
  }