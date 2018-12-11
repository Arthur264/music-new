import {Component, OnInit} from '@angular/core';
import {AppService} from "../../_services/app.service";

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {
    private searchItems = [];
    public showDropdown = false;

    constructor(private appService: AppService) {
    }

    ngOnInit() {
    }

    public onSearch(searchValue: string) {
        if (searchValue && searchValue.length > 3) {
            this.searchItems = [];
            this.showDropdown = true;
            this.appService.get('search', {'q': searchValue}).subscribe(res => {
                for(let prop in res){
                    for(const index in res[prop]){
                        let item = res[prop][index];
                        item['type'] = prop;
                        this.searchItems.push(item)
                    }
                }
            });
        }
    }
}
