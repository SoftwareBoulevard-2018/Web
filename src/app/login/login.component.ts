import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServiceService } from '../general-service.service';
import { Router } from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

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

  login(username, password) {
    return this.httpService.login(username, password).subscribe( data => {
        if (data.role === 'Analyst' || data.role === 'Developer' || data.role === 'Tester') {
          this.service.user_type = 'Team Member';
          this.service.user = data;
          this.router.navigate(['home']);
        } else if (data.role === 'Project Manager') {
          this.service.user_type = 'Project Manager';
          this.service.user = data;
          this.router.navigate(['home']);
        } else {
          this.service.user_type = 'Game Administrator';
          this.service.user = data;
          this.router.navigate(['home']);
        }
        this.service.loggedusr = true;
      },
      error => {
        this.invalid = true;
      });
  }

  onClickSubmit(data) {
    // This is the function that validates the form data and it's activated when the log in button is clicked
    this.login(data.username, data.password);
  }
}
