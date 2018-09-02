import {Component, OnInit} from '@angular/core';
import {AlertInterface} from '../../_interfaces/alert.interface';
import { AlertService} from '../../_services/alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
    providers: [AlertService]
})
export class AlertComponent implements OnInit {
    public alert: AlertInterface;

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
        this.alertService.getAlert().subscribe(msg => {
            console.log(msg)
        });
    }

}
