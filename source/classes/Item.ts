// Class
class Item {
    count: number = 0;
    description: string = "";
    id: string = "null";
    rarity: string = "common";
    stack: number = 0;

    clone(): Item {
        return Item.from(this);
    }
    
    static from(data: Item | {
        count: number,
        description: string,
        id: string,
        rarity: string,
        stack: number
    }): Item {
        let item: Item = new Item();
        item.count = data.count;
        item.description = data.description;
        item.id = data.id;
        item.rarity = data.rarity;
        item.stack = data.stack;
        return item;
    }
}

// Exports
export default Item;
