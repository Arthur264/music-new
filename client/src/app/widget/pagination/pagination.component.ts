import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from "@angular/common"
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit, OnDestroy {
  @Input() public max_page: number = 10;
  @Input() public url_page: string;
  @Input() public current_page: number = 1;
  @Input() public items: any[] = [];
  private sub: any;
  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.current_page = params['page'] || this.current_page;
        this.loadData(this.current_page);
      });
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
    this.appService.get(this.url_page, { "page": page }).subscribe((res) => {
      if (this.items) {
        this.items.splice(0, this.items.length);
      };
      for (let i = 0; i < res.items.length; i++) {
        this.items.push(res.items[i]);
      }
      this.current_page = page;
      this.max_page = res.total_pages;
      this.router.navigate([], { queryParams: { 'page': this.current_page } });
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

    range.push(1)
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
        }
        else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
