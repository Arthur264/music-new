import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from "@angular/common"
import { AppService } from '../app.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
  @Input() max_page: number = 10;
  @Input() url_page: string;
  @Input() current_page: number = 1;
  @Input() items: any[] = [];
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadData(1);
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
      for (let i = 0; i < res.results.length; i++) {
        this.items.push(res.results[i]);
      }
      this.current_page = page;
      this.max_page = res.total_pages;
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
}
