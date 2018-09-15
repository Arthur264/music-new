import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class RouterService {

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {}

    public updateQueryParams(params) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                ...this.activatedRoute.snapshot.queryParams,
                ...params
            }
        });
    }

}
