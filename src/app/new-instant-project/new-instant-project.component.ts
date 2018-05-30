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

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  // These variables are used to create the forms and validate the data input on them
  formdata;
  success = false;
  project;
  letra = false;
  negativo = false;


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

  onClickSubmit(formdata) {
    if (typeof formdata.kunit === 'string' || typeof formdata.analystQ === 'string' || typeof formdata.developerQ === 'string' || typeof formdata.testerQ === 'string'){
      this.letra = true;
      this.success = false;
    }
    else if (formdata.kunit <= 0 || formdata.analystQ <= 0 || formdata.developerQ <= 0 || formdata.testerQ <= 0){
      this.negativo = true;
      this.success = false;
    }
    else {
      this.project = new InstantProject(formdata.name, formdata.analystQ, formdata.developerQ, formdata.testerQ, formdata.kunit);
      this.createInstantProject(this.project);
      console.log(this.service.questions);
      this.form();
      this.negativo = false;
      this.letra = false;
      this.success = true;
    }
  }
}

 
