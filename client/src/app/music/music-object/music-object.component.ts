import { Component, OnInit, Input } from '@angular/core';
import { MusicItem } from '../music.item';
@Component({
  selector: 'app-music-object',
  templateUrl: './music-object.component.html',
  styleUrls: ['./music-object.component.css']
})
export class MusicObjectComponent {

  @Input() music: MusicItem;

}
