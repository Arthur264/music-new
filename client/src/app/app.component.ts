import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'app';
    constructor(private router: Router, private route: ActivatedRoute) {
        this.router.events.subscribe((event) => {
           console.log(this.router)
        });
    }
}
