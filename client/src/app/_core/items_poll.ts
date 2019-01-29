export class ItemsPoll<T> extends Array<T> {

    constructor(items?: Array<T>) {
        super(...items);
        Object.setPrototypeOf(this, ItemsPoll.prototype);
    }

    public create(items: Array<T>) {
        while (this.length > 0) {
            this.pop();
        }
        items.forEach((item) => {
            this.push(item);
        });
    }

    remove(value, remove_by: string = 'id') {
        let arr = this;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][remove_by] == value) {
                delete arr[i];
                break;
            }
        }
    }
}
