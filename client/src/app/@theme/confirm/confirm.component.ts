import {Component, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Subject} from 'rxjs';
import {ConfirmService} from '../../_services/confirm.service';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
    private _modalRef: BsModalRef;
    @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;

    constructor(private modalService: BsModalService, private confirmService: ConfirmService) {
        this._triggerOpen();
    }

    private _triggerOpen(){
        this.confirmService.eventOpen().subscribe((status) => {
            if (status){
                this._modalRef = this.modalService.show(this.modalTemplate, {'class': 'modal-sm'});
            }
        })
    }

    public onCancel(){
        this.confirmService.changeStatus(false);
        this._modalRef.hide();
    }
    public onSuccess(){
        this.confirmService.changeStatus(true);
        this._modalRef.hide();
    }
}
