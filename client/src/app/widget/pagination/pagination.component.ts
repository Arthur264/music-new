import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../_services/app.service';
import {AppConfig} from '../../app.config';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit, OnDestroy {
    private sub: any;
    private count_page = 30;
    @Input() public max_page = 10;
    @Input() public url_page: string;
    @Input() public current_page = 1;
    @Input() public items: any[] = [];

    constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loadEmptyData();
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.current_page = params['page'] || this.current_page;
                this.loadData(this.current_page);
            });
    }

    private loadEmptyData() {
        for (let i = 0; i < this.count_page; i++) {
            this.items.push({'preload': AppConfig.DEFAULT_PRELOADER});
        }
    }

    public nextPage() {
        this.current_page++;
        this.changePage();

    }

    public prevPage() {
        this.current_page--;
        this.changePage();
    }

    private changePage(n = this.current_page) {
        this.loadData(n);
    }

    private loadData(page) {
        this.appService.get(this.url_page, {'page': page}).subscribe((res) => {
            const res_items = 'items' in res.items ? res.items.items : res.items;
            if (this.items) {
                this.items.splice(0, this.items.length);
            }
            for (let i = 0; i < res_items.length; i++) {
                this.items.push(res_items[i]);
            }
            this.current_page = page;
            this.max_page = res.total_pages;
            this.router.navigate([], {queryParams: {'page': this.current_page}});
        });
    }

    public counter(c, m) {
        let current = c,
            last = m,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        range.push(1);
        for (let i = c - delta; i <= c + delta; i++) {
            if (i >= left && i < right && i < m && i > 1) {
                range.push(i);
            }
        }
        range.push(m);

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
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
}
