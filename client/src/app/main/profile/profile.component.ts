import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  constructor() {
      this.profileForm = new FormGroup({
          first_name: new FormControl('', Validators.required),
          last_name: new FormControl('', Validators.required),
          email: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
          phone: new FormControl('', Validators.required),
      });
  }

  ngOnInit() {
  }

}
