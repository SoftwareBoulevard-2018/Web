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
  selector: 'app-new-bidding-project',
  templateUrl: './new-bidding-project.component.html',
  styleUrls: ['./new-bidding-project.component.css']
})
export class NewBiddingProjectComponent implements OnInit {

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
        time: new FormControl('',
          Validators.compose([
            Validators.required
          ])),
        cost: new FormControl('',
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
          ])),
        krequired: new FormControl('',
          Validators.compose([
            Validators.required
          ])),
        testerL: new FormControl('',
          Validators.compose([
            Validators.required
          ])),
        developerL: new FormControl('',
          Validators.compose([
            Validators.required
          ])),
        analystL: new FormControl('',
          Validators.compose([
            Validators.required
          ]))
      });
    }

    constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  // These variables are used to create the forms and validate the data input on them
  formdata;
  project;
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

  createBiddingProject(project){
    return this.httpService.createBiddingProject(project).subscribe(data => console.log(data));
  }


  onClickSubmit(data) {
    if (data.kunit <= 0 || data.analystQ <= 0 || data.developerQ <= 0 || data.testerQ <= 0 || data.time <= 0 || data.time <= 0 || data.krequired <= 0 || data.developerL <= 0 || data.testerL <= 0 || data.analystL <= 0){
      this.negativo = true;
    }
    else {
      this.service.project = new BiddingProject(data.name, data.kunit, data.testerQ, data.analystQ, data.developerQ, data.time, data.cost, data.krequired, data.analystL, data.developerL, data.testerL);
      this.service.numAna = data.analystQ;
      this.service.numDev = data.developerQ;
      this.service.numTester = data.testerQ;
	  this.createBiddingProject(this.service.project);
      this.form();
      this.negativo = false;
      if(this.service.user_type === "Game Administrator"){
        this.router.navigate(['home/set-up/create-project/analyst-questions']);
      }
    }
  }
}
