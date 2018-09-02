import {Component, OnInit} from '@angular/core';
import {MENU_ITEMS} from './menu.routing';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
    menu = MENU_ITEMS;

    constructor() {
    }

    ngOnInit() {
    }

}
