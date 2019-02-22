import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
    public modalRef: BsModalRef;
    @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;

    constructor(private modalService: BsModalService,) {
    }

    ngOnInit() {
        this.openModal();
    }

    public openModal() {
        this.modalRef = this.modalService.show(this.modalTemplate, {'class': 'modal-sm'});
    }
}
