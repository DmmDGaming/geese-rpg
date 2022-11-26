import Item from "./Item";

class Weapon extends Item {
    attack: number = 0;

    clone(): Weapon {
        return Weapon.from(this);
    }

    static from(data: Weapon | {
        attack: number,
        count: number,
        description: string,
        id: string,
        rarity: string,
        stack: number
    }): Weapon {
        let weapon: Weapon = new Weapon();
        weapon.attack = data.attack;
        weapon.count = data.count;
        weapon.description = data.description;
        weapon.id = data.id;
        weapon.rarity = data.rarity;
        weapon.stack = data.stack;
        return weapon;
    }
}

export default Weapon;
