import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import { InstantProject } from "../shared/instantProject";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from '../http.service';

@Component({
  selector: 'app-update-instant-project',
  templateUrl: './update-instant-project.component.html',
  styleUrls: ['./update-instant-project.component.css']
})
export class UpdateInstantProjectComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) {
  }

  form(){
	// Defines the default state of the forms
    this.formdata = new FormGroup({
      name: new FormControl(''),
      analystQ: new FormControl(''),
      developerQ: new FormControl(''),
      testerQ: new FormControl(''),
      kunit: new FormControl('')
    });
    console.log(this.service.project_to_be_updated);
  }

  // These variables are used to create the forms and validate the data input on them
  formdata;

  onClickSubmit(data){
    if(!(data.name === '')){
      this.service.project_to_be_updated.name = data.name;
    }
    if(!(data.rewarded_K === '')){
      this.service.project_to_be_updated.rewarded_K = data.kunit;
    }
    if(!(data.analystQ === '')){
      this.service.project_to_be_updated.numberOfDevelopingQuestionsPerAnalyst = data.analystQ;
    }
    if(!(data.developerQ === '')){
      this.service.project_to_be_updated.numberOfDevelopingQuestionsPerDeveloper = data.developerQ;
    }
    if(!(data.testerQ == '')){
      this.service.project_to_be_updated.numberOfDevelopingQuestionsPerTester = data.testerQ;
    }
    console.log(this.service.project_to_be_updated._id);
    this.httpService.updateInstantProject(this.service.project_to_be_updated, this.service.project_to_be_updated._id).subscribe(data => console.log);
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

}
