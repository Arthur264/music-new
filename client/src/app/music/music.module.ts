import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music.component';
import { MusicDialogComponent } from './music-dialog/music-dialog.component';
import { MusicObjectComponent } from './music-object/music-object.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: MusicComponent,
        }])
    ],
    entryComponents: [
        MusicDialogComponent
    ],
    bootstrap: [MusicObjectComponent, MusicDialogComponent, MusicPlayerComponent],
    declarations: [MusicComponent, MusicDialogComponent, MusicObjectComponent, MusicPlayerComponent]
})
export class MusicModule {}