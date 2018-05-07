import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Company} from "../shared/company";

@Component({
  selector: 'app-recruit-member',
  templateUrl: './recruit-member.component.html',
  styleUrls: ['./recruit-member.component.css']
})
export class RecruitMemberComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }
/*
  formdata;
  project_managers;
  invalid = false;
  success = false;
  hide = true;
  user;


  possible_project_managers(){
    this.project_managers = []
    for (let user of this.service.users){
      if (user.role === "Project Manager"){
        this.project_managers.push(user);
        for(let company of this.service.companies){
          if(company.project_manager.username === user.username){
            this.project_managers.pop();
            break;
          }
        }
      }
    }
  }
  form(){
    this.formdata = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      img: new FormControl(''),
      project_manager: new FormControl('')
    });
  }*/
  ngOnInit() {
    /*if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }

    else if (this.service.user_type === "Team Member" || this.service.user_type === "Game Administrator") {
      this.router.navigate(['restricted'])
    }

  */
  }

}
