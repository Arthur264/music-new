import {Component, OnInit} from '@angular/core';
import {AlertInterface} from '../../_interfaces/alert.interface';
import {AlertService} from '../../_services/alert.service';

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
        this.alertService.getAlert().subscribe((alert: AlertInterface) => {
            console.log('alert', alert)
            this.alert = alert;
            this.alert.alertClass = 'bounceInRight';
            setTimeout(this.fadeItOut, 5000);
        });
    }

    private fadeItOut() {
        this.alert.alertClass = 'fadeOutDown';
    }
}
