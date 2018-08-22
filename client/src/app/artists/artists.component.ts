import { Component, OnInit } from '@angular/core';
import { TagItem, ArtistItem } from '../app.item';
import { AppService } from '../app.service';
@Component({
 selector: 'app-artists',
 templateUrl: './artists.component.html',
 styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
 public arrayTag: TagItem[] = [];
 public arrayArtist: ArtistItem[] = [];
 public activeTagIndex: number = null;
 public defaultSongImage: string = 'https://lastfm-img2.akamaized.net/i/u/174s/c6f59c1e5e7240a4c0d427abd71f3dbb';

 constructor(private appService: AppService) {}
 ngOnInit() {
  this.appService.get('tag').subscribe((res) => {
   this.arrayTag = res.items;
  });
 }
 public changeTag(tag, index) {
  this.activeTagIndex = index;
  this.appService.get('tag/' + tag.slug).subscribe((res) => {
   this.arrayArtist = res.items.items;
  });
 }
 public getArtistImage(artist) {
  if (artist.image == null) {
   return this.defaultSongImage
  }
  return artist.image
 }
}
