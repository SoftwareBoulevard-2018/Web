import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Company} from '../shared/company';

@Component({
  selector: 'app-recruit-member',
  templateUrl: './recruit-member.component.html',
  styleUrls: ['./recruit-member.component.css']
})
export class RecruitMemberComponent implements OnInit {
  formdata;
  project_managers;
  invalid = false;
  invalid_url = false;
  success = false;
  hide = true;
  user;
  aux;

  constructor(public service: GeneralServiceService, public router: Router) { }

  form() {
    this.formdata = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required
        ])),
      img: new FormControl(''),
      project_manager: new FormControl('')
    });
  }

  possible_members(){
    this.project_managers = []
    for (let user of this.service.users){
      if (user.company_name === undefined && (user.role!="Project Manager") && (user.role!= "Game Administrator")){
        this.project_managers.push(user);
        for(let company of this.service.companies){
          if(!(company.project_manager === undefined) && company.project_manager.username === user.username){
            this.project_managers.pop();
            break;
          }
        }
      }
    }
  }

  onClickSubmit(data) {
  this.aux=[];
  if(data.project_manager != this.service.username) {
    this.aux.push(data.project_manager, this.service.username);
    console.log(this.aux);
    this.success = true;
    this.invalid = false;
  }
  else{
    this.success = false;
    this.invalid = true;
  }
  }

  ngOnInit() {
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }

    else if (this.service.user_type === "Team Member" || this.service.user_type === "Game Administrator") {
      this.router.navigate(['restricted'])
    }
    else {
      this.possible_members();
      this.form();
    }
  }


}
