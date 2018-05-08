import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../shared/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  // These variables are used to create the forms and validate the data input on them
  formdata;
  invalid = false;
  invalid_name = false;
  success = false;
  flawed_username = false;
  hide = true;
  roles = [ 'Project Manager', 'Analyst', 'Developer', 'Tester'];
  user;
  auxiliar;

  constructor(public service: GeneralServiceService, public router: Router) { }
  form() {
    // Defines the default state of the forms
    this.formdata = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      username: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      password: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      confirmation: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      role: new FormControl('',
        Validators.compose([
          Validators.required
        ]))
    });
  }

  new_username(username) {
    // Defines if the username is not already taken
    for (const user of this.service.users) {
      if (username === user.username) {
        return false;
      }
    }
    return true;
  }


  ngOnInit() {
    // Establishes the form in the default state
   if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.form();
    }
  }

  onClickSubmit(data) {
    // Validates the data input on the form and if it's correct then creates the user
    this.auxiliar = this.new_username(data.username);
    if (!(/^[a-zA-Z ]+$/.test(data.name))) {
      this.invalid_name = true;
      this.invalid = false;
      this.success = false;
      this.flawed_username = false;
    } else if (data.password === data.confirmation && this.auxiliar) {
      this.user = new User(data.name, data.username, data.password, data.role);
      this.service.users.push(this.user);
      console.log(this.service.users);
      this.form();
      this.invalid_name = false;
      this.invalid = false;
      this.success = true;
      this.flawed_username = false;
    } else if (!(this.auxiliar)) {
      this.invalid_name = false;
      this.invalid = false;
      this.success = false;
      this.flawed_username = true;
    } else {
      this.invalid_name = false;
      this.invalid = true;
      this.success = false;
      this.flawed_username = false;
    }
  }

}
