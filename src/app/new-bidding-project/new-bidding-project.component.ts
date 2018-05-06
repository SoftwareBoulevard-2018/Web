import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../shared/user";
import { InstantProject } from "../shared/instantProject";
import { BiddingProject } from "../shared/biddingProject";
import { MatSelect } from "@angular/material";

@Component({
  selector: 'app-new-bidding-project',
  templateUrl: './new-bidding-project.component.html',
  styleUrls: ['./new-bidding-project.component.css']
})
export class NewBiddingProjectComponent implements OnInit {

    form(){
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

    new_projectname(username){
      for(let project of this.service.projects){
        if(name === project.project_name){
          return false;
        }
      }
      return true;
    }

  constructor(public service: GeneralServiceService, public router: Router) { }

  formdata;
  invalid = false;
  invalid_name = false;
  success = false;
  flawed_name = false;
  hide = true;
  project;
  auxiliar;

  ngOnInit() {
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
    this.auxiliar = this.new_projectname(data.name);
    if (!(/^[a-zA-Z ]+$/.test(data.name))) {
      this.invalid_name = true;
      this.invalid = false;
      this.success = false;
      this.flawed_name = false;
    }
    else if (data.kunit >= 1 && this.auxiliar) {
      this.project = new BiddingProject(Object.keys(this.service.projects).length ,data.name, data.kunit,
                                      data.testerQ, data.analystQ, data.developerQ, data.time, data.cost,
                                      data.krequired, data.analystL, data.developerL, data.testerL);
      this.service.projects.push(this.project);
      console.log(this.service.projects);
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

}
