import {Component, OnInit} from '@angular/core';
import {SearchService} from '../../_services';

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {
    public showSearch = false;
    public inputValue: string = '';
    private _timeoutSearch = null;

    constructor(private searchService: SearchService) {
    }

    ngOnInit() {
        this._getSearchText();
        this._getActiveSearch();
    }

    private _getActiveSearch() {
        this.searchService.getTurn().subscribe((value: boolean) => {
            this.showSearch = value;
        });
    }

    private _getSearchText() {
        this.searchService.getSearch().subscribe((value: string) => {
            this.inputValue = value;
        });
    }

    public onSearch(searchValue: string) {
        let self = this;
        if (searchValue && searchValue.length > 3) {
            clearTimeout(this._timeoutSearch);
            this._timeoutSearch = setTimeout(function () {
                self.searchService.setValue(searchValue);
            }, 1000);
        }
    }
}
