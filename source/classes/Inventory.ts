import Item from "./Item";

class Inventory {
    private data: Map<string, Item> = new Map();

    add(item: Item): Item {
        if(this.data.has(item.id)) (this.data.get(item.id) as Item).count += item.count;
        else this.data.set(item.id, item.clone());
        return (this.data.get(item.id) as Item);
    }

    exists(item: Item) {
        return this.data.has(item.id);
    }

    has(item: Item) {
        return this.data.has(item.id) && (this.data.get(item.id) as Item).count >= item.count;
    }

    get(item: Item): Item | null {
        return this.data.get(item.id) ?? null;
    }

    get items(): Item[] {
        return [];
    }

    remove(item: Item): Item {
        if(this.data.has(item.id)) (this.data.get(item.id) as Item).count -= item.count;
        else {
            let clone = item.clone();
            clone.count = -clone.count;
            this.data.set(item.id, clone);
        }
        return (this.data.get(item.id) as Item);
    }
}

export default Inventory;
