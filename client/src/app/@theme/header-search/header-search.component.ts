import {Component, HostListener, OnInit} from '@angular/core';
import {AppService} from '../../_services';

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

    @HostListener('document:click', ['$event.target'])
    clickOut(e) {
        if (!e.closest('#header-search')) {
            this.showDropdown = false;
        }
    }

    public onSearch(searchValue: string) {
        if (searchValue && searchValue.length > 3) {
            this.appService.get('search', {'q': searchValue}).subscribe(res => {
                this.searchItems = [];
                this.showDropdown = true;
                for (let prop in res) {
                    for (const index in res[prop]) {
                        let item = res[prop][index];
                        item['type'] = prop;
                        this.searchItems.push(item);
                    }
                }
            });
        }
    }

    public onBlur(event) {
        console.log(event);
        if (!event.target.closest('#header-search')) {
            this.showDropdown = false;
        }
    }
}
