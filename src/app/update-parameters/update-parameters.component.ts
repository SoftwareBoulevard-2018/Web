import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import { Parameter } from "../shared/parameter";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from '../http.service';

@Component({
  selector: 'app-update-parameters',
  templateUrl: './update-parameters.component.html',
  styleUrls: ['./update-parameters.component.css']
})
export class UpdateParametersComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {}

  // These variables are used to create the forms and validate the data input on them
  formdata;
  totally_empty = false;
  success = false;
  parameter;
  repeated_field = false;
  user;
  threshold;
  invalid = false;
  nonumber = false;

  form(){
	// Defines the default state of the forms
    this.formdata = new FormGroup({
      threshold: new FormControl('')
    });
    this.getUserByRol();
  }

  getUserByRol(){
    this.httpService.getUsersByRole('Game Administrator').subscribe(data => {
      const datos = JSON.parse(JSON.stringify(data));
      this.threshold = datos[0].threshold;
      this.user = datos[0];
    });
  }

  updateUser(user, userId) {
    return this.httpService.updateUser(user, userId).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
	// Checks User permissions and establishes the form in the default state
    if (this.service.user_type === undefined) {
       this.router.navigate([''])
     }

    else if (this.service.user_type === "Team Member" || this.service.user_type === "Project Manager") {
       this.router.navigate(['restricted'])
     }

     else {
    this.form();
    }
  }

  onClickSubmit(data) {
	// Validates the data input on the form and if it's correct then updates the parameters
    if(data.threshold === this.threshold){
      this.totally_empty = false;
      this.success = false;
      this.repeated_field = true;
      this.invalid = false;
      this.nonumber = false;
    }

    else if(data.threshold === ''){
      this.totally_empty = true;
      this.success = false;
      this.repeated_field = false;
      this.invalid = false;
      this.nonumber = false;
    }
    else if(typeof data.threshold === "string"){
      this.totally_empty = false;
      this.success = false;
      this.repeated_field = false;
      this.invalid = true;
      this.nonumber = false;
    }
    else if(data.threshold <= 0 || data.threshold >= 1){
      this.totally_empty = false;
      this.success = false;
      this.repeated_field = false;
      this.invalid = false;
      this.nonumber = true;
    }
    else {
      this.totally_empty = false;
      this.success = true;
      this.repeated_field = false;
      this.invalid = false;
      this.nonumber = false;
      this.user.threshold = data.threshold;
      this.updateUser(this.user, this.user.id);
    }
  }


}
