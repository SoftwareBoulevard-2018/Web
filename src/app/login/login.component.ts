import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServiceService } from '../general-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  // Variables necessary to define the form and validate the input data
  invalid = false;
  formdata;

  ngOnInit() {
    // Defines the default form, if the user is already defined, redirects to home
    if (this.service.user_type === undefined) {
      this.formdata = new FormGroup({
        username: new FormControl('',
          Validators.compose([
            Validators.required
          ])),
        password: new FormControl('',
          Validators.compose([
            Validators.required
          ]))
      });
    } else {
      this.router.navigate(['home']);
    }
  }

  onClickSubmit(data) {
    // This is the function that validates the form data and it's activated when the log in button is clicked
    for (const user of this.service.users) {
      if (data.username === user.username && data.password === user.password) {
        if (user.role === 'Analyst' || user.role === 'Developer' || user.role === 'Tester') {
          this.service.user_type = 'Team Member';
          this.service.username = data.username;
          this.router.navigate(['home']);
          } else if (user.role === 'Project Manager') {
          this.service.user_type = 'Project Manager';
          this.service.username = data.username;
          this.router.navigate(['home']);
        } else {
          this.service.user_type = 'Game Administrator';
          this.service.username = data.username;
          this.router.navigate(['home']);
        }
        this.service.loggedusr = true;
      }
      this.invalid = true;
    }
  }
}
