import {Component, HostListener} from '@angular/core';
import {SearchService} from '../../_services';

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent {
    public showDropdown = false;

    constructor(private searchService: SearchService) {
    }

    @HostListener('document:click', ['$event.target'])
    clickOut(e) {
        if (!e.closest('#header-search')) {
            this.showDropdown = false;
        }
    }

    public onSearch(searchValue: string) {
        if (searchValue && searchValue.length > 3) {
            this.searchService.setValue(searchValue);
        }
    }

    public onBlur(event) {
        if (!event.target.closest('#header-search')) {
            this.showDropdown = false;
        }
    }
}
