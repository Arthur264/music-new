import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicObjectComponent } from './music-object.component';

describe('MusicObjectComponent', () => {
  let component: MusicObjectComponent;
  let fixture: ComponentFixture<MusicObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
