import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArtistsComponent} from './artists.component';
import {RouterModule} from '@angular/router';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: ArtistsComponent,
        }])
    ],
    declarations: [ArtistsComponent]
})
export class ArtistsModule {
}
