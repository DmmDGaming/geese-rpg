import Item from "./Item";

class Food extends Item {
    healing: number = 0;

    clone(): Food {
        return Food.from(this);
    }

    static from(data: Food | {
        count: number,
        description: string,
        healing: number,
        id: string,
        rarity: string,
        stack: number
    }): Food {
        let food: Food = new Food();
        food.count = data.count;
        food.description = data.description;
        food.healing = data.healing;
        food.id = data.id;
        food.rarity = data.rarity;
        food.stack = data.stack;
        return food;
    }
}

export default Item;
