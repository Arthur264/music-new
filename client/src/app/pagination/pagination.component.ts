import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from "@angular/common"
import { AppService } from '../app.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
  @Input() page: number;
  @Input() max_page: number;
  @Input() url_page: string;
  @Input() current_page: number;
  Items: any[];
  constructor(private appService: AppService) {}

  ngOnInit() {}

  public nextPage() {
    this.current_page++;
    this.loadPage();

  }
  public prevPage(){
    this.current_page--;
    this.loadPage();
  }
  private loadPage(){
    this.loadData(this.current_page);
  }
  private loadData(page) {
    this.appService.get(this.url_page, {"page":page }).subscribe((res) => {
      this.Items = res.results;
    });
  }
  public counter(n){
    return  new Array(n)
  }
  

}
