// Imports
import Egg from "./Egg";
import Inventory from "./Inventory";
import Goose from "./Goose";

// CLass
class Player {
    gaggle: {
        capacity: number,
        geese: Goose[],
    },
    gold: number;
    inventory: Inventory;
    name: string;
    nest: {
        capacity: number,
        eggs: Egg[]
    }

    constructor(data: Save.playerData) {
        this.gaggle = {
            capacity: data.gaggle.capacity,
            geese: data.gaggle.geese.map(goose => new Goose(goose))
        }
        this.gold = data.gold;
        this.inventory = new Inventory(data.inventory);
        this.name = data.name;
        this.nest = {
            capacity: data.nest.capacity,
            eggs: data.nest.eggs.map(egg => new Egg(egg))
        }
    }
}

// Exports
export default Player;
