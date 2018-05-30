import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../shared/user";
import { InstantProject } from "../shared/instantProject";
import { BiddingProject } from "../shared/biddingProject";
import { MatSelect } from "@angular/material";
import {HttpService} from '../http.service';

@Component({
  selector: 'app-new-instant-project',
  templateUrl: './new-instant-project.component.html',
  styleUrls: ['./new-instant-project.component.css']
})
export class NewInstantProjectComponent implements OnInit {

  form(){
	// Defines the default state of the forms
    this.formdata = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      kunit: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      analystQ: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      developerQ: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      testerQ: new FormControl('',
        Validators.compose([
          Validators.required
        ]))
    });
  }

  new_projectname(username){
	 // Defines if the project name has already been taken
    for(let project of this.service.projects2){
      if(name === project.project_name){
        return false;
      }
    }
    return true;
  }

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  // These variables are used to create the forms and validate the data input on them
  formdata;
  invalid = false;
  invalid_name = false;
  success = false;
  flawed_name = false;
  hide = true;
  project;
  auxiliar;

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

  createInstantProject(project){
    return this.httpService.createBiddingProject(project).subscribe(data => console.log(data));
  }

  getBiddingProjectByName(formdata){
    return this.httpService.getUserByUsername(formdata.username).subscribe(data => {
      this.auxiliar = false;
      this.validations(this.auxiliar, formdata);
      },
      error => {
      this.auxiliar = true;
      this.validations(this.auxiliar, formdata);
    });
  }

  validations(auxiliar, data){
    if (!(/^[a-zA-Z ]+$/.test(data.name))) {
      this.invalid_name = true;
      this.invalid = false;
      this.success = false;
      this.flawed_name = false;
    }
    else if (data.kunit >= 1 && this.auxiliar) {
      this.project = new InstantProject(data.name, data.kunit, data.testerQ, data.analystQ, data.developerQ);
      this.createInstantProject(this.project);
      this.form();
      this.invalid_name = false;
      this.invalid = false;
      this.success = true;
      this.flawed_name = false;
    }
    else if(!(this.auxiliar)){
      this.invalid_name = false;
      this.invalid = false;
      this.success = false;
      this.flawed_name = true;
    }
    else{
      this.invalid_name = false;
      this.invalid = true;
      this.success = false;
      this.flawed_name = false;
    }
  }

  onClickSubmit(formdata) {
    this.getBiddingProjectByName(formdata);
  }
}

 
