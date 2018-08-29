import { Component, OnInit, Input } from '@angular/core';
import {SongInterface} from '../../../_interfaces/song.interface';

@Component({
  selector: 'app-music-object',
  templateUrl: './music-object.component.html',
  styleUrls: ['./music-object.component.css']
})
export class MusicObjectComponent {

  @Input() music: SongInterface;

}
