import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import { InstantProject } from "../shared/instantProject";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-instant-project',
  templateUrl: './update-instant-project.component.html',
  styleUrls: ['./update-instant-project.component.css']
})
export class UpdateInstantProjectComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  form(){
	// Defines the default state of the forms
    this.formdata = new FormGroup({
      name: new FormControl(''),
      analystQ: new FormControl(''),
      developerQ: new FormControl(''),
      testerQ: new FormControl(''),
      kunit: new FormControl('')
    });
  }

  // These variables are used to create the forms and validate the data input on them
  formdata;
  invalid;
  success;
  invalid_name;

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

}
