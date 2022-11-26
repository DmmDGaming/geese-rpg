import Item from "./Item";

class Armor extends Item {
    defense: number = 0;

    clone(): Armor {
        return Armor.from(this);
    }

    static from(data: Armor | {
        count: number,
        description: string,
        defense: number,
        id: string,
        rarity: string,
        stack: number
    }): Armor {
        let armor: Armor = new Armor();
        armor.count = data.count;
        armor.description = data.description;
        armor.defense = data.defense;
        armor.id = data.id;
        armor.rarity = data.rarity;
        armor.stack = data.stack;
        return armor;
    }
}

export default Armor;
