import {
    Component,
    Input,
    OnDestroy,
    OnInit,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import {AppService, RouterService} from '../../_services';
import {AppConfig} from '../../app.config';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
    providers: [RouterService]
})

export class PaginationComponent implements OnInit, OnDestroy, OnChanges {
    @Input() public url_page: string;
    @Input() public items: any[] = [];
    @Input() public query_params = {};
    private current_page: number = 1;
    private sub: any;
    private max_page: number = 10;
    private count_page = 30;

    constructor(
        private appService: AppService,
        private routerService: RouterService,
    ) {}


    ngOnChanges(changes: SimpleChanges) {
        const req_params = Object.assign({}, this.query_params);
        req_params['page'] = req_params['page'] || this.current_page;
        this.makeItems(this.query_params);
    }

    ngOnInit() {
        this.emptyItems();
    }

    private updateQueryPage(params) {
        params['page'] = params['page'] || this.current_page;
        return params
    }

    public nextPage() {
        this.changePage(this.current_page + 1);

    }

    public prevPage() {
        this.changePage(this.current_page - 1);
    }

    public counter(c, m) {
        const current = Number(c),
            last = m,
            delta = 2,
            left = current - delta,
            right = current + delta + 1;

        const range = [],
            rangeWithDots = [];

        let old_i;

        range.push(1);

        for (let i = c - delta; i <= c + delta; i++) {
            if (i >= left && i < right && i < last && i > 1) {
                range.push(i);
            }
        }
        range.push(m);

        for (const i of range) {
            if (old_i) {
                if (i - old_i === 2) {
                    rangeWithDots.push(old_i + 1);
                } else if (i - old_i !== 1 && last > 3) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            old_i = i;
        }
        return rangeWithDots;
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    private emptyItems() {
        this.sliceItems();
        for (let i = 0; i < this.count_page; i++) {
            this.items.push({'preload': AppConfig.DEFAULT_PRELOADER});
        }
    }

    private changePage(n) {
        if (n !== this.current_page) {
            this.emptyItems();
            this.makeItems({'page': n});
        }
        this.current_page = n;
    }

    private sliceItems() {
        if (this.items) {
            this.items.splice(0, this.items.length);
        }
    }

    private putItems(items) {
        this.sliceItems();
        for (let i = 0; i < items.length; i++) {
            this.items.push(items[i]);
        }
    }
    private makeItems(params = {}) {
        let req_params = Object.assign({}, params);
        req_params = this.updateQueryPage(req_params);
        this.appService.get(this.url_page, req_params).subscribe((res) => {
            const res_items = 'items' in res.items ? res.items.items : res.items;
            this.putItems(res_items);
            this.current_page = req_params['page'];
            this.max_page = res.total_pages;
            this.routerService.updateQueryParams({'page': req_params['page']});
        });
    }
}
