export class ItemsPoll<T> {
    private _items: T[] = [];

    constructor() {
    }

    get() {
        return this._items;
    }

    set(items: T[]) {
        return this.create(items);
    }

    public remove(value, remove_by: string = 'id') {
        this._items = this._items.filter((item) => {
            return item[remove_by] != value;
        });
    }

    public create(items: T[]) {
        this._items = items;
    }

    public put(item: T) {
        this._items.push(item);
    }
}
