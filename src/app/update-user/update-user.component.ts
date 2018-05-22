import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user_to_be_updated;
  formdata;
  invalid = false;
  invalid_name = false;
  success = false;
  totally_empty = false;
  flawed_username = false;
  repeated_field = false;
  hide = true;
  roles = [ 'Project Manager', 'Analyst', 'Developer', 'Tester'];
  user;
  auxiliar;

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {}
  form(userId) {
    // Establishes the default state of a form
    this.formdata = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      confirmation: new FormControl(''),
      role: new FormControl('')
    });
    this.getUserById(userId);
  }

  updateUser(user, userId) {
    return this.httpService.updateUser(user, userId).subscribe(data => {
      console.log(data);
      this.form(userId);
    });
  }

  getUserById(userId) {
    return this.httpService.getUserById(userId).subscribe(data => { this.user_to_be_updated = data; });
  }

  getUserByUsername(formdata) {
    return this.httpService.getUserByUsername(formdata.username).subscribe(data => {
        this.auxiliar = false;
        this.validations(this.auxiliar, formdata);
      },
      error => {
        this.auxiliar = (formdata.username !== this.user_to_be_updated.username);
        this.validations(this.auxiliar, formdata);
      });
  }

  ngOnInit() {
    // Puts the form in its default state
    if (this.service.user_type === undefined) {
       this.router.navigate(['']);
     } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
       this.router.navigate(['restricted']);
     } else {
      this.form(this.service.user_to_be_updated);
    }
  }

  onClickSubmit(data) {
    // Makes distinct validations and if they are alright updates the user
    this.getUserByUsername(data);
  }

  validations(auxiliar, data) {
    console.log(data);
    if (!(/^[a-zA-Z ]+$/.test(data.name)) && !(data.name === '')) {
      this.invalid_name = true;
      this.totally_empty = false;
      this.invalid = false;
      this.success = false;
      this.flawed_username = false;
      this.repeated_field = false;
    } else if (data.username === '' && data.name === '' && data.password === '' && (data.role === '' || data.role === undefined)) {
      this.invalid_name = false;
      this.totally_empty = true;
      this.invalid = false;
      this.success = false;
      this.flawed_username = false;
      this.repeated_field = false;
    } else if (!(data.password === data.confirmation)) {
      this.invalid_name = false;
      this.totally_empty = false;
      this.invalid = true;
      this.success = false;
      this.flawed_username = false;
      this.repeated_field = false;
    } else if (data.name === this.user_to_be_updated.name || data.username === this.user_to_be_updated.username
      || data.password === this.user_to_be_updated.password || data.role === this.user_to_be_updated.role) {
      this.invalid_name = false;
      this.totally_empty = false;
      this.invalid = false;
      this.success = false;
      this.flawed_username = false;
      this.repeated_field = true;
    } else if (!(auxiliar)) {
      this.invalid_name = false;
      this.totally_empty = false;
      this.invalid = false;
      this.success = false;
      this.flawed_username = true;
      this.repeated_field = false;
    } else {
      if (!(data.name === '')) {
        this.user_to_be_updated.name = data.name;
      } if (!(data.username === '')) {
        this.user_to_be_updated.username = data.username;
      } if (!(data.password === '')) {
        this.user_to_be_updated.password = data.password;
      } if (!(data.role === '' || data.role === undefined)) {
        this.user_to_be_updated.role = data.role;
      }
      this.invalid_name = false;
      this.totally_empty = false;
      this.invalid = false;
      this.success = true;
      this.flawed_username = false;
      this.repeated_field = false;
      this.updateUser(this.user_to_be_updated, this.user_to_be_updated.id);
    }
  }

}
