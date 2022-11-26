import Armor from "./Armor";
import Inventory from "./Inventory";
import Weapon from "./Weapon";

class Goose {
    armor: Armor | null = null;
    attack: number = 1;
    defense: number = 0;
    health: number = 10;
    inventory: Inventory = new Inventory();
    name: string = "Goose";
    weapon: Weapon | null = null;

    constructor() {

    };

    get isDead() {
        return this.health <= 0;
    }
}

export default Goose;
