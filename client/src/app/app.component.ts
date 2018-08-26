import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    viewComponent: string = null;
    constructor(private router: Router, private route: ActivatedRoute) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(e => {
            let routeData = this.route.firstChild.snapshot.data;
            if (routeData.hasOwnProperty('component')){
                this.viewComponent = routeData['component'];
            }
        });
    }
}
