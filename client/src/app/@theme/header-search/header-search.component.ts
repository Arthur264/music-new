import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    public onSearchChange(searchValue : string ){
        console.log(searchValue);
    }

}
