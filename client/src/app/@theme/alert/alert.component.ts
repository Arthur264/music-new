import {Component, OnInit} from '@angular/core';
import {AlertInterface} from '../../_interfaces';
import {AlertService} from '../../_services';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
    public alert: AlertInterface;

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
        this.alertService.getAlert().subscribe((alert) => {
            this.alert = alert;
            this.alert.alertClass = 'bounceInRight';
            // setTimeout(() => {
            //     this.alert.alertClass = 'fadeOutDown';
            // }, 5000);
        });
    }

    public removeAlert(){
        this.alert = null;
    }


}
