import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../_services/app.service';
import {AppConfig} from '../../app.config';
import {RouterService} from '../../_services/router.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
    providers: [RouterService]
})

export class PaginationComponent implements OnInit, OnDestroy {
    @Input() public max_page: number = 10;
    @Input() public url_page: string;
    @Input() public current_page = 1;
    @Input() public items: any[] = [];
    private sub: any;
    private count_page = 30;

    constructor(private appService: AppService,
                private router: Router,
                private route: ActivatedRoute,
                private routerService: RouterService) {
    }

    ngOnInit() {
        this.emptyItems();
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                const req_params = Object.assign({}, params);
                req_params['page'] = req_params['page'] || this.current_page;
                this.makeItems(req_params);
            });
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
            this.makeItems(n);
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

    private makeItems(params) {
        this.appService.get(this.url_page, params).subscribe((res) => {
            const res_items = 'items' in res.items ? res.items.items : res.items;
            this.putItems(res_items);
            this.current_page = params['page'];
            this.max_page = res.total_pages;
            this.routerService.updateQueryParams(params);
        });
    }
}
