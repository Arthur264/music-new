import {Pipe} from '@angular/core';

@Pipe({
    name: 'removeHttp'
})
export class RemoveHttpPipe {
    transform(value: string): string {
        return value.replace(/(^\w+:|^)\/\//, '');
    }
}