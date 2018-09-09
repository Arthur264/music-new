import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../_services/app.service';
import {AppConfig} from '../../app.config';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit, OnDestroy {
    @Input() public max_page = 10;
    @Input() public url_page: string;
    @Input() public current_page = 1;
    @Input() public items: any[] = [];
    private sub: any;
    private count_page = 30;

    constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.emptyItems();
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.current_page = params['page'] || this.current_page;
                this.makeItems(this.current_page);
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

        let range = [],
            rangeWithDots = [],
            l;

        range.push(1);

        for (let i = c - delta; i <= c + delta; i++) {
            if (i >= left && i < right && i < last && i > 1) {
                range.push(i);
            }
        }
        range.push(m);

        for (const i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1 && last > 3) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
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


    private makeItems(page) {

        this.appService.get(this.url_page, {'page': page}).subscribe((res) => {
            const res_items = 'items' in res.items ? res.items.items : res.items;
            this.putItems(res_items);
            this.current_page = page;
            this.max_page = res.total_pages;
            this.router.navigate([], {queryParams: {'page': this.current_page}});
        });
    }
}
